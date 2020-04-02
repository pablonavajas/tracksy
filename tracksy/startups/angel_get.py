""" Retrieval of job description information from angel.co (i.e. AngelList) returns dictionary

    Requirements:
        requests
        bs4

    example links:
        https://angel.co/company/globe-7/jobs/761230-cloud-engineer
        https://angel.co/company/konghq/jobs/761395-senior-software-engineer-kubernetes-remote
        https://angel.co/company/konghq/jobs/675881-technical-solutions-engineer

    TODO: agree on format for output
"""

import sys
import requests
from bs4 import BeautifulSoup

# from selenium import webdriver
# from selenium.webdriver.chrome.options import Options


class Selectors:
    def __init__(self, parser="bs4"):
        if parser == "bs4":
            self.select_funcs = ["select_one", "select"]
        elif parser == "chrome":
            self.select_funcs = ["find_element_by_css_selector",
                                 "find_elements_by_css_selector"]
        else:
            raise KeyError("Unrecognised parser specified")

        self.job_full = "[data-test='JobDetail']"
        self.description = "[class*='description']"  # under job_full

        self.title_full = "[class*='title']"  # under job_full
        self.title = 'h2'  # under title_full
        self.salary = 'span'  # under title_full

        # specs
        self.specs = "[class*='characteristic']"  # under job_full
        self.spec_name = "dt"  # under specs
        self.spec_att = "dd"  # under specs



    def by_css(self, data, selector):
        func = self.select_funcs[0]
        return getattr(data, func)(selector)


    def all_by_css(self, data, selector):
        func = self.select_funcs[1]
        return getattr(data, func)(selector)


class Job:
    def __init__(self, url):
        self.url = url
        self.description = None
        self.title = None
        self.salary = None
        self.salary = None
        self.specs = {}

    def get_elements(self, angel_page, s: Selectors):
        job_full = s.by_css(angel_page, s.job_full)
        self.description = s.by_css(job_full, s.description).text

        title_full = s.by_css(job_full, s.title_full)
        self.title = s.by_css(title_full, s.title).text
        self.salary = s.by_css(title_full, s.salary).text

        specs = s.all_by_css(job_full, s.specs)
        for spec in specs:
            name = s.by_css(spec, s.spec_name).text
            spec_att = s.by_css(spec, s.spec_att).text
            if spec_att.count("\n") > 0:
                spec_att = spec_att.split("\n")
            self.specs[name] = spec_att


if "webdriver" in sys.modules:
    def create_driver(user_agent) -> webdriver:
        """ Set up headless chrome driver

        Requirements:
            selenium
            chrome webdriver
        """

            options = Options()
        options.headless = True
        options.add_argument(f'user-agent={user_agent}')
        return webdriver.Chrome('/Applications/chromedriver', options=options)


def get_description(angel_link):
    user_agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) ' \
                 'Chrome/60.0.3112.50 Safari/537.36'
    archive = "https://webcache.googleusercontent.com/search?q=cache:"
    s = Selectors()
    url = archive + angel_link
    response = requests.get(url, headers={'user-agent':user_agent})
    soup = BeautifulSoup(response.text, 'html.parser')
    job = Job(angel_link)
    job.get_elements(soup, s)
    return job.__dict__
