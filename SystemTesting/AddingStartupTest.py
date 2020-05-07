import time
from selenium import webdriver
from selenium.webdriver.support.ui import Select

driver = webdriver.Chrome('chromedriver')  # Set path to chromedriver - Optional argument, if not specified will search path.
driver.get('http://127.0.0.1:8000/#/login')
time.sleep(2) # Let the user actually see something!
name_box = driver.find_element_by_id("username")
name_box.send_keys('randomUser')
password1_box = driver.find_element_by_id("password")
password1_box.send_keys('123456')
time.sleep(2)

submit_box = driver.find_element_by_name("action")
submit_box.submit()

time.sleep(2) # Let the user actually see something!

driver.find_element_by_xpath("//a[@href='#add-startup-modal']").click()
time.sleep(2)

add_name_box = driver.find_element_by_id("addStartupName")
add_name_box.send_keys('Zoom')
add_url_box = driver.find_element_by_id("addWebsiteUrl")
add_url_box.send_keys('zoom.com')
add_own_box = driver.find_element_by_id("addOwnership")
add_own_box.send_keys('1')
add_email_box = driver.find_element_by_id("addStartupEmail")
add_email_box.send_keys('zoom@zoom.com')
select_board = Select(driver.find_element_by_id("addBoard"))
select_board.select_by_visible_text('Member')

time.sleep(2)

driver.find_element_by_xpath("//a[@class='btn waves-effect waves-light light-blue modal-close']").click()

time.sleep(2)
driver.quit()