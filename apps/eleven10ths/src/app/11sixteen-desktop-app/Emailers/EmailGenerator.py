"""
Should complete this later
"""
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
from pymongo import MongoClient


class EmailSender:
    """
    Object that required to sent up an SMTP server
    """
    def __init__(self, host, port, address, pw):
        self.host = host
        self.port = port
        self.add = address
        self.pw = pw


def generate_email(email_sender_description, recipient, subject_line, email_body):
    """
    Complete function of generating and sending an email
    """
    def find_email_sender(email_sender_desc):
        """
        Sources an email send from the database
        """
        sender = EmailSender
        client = MongoClient('mongodb+srv://RubenFerreira:TPVXAliOZt3OqFpk@11sixteen.zzyri.mongodb.net/test?')
        db = client['football_data']
        emails = db['email_senders']

        email_options = emails.aggregate([
            {'$match':
                {'description': email_sender_desc}
             },
        ])

        email_selected = False
        for email in email_options:
            if not email_selected:
                sender.host = email['host']
                sender.port = email['port']
                sender.add = email['address']
                sender.pw = email['password']
                email_selected = True

        return sender

    def setup_smtp(sender):
        """
        Set up the smtp sever from which the email will be sent
        """
        server = smtplib.SMTP(host=sender.host, port=sender.port)
        server.starttls()
        server.login(sender.add, sender.pw)

        return server

    def create_email_message(server, sender, receiver, sub_line, content):
        """
        Creates the email to be sent
        """
        email = MIMEMultipart()
        email['From'] = sender.add
        email['To'] = receiver
        email['Subject'] = sub_line

        email.attach(MIMEText(content))

        # send the message via the server set up earlier.
        server.send_message(email)
        del email

    # ----------------------------------------- main section of function ----------------------------------
    email_sender = find_email_sender(email_sender_description)
    smtp = setup_smtp(email_sender)
    create_email_message(smtp, email_sender, recipient, subject_line, email_body)
