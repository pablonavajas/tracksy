from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase, APIClient
from django.contrib.auth.models import User
from accounts.models import Info, Connection
from accounts.serializers import UserSerializer
from accounts.api import RegisterAPI, LoginAPI


class UserGenerator:
    def __init__(self, name="a", password="123456", isStartup=False, add_to_db=False):
        self.username = name
        self.email = name + "@gmail.com"
        self.password = password
        self.isStartup = isStartup
        self.db_representation = None
        if add_to_db:
            self.add_user_to_User_db()
            self.add_info_relation_for_user()

    def as_list(self):
        d = self.as_dict()
        li = []
        for el in d:
            li.append(el)
        return li

    def as_dict(self):
        d = self.__dict__.copy()
        d.pop('db_representation')
        return d

    def data(self):
        """ No password """
        all = self.as_dict()
        all.pop("password")
        return all

    def credentials(self):
        return {"username": self.username, "password": self.password}

    def add_user_to_User_db(self):
        if self.db_representation is None:
            self.db_representation = User.objects.create_user(
                self.username, self.email, self.password)
        return self.db_representation

    def add_info_relation_for_user(self):
        Info.objects.create(user=self.db_representation, isStartup=False)

class ConnectionGenerator:
    def __init__(self, owner, name="seb", description="soft eng"):
        self.owner = owner
        self.name = name
        self.url = "https://www.linkedin.com/in/" + name + "/"
        self.description = description

    def as_list(self):
        d = self.as_dict()
        li = []
        for el in d:
            li.append(el)
        return li

    def as_dict(self):
        return self.__dict__.copy()


class ModelsTest(TestCase):
    def setUp(self):
        self.user = UserGenerator("David")
        self.db_user = self.user.add_user_to_User_db()

    def test_connection_created_with_user_as_fk(self):
        connection = ConnectionGenerator(owner=self.user.username)
        db_connection = Connection.objects.create(
            user=self.db_user,
            **(connection.as_dict())
        )
        user_connection = self.db_user.connections.get(pk=db_connection.pk)
        for key, value in connection.as_dict().items():
            self.assertEqual(getattr(user_connection, key), value)

    def test_info_created_with_user_as_fk(self):
        self.user.add_info_relation_for_user()
        self.assertEqual(self.db_user.info.isStartup, False)


class AccountsApiTest(APITestCase):
    def setUp(self):
        self.user = UserGenerator("David")
        self.user_db = self.user.add_user_to_User_db()
        self.user.add_info_relation_for_user()

    def test_login_user(self):
        credentials = self.user.credentials()
        url = reverse("knox_login")
        response = self.client.post(url, credentials, format='json')
        data = response.data
        self.assertIsNotNone(data.pop("id"))
        self.assertIsNotNone(data.pop("token"))
        self.assertIsNotNone(data.pop("expiry"))
        self.assertEqual(data, self.user.data())

    def test_register_user(self):
        user = UserGenerator("Andrew")
        url = reverse("register")
        response = self.client.post(url, user.as_dict(), format='json')
        data = response.data
        self.assertIsNotNone(data.pop("id"))
        self.assertIsNotNone(data.pop("token"))
        self.assertEqual(data, user.data())

    def test_ConnectionsAPI_post_adds_list_of_connections_for_user(self):
        client = APIClient()
        """ Login User """
        client.force_authenticate(user=self.user_db)

        """ Setting up data for sending """
        owner = self.user.username
        connecitons = [
            ConnectionGenerator(owner, "Seb", "Front End Engineer").as_dict(),
            ConnectionGenerator(owner, "Pablo", "Database Engineer").as_dict()
        ]

        """ Sending a request """
        url = reverse("connections")
        response = client.post(url, {"connections": connecitons}, format='json')
        connection_ids_list = response.data["connectionIds"]
        self.assertEqual(len(connecitons), len(connection_ids_list))



