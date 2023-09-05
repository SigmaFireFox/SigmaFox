from Emailers.EmailGenerator import generate_email


def new_user_email(new_user):

    def forgotten_password_body(user):
        content = f"Dear {user.f_name}\n" \
                  f"\n" \
                  f"You (specifically this email {user.email}) has been added to 11Sixteen Database Controller as a " \
                  f"new user.\n" \
                  f"As part of this process, your password to access your account has been system " \
                  f"generated as below:\n" \
                  f"\n" \
                  f"{user.pw}\n" \
                  f"\n" \
                  f"Please note there are no spaces in this password. We recommend that when you do login for the first " \
                  f"time, please consider changing your password to one that you will remember in future.\n" \
                  f"\n" \
                  f"Kind regards\n" \
                  f"Team 11Sixteen"

        return content

    email_body = forgotten_password_body(new_user)
    generate_email('User Management', new_user.email, '11Sixteen Database Controller - New login details', email_body)
