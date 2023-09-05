"""
Process to be followed when user has requested password recover process
"""
from pymongo import MongoClient
from UserInterface.GlobalResources.UserObjects import User
from tkinter import messagebox
from UserInterface.GlobalResources.EmailValidations import email_valid
from UserInterface.Login.UserAndPasswordValidation import retrieve_all_users, find_email_matches
from Emailers.EmailTemplates.ForgottenPassword import password_recovery_email


def forgotten_password_recovery(user_email, instr):
    """
    To be completed
    """
    def user_agrees_to_proceed():
        MsgBox = messagebox.askquestion('Password recovery', 'Would you like to have your password emailed to you',
                                           icon='question')
        if MsgBox == 'yes':
            return True
        else:
            return False

    def retrieve_user_details(email):
        """
        Enter user collection and retrieve password
        """

        def find_email_matches(collection, em):
            matched_emails = collection.aggregate([
                {'$match':
                     {'email': em.content}
                 },
            ])

            return matched_emails

        def get_users_collection():
            client = MongoClient('mongodb+srv://RubenFerreira:TPVXAliOZt3OqFpk@11sixteen.zzyri.mongodb.net/test?')
            db = client['football_data']
            collection = db['users']

            return collection

        def record_user_details(found_users):
            user_obj = User
            user_selected = False
            for u in found_users:
                if not user_selected:
                    user_obj.first_name = u['first_name']
                    user_obj.last_name = u['last_name']
                    user_obj.email = u['email']
                    user_obj.pw = u['password']
                    user_selected = True

            return user_obj

        users = get_users_collection()
        users_found = find_email_matches(users, email)
        user = record_user_details(users_found)
        return user

    # ------------------------- Function main section --------------------------

    user_email.save_content()
    if email_valid(user_email.content):
        users = retrieve_all_users()
        email_matches = find_email_matches(users, user_email.content)
        if email_matches.alive:
            if user_agrees_to_proceed():
                instr.config(text="Sending password recovery email \n"
                                  "One moment")
                user_data = retrieve_user_details(user_email)
                password_recovery_email(user_data)
                messagebox.showinfo("Password recovery email sent",
                                    f"A password recovery email has been sent to {user_email.content}")
        else:
            messagebox.showinfo("Email not found",
                                f"The email entered does not seem to exsist, please check email and try again, "
                                f"alternatively if this error continues to occur please contract your administrator")
    else:
        messagebox.showinfo("No email entered",
                            f"Please enter a VALID email, before attempting a Forgotten email process")




