import smtplib, ssl

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
        subject = "Tracksy Credentials"
        to = [to_email]
        body = """
        Your startup has been registed by %s on Tracksy. 
        
        Please find your login credentials below. \n
        username: %s
        password: %s
        """ % (vc_email, username, password)

        email_text = """\
        From: %s
        To: %s
        Subject: %s

        %s
        """ % (self.sender, ", ".join(to), subject, body)
        return email_text

    def send(self, vc_email, to_email, username, password):
        message = self.create_message(vc_email, to_email, username, password)
        self.server.sendmail(self.sender, to_email, message)

    def logout(self):
        self.server.close()


