import tkinter as tk
import UserAndPasswordValidation
import UserInterface.MainMenu.MainMenuWindow as MwW
from UserInterface.GlobalResources.EmailValidations import email_valid


def validate_login_with_return(event, em, pw, instr, forgot_pw_link, root):
    validate_login(em, pw, instr, forgot_pw_link, root)


def validate_login(em, pw, instr, forgot_pw_link, root):
    # ---------- Initialization ----------
    def initialization():
        update_instruction("One moment please")
        em.save_content()
        pw.save_content()
        determine_contains_value(em)
        determine_contains_value(pw)

    # ---------- Validation tests  ----------
    def determine_contains_value(obj):
        if obj.content == obj.default_text or obj.content == "":
            obj.contains_value = False
        else:
            obj.contains_value = True

    def both_contain_value(e, p):
        if e.contains_value and p.contains_value:
            return True
        else:
            return False

    def none_contain_value(e, p):
        if e.contains_value is False and p.contains_value is False:
            return True
        else:
            return False

    # ---------- Error reporting ----------
    def report_error(error_list):
        message = "Login attempt failed:\n"
        for error in error_list:
            message = message + "\n" + error
        update_instruction(message)

    def update_instruction(message):
        instr.config(text=message)
        tk.Tk.update(root)

    # ---------- Login attempt ----------
    def login_attempt():
        update_instruction("Attempting login - one moment")
        login_valid, response, user = UserAndPasswordValidation.validate_username_and_pw(em, pw)
        if login_valid:
            root.destroy()
            MwW.main_menu_window(user)
        else:
            update_instruction(f"{response} \n Please retry")
            if response == "Incorrect password":
                forgot_pw_link.config(text="Forgot Password", relief='groove')
                update_instruction(f"{response} \n\n Please retry or consider clicking \n the 'Forgot Password' "
                                   f"option below")

    # -------------------------- function main process -----------------------------
    initialization()

    if both_contain_value(em, pw):
        if email_valid(em.content):
            login_attempt()
        else:
            report_error(["The email entered does not seem valid"])

    elif none_contain_value(em, pw):
        report_error(["No email entered",
                      "No password entered"])
    else:
        if not em.contains_value:
            report_error(["No email entered"])
        if not pw.contains_value:
            if email_valid(em.content):
                report_error(["No password entered"])
            else:
                report_error(["The email entered does not seem valid",
                             "No password entered"])
