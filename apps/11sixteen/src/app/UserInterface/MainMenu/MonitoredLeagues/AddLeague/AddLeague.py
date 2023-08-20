import tkinter as tk
from tkinter import messagebox, StringVar
from UserInterface.GlobalResources.GuiObjectsFactories import \
    LabelEntryCombo, ColourSchemedButton, MessageBox, SortableMultiColumnListbox
from time import sleep
from pymongo import MongoClient


def add_new_league(act_panel, leagues_list):

    # ------------------------------- Data handling ---------------------------------------------
    def get_country_list(lea_list):
        country_list = []
        for league in lea_list:
            if league['league_info']['country'] not in country_list:
                country_list.append(league['league_info']['country'])

        country_list.sort()
        country_list.insert(0, "-Select-")

        return country_list

    # ------------------------------------- Form callbacks --------------------------------------------

    def country_picked(*args):

        # ------------------ Functions required to initialise the league by country table ------------
        def clear_lea_display():
            for child in league_display_frame.winfo_children():
                child.destroy()

        def filter_leagues_by_country(country):

            lea_list_by_country = []
            for league in leagues_list:
                if league['league_info']['country'] == country:
                    lea_list_by_country.append([league['_id'], league['league_info']['name']])

            return lea_list_by_country

        def display_leagues_by_country(lea_by_country):

            def add_league():

                def key_pressed(event):
                    if lea_name.entry.get() != "":
                        save_btn.config(state='normal', bg="#43E082")
                    else:
                        save_btn.config(state='disabled', bg='gray80')

                def cancel():

                    if lea_name.entry.get() == "":
                        new_lea_frame.grid_forget()
                        cancel_display_btn.grid(row=2, column=1, padx=10, pady=10, sticky='E')
                        add_lea_btn.grid(row=2, column=2, padx=10, pady=10, sticky='E')

                    else:
                        MsgBox = messagebox.askquestion('Cancel adding new league',
                                                        'Would you like to cancel the entry of this new league  - if yes, the '
                                                        'current information entered will be lost',
                                                        icon='question')
                        if MsgBox == 'yes':
                            new_lea_frame.grid_forget()
                            cancel_display_btn.grid(row=2, column=1, padx=10, pady=10, sticky='E')
                            add_lea_btn.grid(row=2, column=2, padx=10, pady=10, sticky='E')

                def save_process():

                    def permission_to_save():
                        MsgBox = messagebox.askquestion('Save new user',
                                                        'Are you sure you would like to add this league to the League Database?',
                                                        icon='question')
                        if MsgBox == 'yes':
                            return True
                        else:
                            return False

                    def retrieve_all_leagues():
                        client = MongoClient(
                            'mongodb+srv://RubenFerreira:TPVXAliOZt3OqFpk@11sixteen.zzyri.mongodb.net/test?')
                        db = client['football_data']
                        collection = db['leagues']

                        return collection

                    def write_new_league_to_db(new_lea, collection):
                        response = collection.insert_one({
                            'league_info': new_lea
                        })

                        return response.inserted_id

                    # ---------------- callback process --------------------
                    if lea_name.entry.get() != "":
                        new_league = {'country': country_selection.get(), 'name': lea_name.entry.get()}
                        if permission_to_save():
                            message_box.update_content(act_panel, "Saving new league - one moment")
                            league_collection = retrieve_all_leagues()
                            new_id = write_new_league_to_db(new_league, league_collection)
                            country_leagues_listbox.tree.insert('', 'end', values=(new_id, lea_name.entry.get()))
                            message_box.update_content(act_panel, "Save Complete")
                            sleep(2)
                            message_box.update_content(act_panel, f"Please enter the name of new league you want to "
                                                                  f"add in {country_selection.get()}")
                            lea_name.entry.delete(0, 'end')

                    else:
                        messagebox.showinfo("All data not complete",
                                            "Please ensure all field are complete before trying to save")

                # --------------------------- Add league processes --------------------------------

                # Object removes
                cancel_display_btn.grid_forget()
                add_lea_btn.grid_forget()

                # Object creations
                new_lea_frame = tk.Frame(league_display_frame)
                lea_name = LabelEntryCombo(new_lea_frame, "League name:", box_w=80)
                save_btn = ColourSchemedButton(new_lea_frame, "GreenBlue", "Save", state='disabled', bg='gray80')
                cancel_btn = ColourSchemedButton(new_lea_frame, "PaleGreen", "Cancel")
                message_box = MessageBox(new_lea_frame, f"Please enter the name of new league you want to add "
                                                        f"in {country_selection.get()} ")

                # Object binding
                lea_name.entry.bind('<KeyRelease>', lambda e: key_pressed(e))
                cancel_btn.config(command=cancel)
                save_btn.config(command=save_process)

                # Object placement
                new_lea_frame.grid(row=2, column=0, columnspan=3, padx=10, pady=10)
                lea_name.frame.grid(row=0, columnspan=3, padx=10, pady=10, sticky='NW')
                message_box.grid(row=1, column=0, padx=10, pady=10, sticky='W')
                cancel_btn.grid(row=1, column=1, padx=10, pady=10, sticky='E')
                save_btn.grid(row=1, column=2, padx=10, pady=10, sticky='E')

            def cancel_display():
                league_display_frame.grid_forget()

            # --------------------- display league by country process ---------------------------

            # Table data handling
            col_headers = ['ID', 'League Name']

            # Object creations
            tbl1_header = MessageBox(league_display_frame, f"List of leagues in {country_selection.get()}", anchor='center')
            country_leagues_listbox = SortableMultiColumnListbox(league_display_frame, col_headers, lea_by_country,
                                                                   min_col_width=150)
            cancel_display_btn = ColourSchemedButton(league_display_frame, "PaleGreen", "Cancel")
            add_lea_btn = ColourSchemedButton(league_display_frame, "GreenBlue", "Add")

            # Object binding
            cancel_display_btn.config(command=cancel_display)
            add_lea_btn.config(command=add_league)

            # Object placements
            league_display_frame.grid(row=1, column=0, columnspan=3, padx=10, pady=10)
            tbl1_header.grid(row=0, columnspan=3, padx=10, pady=5)
            country_leagues_listbox.container.grid(row=1, columnspan=3, padx=10, pady=5)
            cancel_display_btn.grid(row=2, column=1, padx=10, pady=10, sticky='E')
            add_lea_btn.grid(row=2, column=2, padx=10, pady=10, sticky='E')

            # Configure table
            country_leagues_listbox.tree.column("ID", width=170)
            country_leagues_listbox.tree.column("League Name", width=250)

            # Configure grid
            league_display_frame.grid_columnconfigure(0, weight=1)
            league_display_frame.grid_columnconfigure(1, weight=0)
            league_display_frame.grid_columnconfigure(2, weight=0)

        # ----------------------- country picked process -----------------------------

        clear_lea_display()
        leagues_by_country = filter_leagues_by_country(country_selection.get())
        display_leagues_by_country(leagues_by_country)

    # ---------------------------------- Main process -----------------------------------------

    # Data handling
    countries_options = get_country_list(leagues_list)

    # Create objects
    country_label = tk.Label(act_panel, text="Select country")
    country_selection = StringVar(act_panel)
    country_selection.set(countries_options[0])
    country_options = tk.OptionMenu(act_panel, country_selection, *countries_options)
    league_display_frame = tk.Frame(act_panel, borderwidth=1, highlightbackground="black", relief='solid')

    # Bind objects (as required)
    country_selection.trace("w", country_picked)

    # Place objects
    country_label.grid(row=0, column=0, padx=10, pady=10, sticky='NW')
    country_options.grid(row=0, column=1, columnspan=2, padx=10, pady=10, sticky='NW')

    # Configure grid
    act_panel.grid_columnconfigure(0, weight=1, minsize=420)
    act_panel.grid_columnconfigure(1, weight=0)
    act_panel.grid_columnconfigure(2, weight=0)
