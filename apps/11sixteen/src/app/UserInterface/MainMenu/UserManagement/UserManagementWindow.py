import tkinter as tk
from tkinter import messagebox
from pymongo import MongoClient
from UserInterface.GlobalResources.GuiObjectsFactories import ImagedButtonWithText, MessageBox, ColourSchemedButton
from UserInterface.MainMenu.UserManagement.AddNewUser.AddNewUser import add_new_user
from UserInterface.MainMenu.UserManagement.ManageUsers.MaintainUsers import maintain_users
from UserInterface.GlobalResources.UserObjects import User


def user_man_window(parent):

    # ---------------------- Window sub-menu initialisation functions --------------------------
    def add_user_init(e):
        # Clear activities panel
        for child in act_panel.winfo_children():
            child.destroy()
        # Send activities panel to function to populated
        add_new_user(act_panel)
        act_panel.grid(column=1, row=0, padx=10, pady=10, sticky='NW')

    def man_users_init(e):
        # Clear activities panel
        for child in act_panel.winfo_children():
            child.destroy()
        act_panel.config(borderwidth=0)
        # Send activities panel to function to populated
        maintain_users(act_panel, user_dict)
        act_panel.grid(column=1, row=0, padx=10, pady=10, sticky='NW')

    # ---------------------------------- Data gathering functions -------------------------------
    def retrieve_all_users():
        client = MongoClient('mongodb+srv://RubenFerreira:TPVXAliOZt3OqFpk@11sixteen.zzyri.mongodb.net/test?')
        db = client['football_data']
        collection = db['users']

        return collection

    def build_user_dict(collection):
        user_dictionary = {}
        for document in collection.find():
            user_dictionary[str(document['_id'])] = {'f_name' :  document['first_name'],
                                          'l_name': document['last_name'],
                                          'email': document['email'],
                                          'pw': document['password']
                                                     }
        return user_dictionary

    def on_closing():
        MsgBox = messagebox.askquestion('Exit Window',
                                        f'Are you sure you want to close this window - Any unsaved changes will be '
                                        f'lost?',
                                        icon='question')
        if MsgBox == 'yes':
            user_man_win.destroy()


    # ------------------------------------ Main processes -----------------------------------------------------
    if parent is not None:
        parent.destroy()

    # Window Setup
    user_man_win = tk.Tk()
    user_man_win.title("11Sixteen Database Management Controller - User Management")
    user_man_win.geometry("%dx%d+0+0" % (user_man_win.winfo_screenwidth(), user_man_win.winfo_screenheight()))
    user_man_win.protocol("WM_DELETE_WINDOW", on_closing)

    # Message user of delay (while gathering data from DB)
    message_box = MessageBox(user_man_win)
    message_box.place(relx=0.5, rely=0.5, anchor='center')
    message_box.update_content(user_man_win, "Collecting user data - one moment")

    # Compile user data for user in sub-menu functions
    # (done here to avoid repeated calls to DB when sub-menus are selected)
    users = retrieve_all_users()
    user_dict = build_user_dict(users)

    # Object creation
    nav_panel = tk.Frame(user_man_win, borderwidth=1, highlightbackground="black", relief='solid')
    nav_messenger = MessageBox(nav_panel, "Sub-menu navigation panel", width=25, height=2,
                               wraplength=100, justify='center')
    act_panel = tk.Frame(user_man_win, borderwidth=1, highlightbackground="black", relief='solid')
    add_user = ImagedButtonWithText(nav_panel,
                                    'C:\\Users\\rferreira\\GitHub\\11Sixteen\\UserInterface\\GlobalResources\\Images_Icons\\add_user_icon.png',
                                'LargeGroove',
                                'Add new user')
    man_user = ImagedButtonWithText(nav_panel,
                                    'C:\\Users\\rferreira\\GitHub\\11Sixteen\\UserInterface\\GlobalResources\\Images_Icons\\maintain_users_icon.png',
                                    'LargeGroove',
                                    'Maintain users')
    back_to_mm_btn = ColourSchemedButton(user_man_win, "PaleGreen", "Back to Main Menu", width=28)

    # Object binding
    add_user.btn.config(command=add_user_init)
    man_user.btn.config(command=man_users_init)
    back_to_mm_btn.config(command=on_closing)

    # Destroy message box before placement of the new panels
    message_box.destroy()

    # Object placement
    nav_panel.grid(column=0, row=0, padx=10, pady=10, sticky='NW')
    nav_messenger.grid(column=0, row=0, padx=10, pady=10, sticky='N')
    add_user.frame.grid(column=0, row=1, padx=10, pady=10, sticky='N')
    man_user.frame.grid(column=0, row=2, padx=10, pady=10, sticky='N')
    back_to_mm_btn.grid(column=0, row=1, padx=10, pady=10, sticky='NW')

    act_panel.grid(column=1, row=0, padx=10, pady=10, sticky='NW')

    user_man_win.mainloop()


if __name__ == "__main__":
    user = User()
    user_man_window(None)
