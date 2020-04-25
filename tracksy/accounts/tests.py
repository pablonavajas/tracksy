from django.test import TestCase
from accounts.models import Info, Connection
from django.contrib.auth.models import User

# Create your tests here.
class UserInfoTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user("David", "david@gmail.com", "123456")

    def test_info_relation_created_with_user_as_fk(self):
        Info.objects.create(user=self.user, isStartup=False)
        self.assertEqual(self.user.info.isStartup, False)

class ConnectionTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user("David", "david@gmail.com", "123456")

    def test_connection_created_with_user_as_fk(self):
        connection = Connection.objects.create(
            user=self.user,
            owner="David",
            name="Yura",
            url="https://www.linkedin.com/in/iurietarlev/",
            description="Software Engineer"
        )
        self.assertEqual(self.user.connections.get(pk=connection.pk), connection)

