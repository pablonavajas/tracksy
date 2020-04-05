import requests as r
import json


class Apis:
    def __init__(self, base='http://127.0.0.1:8000/api/'):
        self.username = "david"
        self.password = "123456"
        self.token = None
        self.startup = "zoom"
        self.startupId = None
        self.jobId = None
        self.connectionId = 1

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

    def post(self, url, headers, data):
        data = json.dumps(data)
        response_json = r.post(url, headers=headers, data=data)
        return json.loads(response_json.text)

    def get(self, url, headers):
        response_json = r.post(url, headers=headers)
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
        print(response)
        self.startupId = response['id']
        return response

    def getStartups(self):
        header = self.header(self.token)
        return self.get(self._startup, header)

    def addInvestments(self):
        header = self.header(self.token)
        data = [
            {
                "value": 100,
                "currency": "$",
                "date": "1900-04-04"
            },
            {
                "value": 1000,
                "currency": "$",
                "date": "2000-01-01"
            }
        ]
        url = self._investments + str(self.startupId) + '/'
        response = self.post(url, header, data)
        return response

    def addKpiNames(self):
        header = self.header(self.token)
        data = [
            {
                "name": "One"
            },
            {
                "name": "Two"
            }
        ]
        url = self._kpiNames + str(self.startupId) + '/'
        response = self.post(url, header, data)
        return response

    def addFinancial(self):
        header = self.header(self.token)
        data = {
            "comment": "First Report",
            "currency": "$",
            "revenue": 10,
            "cashBalance":100,
            "monthlyBurn":1000,
            "startDate": "2005-04-04",
            "endDate": "2005-05-05",
            "kpis": [
                {
                    "name":"One",
                    "value":0.1
                },
                {
                    "name":"Two",
                    "value":0.5
                }
            ]
        }
        url = self._kpiNames + str(self.startupId) + '/'
        return self.post(url, header, data)

    def addJob(self):
        header = self.header(self.token)
        data = {
            "title": "some job",
            "description": "some interesting job description",
            "salary": "1,000,000",
            "url": "https://angel.co/company/globe-7/jobs/761230-cloud-engineer"
        }
        url = self._job + str(self.startupId) + '/'
        response = self.post(url, header, data)
        self.jobId = response['id']
        return response

    def addConnections(self):
        header = self.header()
        data = {
                "username": self.username,
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
                    }
                ]
            }
        response = self.post(self._connections, header, data)
        return response

    def addIntroduction(self):
        header = self.header(self.token)
        url = self._introduction + str(self.startupId) + '/' + str(self.jobId) + \
              '/' + str(self.connectionId) + '/'
        response = self.post(url, header, {})
        return response

    def create(self):
        # self.register()
        self.login()
        self.addStartup()    # can specify name of startup here
        self.addInvestments()
        self.addKpiNames()
        self.addFinancial()
        self.addJob()
        self.addConnections()
        self.addIntroduction()
        print("Username:" + self.username)
        print("Password:" + self.password)
        print("Startup:" + self.startup)


if __name__ == '__main__':
    api = Apis()
    api.create()
