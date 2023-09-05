import tkinter as tk
from UserInterface.GlobalResources.GuiObjectsFactories import ImagedButtonWithText, PhotoImage
from UserInterface.MainMenu.UserManagement.UserManagementWindow import user_man_window
from UserInterface.MainMenu.ProfileManagement.ProfileManagementWindow import prof_man_window
from UserInterface.MainMenu.MonitoredLeagues.MonitoredLeagues import mon_leagues_window
from UserInterface.GlobalResources.UserObjects import User


def main_menu_window(user):

    def open_user_man(event=None):
        user_man_window(root)
        main_menu_window(user)

    def open_prof_man(event=None):
        prof_man_window(root, user)
        main_menu_window(user)

    def open_mon_leagues(event=None):
        mon_leagues_window(root)
        main_menu_window(user)


    # Window Setup
    root = tk.Tk()
    root.title("11Sixteen Database Management Controller - Main menu")
    flavicon = PhotoImage('../GlobalResources/Images_Icons/Flavicon.png')
    root.iconphoto(True, flavicon)
    root.geometry("%dx%d+0+0" % (root.winfo_screenwidth(), root.winfo_screenheight()))

    # Object setup
    user_man = ImagedButtonWithText(root, '../GlobalResources/Images_Icons/user_man_icon.png', "LargeGroove",
                                    "User Management")
    prof_man = ImagedButtonWithText(root, '../GlobalResources/Images_Icons/profile_man_icon.png', "LargeGroove",
                                    "Profile Management")
    mon_leagues = ImagedButtonWithText(root,
                                       'C:\\Users\\rferreira\\GitHub\\11Sixteen\\UserInterface\\GlobalResources\\Images_Icons\\monitor_leagues_icon.png', "LargeGroove",
                                       "Monitored Leagues")

    # Object binding
    user_man.btn.config(command=open_user_man)
    prof_man.btn.config(command=open_prof_man)
    mon_leagues.btn.config(command=open_mon_leagues)

    # Object placement
    user_man.frame.grid(row=0, column=0, padx=30, pady=30)
    prof_man.frame.grid(row=0, column=1, padx=30, pady=30)
    mon_leagues.frame.grid(row=0, column=2, padx=30, pady=30)

    root.mainloop()


if __name__ == "__main__":
    user = User()
    main_menu_window(user)
