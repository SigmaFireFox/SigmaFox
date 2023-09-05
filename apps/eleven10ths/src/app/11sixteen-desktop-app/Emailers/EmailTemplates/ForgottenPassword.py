from Emailers.EmailGenerator import generate_email


def password_recovery_email(user_obj):

    def forgotten_password_body(user_data):
        content = f"Dear {user_data.first_name}\n" \
                  f"\n" \
                  f"A request has been to recover your password for 11Sixteen Database Management Controller has " \
                  f"been made. If you have not made this request, please contract your administrator. If you did in " \
                  f"fact make this request, your password is provided below:\n" \
                  f"\n" \
                  f"{user_data.pw}\n" \
                  f"\n" \
                  f"We recommend that when you do login, please consider changing your password to one that you will " \
                  f"remember in future.\n" \
                  f"\n" \
                  f"Kind regards\n" \
                  f"Team 11Sixteen"

        return content

    email_body = forgotten_password_body(user_obj)
    generate_email('User Management', user_obj.email, '11Sixteen Database Controller - Password Recovery', email_body )
