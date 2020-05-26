import smtplib, ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

user = "dtracksytest@gmail.com"
password = "zydnu5-vAqqan-qunjoq"


class Mail:
    def __init__(self, gmail_user):
        self.sender = gmail_user

    def login(self, gmail_password):
        self.server = smtplib.SMTP_SSL('smtp.gmail.com', 465)
        self.server.ehlo()
        self.server.login(self.sender, password)

    def create_message(self, vc_email, to_email, username, password):
        message = MIMEMultipart("alternative")
        message["Subject"] = "Tracksy Credentials"
        message["From"] = self.sender
        message["To"] = to_email
        html = """
        <html>
            <body>
                <p>Your startup has been registered by <b>%s</b> on Tracksy.</p>
        
                <p>Please find your login credentials below.</p>
                    <p>username: %s </p>
                    <p>password: %s </p>
            </body>
        <html>
        """ % (vc_email, username, password)

        message.attach(MIMEText(html, "html"))

        return message.as_string()

    def send(self, vc_email, to_email, username, password):
        message = self.create_message(vc_email, to_email, username, password)
        self.server.sendmail(self.sender, to_email, message)

    def logout(self):
        self.server.close()


