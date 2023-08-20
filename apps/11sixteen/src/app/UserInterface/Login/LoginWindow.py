import tkinter as tk
from UserInterface.GlobalResources.GUIObjectsComponents import \
    ImagedLabel, \
    StandardEntryBoxWithDefaultText, \
    PasswordEntryBoxWithDefaultText
from UserInterface.GlobalResources.GuiObjectsFactories import \
    ImagedButton, \
    PhotoImage, \
    ColourSchemedButton, \
    MessageBox
from LoginValidation import validate_login, validate_login_with_return
from ForgottenPassword import forgotten_password_recovery


# Setting up window
root = tk.Tk()
root.title("11Sixteen Database Management Controller - Login")
flavicon = PhotoImage('../GlobalResources/Images_Icons/Flavicon.png')
root.iconphoto(False, flavicon)

# Create widgets
logo = ImagedLabel(root, '../GlobalResources/Images_Icons/Logo.png')
message_label = MessageBox(root, "Please enter your login details", height=4)
email_entry = StandardEntryBoxWithDefaultText(root, "Email")
password_entry = PasswordEntryBoxWithDefaultText(root, "Password")
login_btn = ColourSchemedButton(root, "GreenBlue", "Login")
view_pw = ImagedButton(root, 'Eye_Icon.png', "MicroGroove")
forgot_pw_btn = ColourSchemedButton(root, "PaleGreen", "Forgot Password")

# Binding
password_entry.box.bind(
    '<Return>',
    lambda e, em=email_entry, pw=password_entry, i=message_label, fp=forgot_pw_btn, r=root:
    validate_login_with_return(e, em, pw, i, fp, r)
)
login_btn.config(
    command=lambda em=email_entry, pw=password_entry, i=message_label, fp=forgot_pw_btn, r=root:
    validate_login(em, pw, i, fp, r)
)
view_pw.btn.bind('<ButtonRelease-1>', lambda e: password_entry.hide_content(e))
view_pw.btn.bind('<Button-1>', lambda e: password_entry.reveal_content(e))
forgot_pw_btn.config(command=lambda em=email_entry, i=message_label: forgotten_password_recovery(em, i))

# PLace widgets
logo.label.grid(row=0, column=0, columnspan=5, padx=100)
message_label.grid(row=1, column=0, columnspan=5, pady=20)
email_entry.box.grid(row=4, column=0, columnspan=5, pady=8)
password_entry.box.grid(row=5, column=0, columnspan=5, pady=8)
view_pw.btn.grid(row=5, column=4, columnspan=1)
login_btn.grid(row=6, column=0, columnspan=5, pady=10)
forgot_pw_btn.grid(row=7, column=0, columnspan=5, pady=10)

root.mainloop()
