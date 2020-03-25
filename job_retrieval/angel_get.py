""" Retrieval of job description information from angel.co (i.e. AngelList) saved to jobs.json
        Provide urls to angel jobs as command line arguments

    Requirements:
        selenium
        chrome webdriver

    example links:
        https://angel.co/company/globe-7/jobs/761230-cloud-engineer
        https://angel.co/company/konghq/jobs/761395-senior-software-engineer-kubernetes-remote
        https://angel.co/company/konghq/jobs/675881-technical-solutions-engineer

    TODO: agree on format for output
"""

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import sys
import json
import time

# Use google cache if block occurs
# "https://webcache.googleusercontent.com/search?q=cache:"

class Selectors:
    def __init__(self):
        self.job_full = "[data-test='JobDetail']"
        self.description = "[class*='description']"  # under job_full

        self.title_full = "[class*='title']"  # under job_full
        self.title = 'h2'  # under title_full
        self.salary = 'span'  # under title_full

        # specs
        self.specs = "[class*='characteristic']"  # under job_full
        self.spec_name = "dt"  # under specs
        self.spec_att = "dd"  # under specs


def by_css(page, selector):
    return page.find_element_by_css_selector(selector)


def all_by_css(page, selector):
    return page.find_elements_by_css_selector(selector)


class Job:
    def __init__(self, url):
        self.url = url
        self.description = None
        self.title = None
        self.salary = None
        self.salary = None
        self.specs = {}

    def get_elements(self, angel_page: webdriver, selectors: Selectors):
        job_full = by_css(angel_page, selectors.job_full)
        self.description = by_css(job_full, selectors.description).text

        title_full = by_css(job_full, selectors.title_full)
        self.title = by_css(title_full, selectors.title).text
        self.salary = by_css(title_full, selectors.salary).text

        specs = all_by_css(job_full, selectors.specs)
        for spec in specs:
            name = by_css(spec, selectors.spec_name).text
            spec_att = by_css(spec, selectors.spec_att).text
            if spec_att.count("\n") > 0:
                spec_att = spec_att.split("\n")
            self.specs[name] = spec_att


def create_driver() -> webdriver:
    options = Options()
    user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) ' \
                 'Chrome/60.0.3112.50 Safari/537.36'
    options.headless = True
    options.add_argument(f'user-agent={user_agent}')
    return webdriver.Chrome('/Applications/chromedriver', options=options)


if __name__ == '__main__':
    driver = create_driver()
    selectors = Selectors()

    jsons = []
    for i, url in enumerate(sys.argv[1:]):
        driver.get(url)
        job = Job(url)
        job.get_elements(driver, selectors)
        jsons.append(job.__dict__)
        print("Job description for: {} \n \t Retrieved".format(url))

    with open("jobs.json", "w") as f:
        json.dump(jsons, f)

    driver.quit()
