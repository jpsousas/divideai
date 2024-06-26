import time
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.common.exceptions import TimeoutException
from selenium.common.exceptions import NoSuchElementException
import requests
from bs4 import BeautifulSoup
from flask import Flask, request, jsonify

app = Flask(__name__)

#metodo de obtenção convencional 
def get_nfc_data(url):
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')
    total_value = 0
    items = []
    for item in soup.select('.linhaShade'):  
        label = item.find('label').text.strip()
        if label.lower() == 'valor a pagar r$:':
            total_value = float(item.select_one('.totalNumb').text.strip().replace(',', '.'))
            break

    for row in soup.select('tr[id^="Item"]'):  # Seleciona todas as linhas cujo id começa com "Item"
        cells = row.find_all('td')
        if len(cells) >= 2:  # Verifica se a linha tem pelo menos 2 células (nome e valor total)
            name = cells[0].text.strip()
            value_text = cells[-1].text.strip().replace('R$', '').replace('\r', '').replace('\n', '').replace('\t', '')  # Limpa a string de valor
            value_text = value_text.replace('Vl. Total', '')  # Remove 'Vl. Total' da string
            value = float(value_text.replace(',', '.').strip())  # Substitui vírgulas por pontos e converte para float
            items.append({'name': name, 'value': value})
    
    return items, total_value

#metodo de obtenção da nota diferente.
def get_alternative_nfc_data(url):
    driver = webdriver.Firefox()
    driver.get(url)
    
    # Verificar se o botão está dentro de um iframe
    try:
        iframe = driver.find_element(By.TAG_NAME, 'iframe')
        driver.switch_to.frame(iframe)
    except NoSuchElementException:
        pass  # Não há iframe, continuar normalmente
    
    # Aguardar até que o botão seja clicável
    wait = WebDriverWait(driver, 10)
    avancar_button = wait.until(EC.element_to_be_clickable((By.XPATH, "/html/body/table/tbody/tr/td/form/table/tbody/tr[4]/td/table/tbody/tr[2]/td[1]/input")))
    
    # Clicar no botão "Avançar"
    avancar_button.click()

    time.sleep(2)

    # Encontrar todas as tabelas com a classe NFCDetalhe_Item
    tables = driver.find_elements(By.CSS_SELECTOR, "table.NFCDetalhe_Item")
    
    items = []
    
    item_id = 1
    while True:
        try:
            item = driver.find_element(By.ID, f"Item + {item_id}")
            cells = item.find_elements(By.TAG_NAME, "td")
            if len(cells) >= 6:  # Verificar se há dados suficientes
                code = cells[0].text
                description = cells[1].text
                quantity = cells[2].text
                unit = cells[3].text
                unit_value = cells[4].text.replace(',', '.')
                total_value = cells[5].text.replace(',', '.')
                items.append({
                    'code': code,
                    'description': description,
                    'quantity': quantity,
                    'unit': unit,
                    'unit_value': float(unit_value),
                    'total_value': float(total_value)
                })
            item_id += 1
        except NoSuchElementException:
            break  # Sai do loop quando não encontrar mais itens
        
    try:
        td_valor_pago = wait.until(EC.visibility_of_element_located((By.XPATH, "/html/body/table/tbody/tr/td/div/table/tbody/tr/td/table/tbody/tr[3]/td/table/tbody/tr/td/table/tbody/tr[6]/td/table/tbody/tr[4]/td[2]")))
        total_value = float(td_valor_pago.text.replace(',', '.').strip())
    except TimeoutException:
        total_value = 0  # Defina um valor padrão ou lide com a ausência do valor final
    driver.quit()

    return items, total_value

#processa os itens e valor total da compra para transformar em json pro javascript
@app.route('/process_nfc', methods=['POST'])
def process_nfc():
    data = request.json
    url = data['url']
    items, total_value = get_nfc_data(url)
    if not items:
        items, total_value = get_alternative_nfc_data(url)
    
    return jsonify({'items': items, 'total_value': total_value})

if __name__ == '__main__':
    app.run(debug=True)
