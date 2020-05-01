import time
from selenium import webdriver

driver = webdriver.Chrome('chromedriver')  # Optional argument, if not specified will search path.
driver.get('http://127.0.0.1:8000/#/login')
time.sleep(5) # Let the user actually see something!
name_box = driver.find_element_by_id("username")
name_box.send_keys('randomUser')
password1_box = driver.find_element_by_id("password")
password1_box.send_keys('123456')
time.sleep(5)

submit_box = driver.find_element_by_name("action")
submit_box.submit()

time.sleep(5) # Let the user actually see something!
driver.quit()