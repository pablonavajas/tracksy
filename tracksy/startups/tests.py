from django.test import TestCase
from rest_framework.test import APIClient
from accounts.tests import UserGenerator
from django.contrib.auth.models import User
from django.urls import reverse


# Create your tests here.

class StartupsApiTest(TestCase):
    fixtures = ['tests.json', ]

    def setUp(self):
        user = User.objects.get(username="david")
        self.client = APIClient()
        self.client.force_authenticate(user=user)
        self.startup = user.startups.get(name="zoom")

    def test_adds_startup_to_database_and_creates_startup_account(self):
        request_body = {
            "name": "skype",
            "website": "skype.com",
            "ownership": 50,
            "board": "member",
            "startupEmail": "skype@gmail.com"
        }
        url = reverse("startups")
        response = self.client.post(url, request_body, foramt='json')
        data = response.data
        for key, value in request_body.items():
            # Keys and Values from request are present in response
            self.assertEqual(data[key], value)

        # Number of users assigned to newly created Startup is 2
        self.assertEqual(len(data['users']), 2)

    def test_adds_investment_for_startup(self):
        url = reverse("investments", args=[self.startup.pk])
        investment = {
            "value": 100000,
            "currency": "$",
            "date": "2015-01-01"
        }
        body = [investment]
        response = self.client.post(url, body, format='json')
        data = response.data
        investment_added = data["added"][0]
        for key, value in investment.items():
            self.assertEqual(investment_added[key], value)

    def test_adds_financials_for_startup(self):
        url = reverse("financials", args=[self.startup.pk])
        body = {
            'comment': "Report number Z",
            'currency': "$",
            'revenue': 3200,
            'cashBalance': 100000,
            'monthlyBurn': 1000,
            'startDate': "2010-03-04",
            'endDate': "2010-03-03",
            'kpis': [{
                "name": "OEE",
                "value": 0.7
            }]
        }
        response = self.client.post(url, body, format='json')
        kpis = body.pop('kpis')
        response_kpis = response.data.pop('kpis')

        for key, value in body.items():
            self.assertEqual(response.data[key], value)

        for i in range(len(kpis)):
            for key, value in kpis[i].items():
                self.assertEqual(response_kpis[i][key], value)
