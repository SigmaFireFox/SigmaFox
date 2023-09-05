import tkinter as tk
from tkinter import messagebox
from UserInterface.GlobalResources.GuiObjectsFactories import LabelEntryCombo, ColourSchemedButton, MessageBox
from UserInterface.GlobalResources.EmailValidations import email_valid
from UserInterface.GlobalResources.PasswordGenerator import generate_password
from UserInterface.Login.UserAndPasswordValidation import retrieve_all_users, find_email_matches, match_count
from Emailers.EmailTemplates.NewUser import new_user_email


class NewUser:
    def __init__(self, f_name, l_name, email):
        self.f_name = f_name
        self.l_name = l_name
        self.email = email
        self.pw = generate_password()


def add_new_user(act_panel):

    def all_entries_empty():
        if f_name.entry.index("end") != 0:
            return False
        if l_name.entry.index("end") != 0:
            return False
        if email.entry.index("end") != 0:
            return False
        return True

    def all_entries_complete():
        if f_name.entry.index("end") == 0:
            return False
        if l_name.entry.index("end") == 0:
            return False
        if email.entry.index("end") == 0:
            return False
        return True

    def cancel():
        if all_entries_empty():
            act_panel.grid_forget()
        else:
            MsgBox = messagebox.askquestion('Cancel adding new user',
                                            'Would you like to cancel the entry of this new user - if yes, the '
                                            'current information entered will be lost',
                                            icon='question')
            if MsgBox == 'yes':
                act_panel.grid_forget()

    def no_dup_emails(email):
        user_collection = retrieve_all_users()
        email_matches = find_email_matches(user_collection, email)
        if match_count(email_matches) == 0:
            return True
        else:
            return False

    def write_new_user_to_db(new_user, collection):
        collection.insert_one({
            'first_name': new_user.f_name,
            'last_name': new_user.l_name,
            'email': new_user.email,
            'password': new_user.pw
        })

    def permission_to_save_new_user():
        MsgBox = messagebox.askquestion('Save new user',
                                        'Are you sure you would like to save this user to the User Database?',
                                        icon='question')
        if MsgBox == 'yes':
            return True
        else:
            return False

    def save_process():
        if all_entries_complete():
            if email_valid(email.entry.get()):
                message_box.update_content(act_panel, "Checking for possible duplicates")
                new_user = NewUser(f_name.entry.get(), l_name.entry.get(), email.entry.get())
                if no_dup_emails(email.entry.get()):
                    message_box.update_content(act_panel, "No duplicates found")
                    if permission_to_save_new_user():
                        user_collection = retrieve_all_users()
                        message_box.update_content(act_panel, "Saving new user")
                        write_new_user_to_db(new_user, user_collection)
                        new_user_email(new_user)
                        messagebox.showinfo("New User Saved",
                                            f"{f_name.entry.get()} {l_name.entry.get()} has now been added as a new "
                                            f"user. {f_name.entry.get()} will be emailed their password to "
                                            f"{email.entry.get()}")
                        message_box.update_content(act_panel, "")
                else:
                    messagebox.showinfo("Duplicate emails found",
                                        "It seems that this users email already exists on the users database, in this "
                                        "case we recommend that you rather select the 'Maintain users' option, or "
                                        "alternatively the user themselves select the 'Forgot Password' option "
                                        "available in the login window after a first login attempt")
            else:
                messagebox.showinfo("Email invalid",
                                    "The email entered seems to be invalid - please correct and save after")
        else:
            messagebox.showinfo("All data not complete", "Please ensure all field are complete before trying to save")

    def key_pressed(event):
        if all_entries_complete():
            save_btn.config(state='normal', bg="#43E082")
        else:
            save_btn.config(state='disabled', bg='gray80')

    # Create objects
    title = MessageBox(act_panel, "Add new user", anchor='center')
    f_name = LabelEntryCombo(act_panel, "First name:")
    l_name = LabelEntryCombo(act_panel, "Last name:")
    email = LabelEntryCombo(act_panel, "Email:")
    save_btn = ColourSchemedButton(act_panel, "GreenBlue", "Save", state='disabled', bg='gray80')
    cancel_btn = ColourSchemedButton(act_panel, "PaleGreen", "Cancel")
    message_box = MessageBox(act_panel, "*All fields to be complete for saving to be enabled")

    # Bind objects (as required)
    f_name.entry.bind('<KeyRelease>', lambda e: key_pressed(e))
    l_name.entry.bind('<KeyRelease>', lambda e: key_pressed(e))
    email.entry.bind('<KeyRelease>', lambda e: key_pressed(e))
    cancel_btn.config(command=lambda: cancel())
    save_btn.config(command=lambda: save_process())

    # Place objects
    title.grid(row=0, column=0, columnspan=3, padx=10, pady=10)
    f_name.frame.grid(row=1, columnspan=3, padx=10, pady=10, sticky='NW')
    l_name.frame.grid(row=2, columnspan=3, padx=10, pady=10, sticky='NW')
    email.frame.grid(row=3, columnspan=3, padx=10, pady=10, sticky='NW')
    message_box.grid(row=4, column=0, padx=10, pady=10, sticky='W')
    cancel_btn.grid(row=4, column=1, padx=10, pady=10, sticky='E')
    save_btn.grid(row=4, column=2, padx=10, pady=10, sticky='E')

    # Configure grid
    act_panel.grid_columnconfigure(0, weight=1)
    act_panel.grid_columnconfigure(1, weight=0)
    act_panel.grid_columnconfigure(2, weight=0)
