""" Run this script to fill the database with some dummy data """

import requests as r
import json
from random import randint


class Apis:
    def __init__(self, base='http://127.0.0.1:8000/api/'):
        self.username = "david"
        self.password = "123456"
        self.token = None
        self.startup = "zoom"
        self.startupId = None
        self.jobIds = []
        self.connectionIds = None
        self.valueRange = [1000, 10000]  # used for Financials and Investments
        self.kpiNames = ["OEE", "Availability", "Performance"]
        self.numberOfFinancials = 5
        self.numberOfInvestments = 3
        self.currency = "$"

        self._register = base + 'auth/register'  # POST
        self._login = base + 'auth/login'   # POST
        self._startup = base + 'startups/'  # POST, GET and PUT
        self._investments = base + 'investments/'   # POST
        self._kpiNames = base + 'kpiNames/'
        self._financials = base + 'financials/'
        self._job = base + 'job/'
        self._connections = base + 'connections'
        self._introduction = base + 'introduction/'  # strartupId/jobId/connectionId

    def header(self, token=None):
        if token is not None:
            return {'Content-Type': 'application/json', 'Authorization': "Token " + token}
        return {'Content-Type': 'application/json'}

    def post(self, url, headers, data, response=True):
        data = json.dumps(data)
        response_json = r.post(url, headers=headers, data=data)
        if response is False:
            return None
        try:
            return json.loads(response_json.text)
        except json.decoder.JSONDecodeError:
            print(response_json.text)
            print("\nError with request, this is likely because username is already registered")
            print("Change api.username and api.startup at the end of file to names of your choice for a fix")
            exit()

    def get(self, url, headers):
        response_json = r.get(url, headers=headers)
        return json.loads(response_json.text)

    def register(self):
        data = {
            "username": self.username,
            "email": self.username + "@gmail.com",
            "isStartup": False,
            "password": self.password
        }
        return self.post(self._register, self.header(), data)

    def login(self):
        data = {
            'username': self.username,
            'password': self.password
        }
        response = self.post(self._login, self.header(), data)
        self.token = response['token']
        return response

    def addStartup(self, name=None):
        header = self.header(self.token)
        if name is None:
            name = self.startup
        data = {
                "name": name,
                "website": name + ".com",
                "ownership": 50,
                "board": "member",
                "startupEmail": name + "@gmail.com"
        }
        response = self.post(self._startup, header, data)
        self.startupId = response['id']
        return response

    def getStartups(self):
        header = self.header(self.token)
        return self.get(self._startup, header)

    def addInvestments(self):
        header = self.header(self.token)
        data = []
        for i in range(self.numberOfInvestments):
            investment = {
                "value": randint(self.valueRange[0], self.valueRange[1]),
                "currency": self.currency,
                "date": "201{}-05-05".format(i)
            }
            data.append(investment)
        url = self._investments + str(self.startupId) + '/'
        response = self.post(url, header, data)
        return response

    def addKpiNames(self):
        header = self.header(self.token)
        data = []
        for kpiName in self.kpiNames:
            data.append({'name': kpiName})

        url = self._kpiNames + str(self.startupId) + '/'
        response = self.post(url, header, data)
        return response

    def addFinancial(self, number):
        header = self.header(self.token)
        data = {}
        data['comment'] = "Report number {}".format(number)
        data['currency'] = "$"
        data['revenue'] = randint(self.valueRange[0], self.valueRange[1])
        data['cashBalance'] = randint(self.valueRange[0], self.valueRange[1])
        data['monthlyBurn'] = randint(self.valueRange[0], self.valueRange[1])
        data['startDate'] = "2019-0{}-0{}".format(number, number)
        data['endDate'] = "2019-0{}-0{}".format(number+1, number+1)

        kpis = []
        for kpiName in self.kpiNames:
            value = randint(1, 100) / 100
            kpis.append({'name': kpiName, "value": value})
        data['kpis'] = kpis

        url = self._financials + str(self.startupId) + '/'
        return self.post(url, header, data)

    def addFinancials(self):
        for i in range(1, self.numberOfFinancials+1):
            self.addFinancial(i)

    def jobDescription(self, title="Job 1", description="soft engineer", salary="100,000",
                       location="London", link=None):
        if link is None:
            link = "https://angel.co/company/konghq/jobs/761395-senior-software-engineer-kubernetes-remote"
        data = {
            "title": title,
            "description": description,
            "salary": salary,
            "location": location,
            "url": link
        }
        return data

    def addJob(self, job_data=None):
        header = self.header(self.token)
        if job_data is None:
            job_data = self.jobDescription()
        url = self._job + str(self.startupId) + '/'
        response = self.post(url, header, job_data)
        self.jobIds.append(response['id'])
        return response

    def addConnections(self):
        header = self.header(token=self.token)
        data = {
                "connections": [
                    {
                        "owner": "David",
                        "name": "Yura",
                        "url": "https://YurasLinkeIn.com",
                        "description": "front-end dev"
                    },
                    {
                        "owner": "David",
                        "name": "Pablo",
                        "url": "https://PablosLinkeIn.com",
                        "description": "db eng"
                    },
                    {
                        "owner": "David",
                        "name": "Ed",
                        "url": "https://Ed.com",
                        "description": "Database dev"
                    },
                    {
                        "owner": "David",
                        "name": "Seb",
                        "url": "https://Seb.com",
                        "description": "Frontend eng"
                    },
                    {
                        "owner": "David",
                        "name": "Andrew",
                        "url": "https://Andrew.com",
                        "description": "Sales"
                    }
                ]
            }
        response = self.post(self._connections, header, data)
        return response

    def addIntroductions(self):
        header = self.header(self.token)
        connections = self.get(self._connections, header)
        for jobId in self.jobIds:
            for i in range(2):
                url = self._introduction + str(self.startupId) + '/' + str(jobId) + \
                    '/' + str(connections.pop()['id']) + '/'
                self.post(url, header, {"status": "connected"}, response=False)

    def create(self,):
        self.register()
        self.login()
        self.addStartup()    # can specify name of startup here
        self.addInvestments()
        self.addKpiNames()
        self.addFinancials()
        self.addJob()
        job = self.jobDescription(title="Front End",
                                  description="Driven software engineer, experience with Node.js and redux",
                                  salary="10,000",
                                  link="https://angel.co/company/code-for-america/jobs/776395-senior-consulting-engineer")
        self.addJob(job_data=job)
        self.addConnections()
        self.addIntroductions()
        print("Username: " + self.username)
        print("User Password: " + self.password)
        print("Startup: " + self.startup)


if __name__ == '__main__':
    api = Apis()
    api.username = "david"
    api.startup = "zoom"
    api.create()
