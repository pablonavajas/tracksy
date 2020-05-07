import time
from selenium import webdriver

driver = webdriver.Chrome('chromedriver')  # Set path to chromedriver - Optional argument, if not specified will search path.
driver.get('http://127.0.0.1:8000/#/login')
time.sleep(5) # Let the user actually see something!
driver.find_element_by_xpath("//a[@href='#/register']").click()
name_box = driver.find_element_by_id("username")
name_box.send_keys('randomUser')
email_box = driver.find_element_by_id("email")
email_box.send_keys('randomUser@example.com')
password1_box = driver.find_element_by_id("password")
password1_box.send_keys('123456')
password2_box = driver.find_element_by_id("password2")
password2_box.send_keys('123456')
time.sleep(5)

submit_box = driver.find_element_by_id("registerSubmitButton")
submit_box.submit()

time.sleep(5) # Let the user actually see something!
driver.quit()