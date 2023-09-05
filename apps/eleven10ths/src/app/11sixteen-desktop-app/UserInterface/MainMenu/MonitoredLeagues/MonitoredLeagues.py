import tkinter as tk
from tkinter import messagebox
from pymongo import MongoClient
from UserInterface.GlobalResources.GuiObjectsFactories import \
    MessageBox, \
    ImagedButtonWithText
from UserInterface.MainMenu.MonitoredLeagues.ManageMonitoredLeagues.ManageMonitoredLeagues import \
    manage_monitored_leagues
from UserInterface.MainMenu.MonitoredLeagues.AddLeague.AddLeague import add_new_league


def mon_leagues_window(parent):

    # ------------------------------ Data handling functions ------------------------------------------

    def call_league_data():
        """
        Compile league data required for sub-menus
        """

        def retrieve_all_leagues():
            client = MongoClient('mongodb+srv://RubenFerreira:TPVXAliOZt3OqFpk@11sixteen.zzyri.mongodb.net/test?')
            db = client['football_data']
            collection = db['leagues']

            return collection

        def collection_to_list(collection):
            leagues_lst = []
            for document in collection.find():
                leagues_lst.append(document)

            return leagues_lst

        # --------- main DB call processes ------------

        collection = retrieve_all_leagues()
        all_leagues_list = collection_to_list(collection)

        return all_leagues_list

    # ---------------------- Window sub-menu initialisation functions --------------------------

    def manage_mon_lea():
        # Clear activities panel
        for child in act_panel.winfo_children():
            child.destroy()
        # Send activities panel to function to populated
        manage_monitored_leagues(act_panel, leagues_list)
        act_panel.grid(column=1, row=0, padx=10, pady=10, sticky='NW')


    def add_new_lea():
        # Clear activities panel
        for child in act_panel.winfo_children():
            child.destroy()
        # Send activities panel to function to populated
        add_new_league(act_panel, leagues_list)
        act_panel.grid(column=1, row=0, padx=10, pady=10, sticky='NW')

    # ---------------------------------------- Window management --------------------------------

    def on_closing():

        MsgBox = messagebox.askquestion('Exit Window',
                                        f'Are you sure you want to close this window - Any unsaved changes will be '
                                        f'lost?',
                                        icon='question')
        if MsgBox == 'yes':
            mon_league_win.destroy()

    # ------------------------------------ Main processes -----------------------------------------------------
    if parent is not None:
        parent.destroy()

    # Window Setup
    mon_league_win = tk.Tk()
    mon_league_win.title("11Sixteen Database Management Controller - Manage Monitored Leagues")
    mon_league_win.geometry("%dx%d+0+0" % (mon_league_win.winfo_screenwidth(), mon_league_win.winfo_screenheight()))
    mon_league_win.protocol("WM_DELETE_WINDOW", on_closing)

    # ----------------- DB call -------------------------
    # Message user of delay (while gathering data from DB)
    message_box = MessageBox(mon_league_win)
    message_box.place(relx=0.5, rely=0.5, anchor='center')
    message_box.update_content(mon_league_win, "Collecting monitored league data - one moment")
    leagues_list = call_league_data()
    message_box.destroy()

    # Object creation
    nav_panel = tk.Frame(mon_league_win, borderwidth=1, highlightbackground="black", relief='solid')
    nav_messenger = MessageBox(nav_panel, "Sub-menu navigation panel", width=25, height=4,
                               wraplength=100, justify='center')
    act_panel = tk.Frame(mon_league_win, borderwidth=1, highlightbackground="black", relief='solid')
    man_mon_lea_btn = ImagedButtonWithText(nav_panel,
                                           'C:\\Users\\rferreira\\GitHub\\11Sixteen\\UserInterface\\GlobalResources\\Images_Icons\\manage_monitored_leagues_icon.png',
                                           "LargeGroove", "Manage Monitored Leagues")
    add_lea_btn = ImagedButtonWithText(nav_panel,
                                           'C:\\Users\\rferreira\\GitHub\\11Sixteen\\UserInterface\\GlobalResources\\Images_Icons\\add_league.png',
                                           "LargeGroove", "Add New League")
    # Object binding
    man_mon_lea_btn.btn.config(command=manage_mon_lea)
    add_lea_btn.btn.config(command=add_new_lea)

    # Object placement
    nav_panel.grid(column=0, row=0, padx=10, pady=10, sticky='NW')
    nav_messenger.grid(column=0, row=0, padx=10, pady=10, sticky='N')
    act_panel.grid(column=1, row=0, padx=10, pady=10, sticky='NW')
    man_mon_lea_btn.frame.grid(column=0, row=1, padx=10, pady=10, sticky='N')
    add_lea_btn.frame.grid(column=0, row=2, padx=10, pady=10, sticky='N')

    # Main window mainloop
    mon_league_win.mainloop()


if __name__ == "__main__":
    mon_leagues_window(None)
