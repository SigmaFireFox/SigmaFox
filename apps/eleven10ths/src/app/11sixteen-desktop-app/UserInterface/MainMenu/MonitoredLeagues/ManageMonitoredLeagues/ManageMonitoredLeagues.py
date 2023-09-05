import tkinter as tk
from tkinter import messagebox
from pymongo import MongoClient
from UserInterface.GlobalResources.GuiObjectsFactories import \
    MessageBox, \
    SortableMultiColumnListbox, \
    ColourSchemedButton
from bson.objectid import ObjectId
from time import sleep


def manage_monitored_leagues(parent, leagues_list):

    def refine_league_data(lea_list):
        """
        Refine league-list data as received to populate list boxes
        """

        def refined_league_list(leagues):
            refined_list = []
            for league in leagues:
                refined_list.append([
                    str(league['_id']),
                    league['league_info']['country'],
                    league['league_info']['name'],
                    league['monitored']
                ])

            return refined_list

        def split_leagues(all_leagues):
            monitored = []
            non_monitored = []
            for league in all_leagues:
                if league[3]:
                    monitored.append(league[0:3])
                else:
                    non_monitored.append(league[0:3])

            return monitored, non_monitored

        all_leagues_refined_data = refined_league_list(lea_list)
        monitored_leagues_list, non_monitored_leagues_list = split_leagues(all_leagues_refined_data)

        return monitored_leagues_list, non_monitored_leagues_list


    # ---------- Functions required to maintain the state of the activities panel the switch button -------

    def clear_selctions(event, list_box):
        if len(list_box.selection()) > 0:
            list_box.selection_remove(list_box.selection()[0])

    def items_to_be_added():
        if len(non_monitored_leagues_listbox.tree.selection()) > 0:
            return True

    def items_to_be_removed():
        if len(monitored_leagues_listbox.tree.selection()) > 0:
            return True

    def listbox_item_selected(event=None):

        if not items_to_be_added() and not items_to_be_removed():  # No items selected
            switch_btn.config(text="Select leagues to switch from lists", state='disabled', bg="gray80")
        elif items_to_be_added() and items_to_be_removed():  # Items in both boxes selected
            switch_btn.config(text="Switch selected leagues between monitoring lists ", state='normal', bg="#FFFF00")
        else:  # Items in only one list selected
            if items_to_be_added():
                switch_btn.config(text="Add to monitored leagues list", state='normal', bg="#43E082")
            if items_to_be_removed():
                switch_btn.config(text="Remove from monitored leagues list", state='normal', bg="#FF0000")

    # ----------------------- Functions required to test if changes have been made ------------------------

    def list_current_displayed_leagues(list_box):

        current_leagues_listed = []
        for tree_id in list_box.tree.get_children():
            current_league = []
            for value in list_box.tree.item(tree_id)['values']:
                current_league.append(value)
            current_leagues_listed.append(current_league)

        return current_leagues_listed

    def current_equals_original(current_dis_leagues, org_list):

        if len(current_dis_leagues) != len(org_list):
            return False
        else:
            org_list.sort()
            current_dis_leagues.sort()
            for x in range(len(org_list)):
                if set(current_dis_leagues[x]) != set(org_list[x]):
                    return False

        return True

    def changes_made():

        pairs_to_compare = [
            [monitored_leagues_listbox, org_monitored_leagues_list],
            [non_monitored_leagues_listbox, org_non_monitored_leagues_list]
        ]

        for pair in pairs_to_compare:
            current_displayed_leagues = list_current_displayed_leagues(pair[0])
            if not current_equals_original(current_displayed_leagues, pair[1]):
                return True

        return False

    # ----------------------------- Functions required to move leagues between listbox ---------------------

    def move_leagues():

        def list_items_to_be_added():

            items_to_add = []
            if items_to_be_added():
                list_code_add_items = non_monitored_leagues_listbox.tree.selection()
                for code in list_code_add_items:
                    current_item = [code]
                    for value in non_monitored_leagues_listbox.tree.item(code)['values']:
                        current_item.append(value)
                    items_to_add.append(current_item)

            return items_to_add

        def list_items_to_be_removed():

            items_to_remove = []
            if items_to_be_removed():
                list_code_removed_items = monitored_leagues_listbox.tree.selection()
                for code in list_code_removed_items:
                    current_item = [code]
                    for value in monitored_leagues_listbox.tree.item(code)['values']:
                        current_item.append(value)
                    items_to_remove.append(current_item)

            return items_to_remove

        def add_items_to_monitored_league(items_to_add):

            for item in items_to_add:
                non_monitored_leagues_listbox.tree.delete(item[0])
                monitored_leagues_listbox.tree.insert('', 'end', values=(item[1], item[2], item[3]))

        def remove_items_from_monitored_league(items_to_remove):

            for item in items_to_remove:
                monitored_leagues_listbox.tree.delete(item[0])
                non_monitored_leagues_listbox.tree.insert('', 'end', values=(item[1], item[2], item[3]))

        items_to_add_list = list_items_to_be_added()
        items_to_remove_list = list_items_to_be_removed()
        if len(items_to_add_list) > 0:
            add_items_to_monitored_league(items_to_add_list)
        if len(items_to_remove_list) > 0:
            remove_items_from_monitored_league(items_to_remove_list)

        if changes_made():
            save_btn.config(state='normal', bg='#43E082')
            cancel_btn.config(text="Revert")
        else:
            save_btn.config(state='disabled', bg='gray80')
            cancel_btn.config(text="Cancel")

        switch_btn.config(text="Select leagues to switch from lists", state='disabled', bg="gray80")

    # ------------------------------ Save and Cancel processes ---------------------------

    def cancel_revert_process():

        if not changes_made():
            parent.destroy()
        else:
            MsgBox = messagebox.askquestion('Revert Changes',
                                            f'Changes have been made - are you sure you want to revert?',
                                            icon='question')
            if MsgBox == 'yes':
                manage_monitored_leagues(parent, leagues_list)

    def save_process():

        def get_mon_league_list():
            league_ids = []
            for item in monitored_leagues_listbox.tree.get_children():
                league_ids.append(monitored_leagues_listbox.tree.item(item)['values'][0])
            return league_ids

        def get_non_mon_league_list():
            league_ids = []
            for item in non_monitored_leagues_listbox.tree.get_children():
                league_ids.append(non_monitored_leagues_listbox.tree.item(item)['values'][0])
            return league_ids

        def list_of_changes(mon_list, non_mon_list):
            change_list = []
            org_mon_ids = []
            org_non_mon_ids = []

            for league in org_monitored_leagues_list:
                org_mon_ids.append(league[0])
            for league in org_non_monitored_leagues_list:
                org_non_mon_ids.append(league[0])

            for league in mon_list:
                if league not in org_mon_ids:
                    change_list.append((league, True))
            for league in non_mon_list:
                if league not in org_non_mon_ids:
                    change_list.append((league, False))

            return change_list

        def write_changes_to_db(change_list):

            act_msg_box = MessageBox(parent, "")
            act_msg_box.grid(row=3, column=0, pady=10, padx=10, sticky='w')
            act_msg_box.update_content(act_msg_box, "Changes being saved - one moment")
            client = MongoClient('mongodb+srv://RubenFerreira:TPVXAliOZt3OqFpk@11sixteen.zzyri.mongodb.net/test?')
            db = client['football_data']
            collection = db['leagues']
            for league in change_list:
                collection.update_one({"_id": ObjectId(league[0])},
                                      {"$set": {'monitored': league[1]}}
                                      )
            act_msg_box.update_content(parent, "Changes saved")
            sleep(2)
            act_msg_box.destroy()

        def override_org_lists():

            for league in leagues_list:
                league['monitored'] = False

            mon_lea_id_list = []
            for item in monitored_leagues_listbox.tree.get_children():
                mon_lea_id_list.append(ObjectId(monitored_leagues_listbox.tree.item(item)['values'][0]))

            for league in leagues_list:
                if league['_id'] in mon_lea_id_list:
                    league['monitored'] = True

        mon_leagues = get_mon_league_list()
        non_mon_leagues = get_non_mon_league_list()
        changes = list_of_changes(mon_leagues, non_mon_leagues)
        write_changes_to_db(changes)
        override_org_lists()
        manage_monitored_leagues(parent, leagues_list)

    # ------------------------------------ Main processes -----------------------------------------------------

    # Data handling
    col_headers = ['ID', 'Country', 'League Name']
    org_monitored_leagues_list, org_non_monitored_leagues_list = refine_league_data(leagues_list)

    # Object creation
    tbl1_frame = tk.Frame(parent, borderwidth=1, highlightbackground="black", relief='solid')
    tbl1_header = MessageBox(tbl1_frame, "Monitored Leagues", anchor='center')
    monitored_leagues_listbox = SortableMultiColumnListbox(tbl1_frame, col_headers, org_monitored_leagues_list,
                                                           min_col_width=150)
    tbl2_frame = tk.Frame(parent, borderwidth=1, highlightbackground="black", relief='solid')
    tbl2_header = MessageBox(tbl2_frame, "Non-Monitored Leagues", anchor='center')
    non_monitored_leagues_listbox = SortableMultiColumnListbox(tbl2_frame, col_headers,
                                                               org_non_monitored_leagues_list,
                                                               min_col_width=170)
    switch_btn = ColourSchemedButton(parent, "GreenBlue", "Select leagues to switch from lists",
                                     state='disabled', bg='gray80', width=104, anchor='center')
    cancel_btn = ColourSchemedButton(parent, "PaleGreen", "Cancel")
    save_btn = ColourSchemedButton(parent, "GreenBlue", "Save", state='disabled', bg='gray80')

    # Bind objects
    monitored_leagues_listbox.tree.bind('<ButtonRelease>', lambda e: listbox_item_selected(e))
    non_monitored_leagues_listbox.tree.bind('<ButtonRelease>', lambda e: listbox_item_selected(e))
    monitored_leagues_listbox.tree.bind('<FocusOut>',
                                        lambda e, l=monitored_leagues_listbox.tree: clear_selctions(e, l))
    non_monitored_leagues_listbox.tree.bind('<FocusOut>',
                                            lambda e, l=non_monitored_leagues_listbox.tree: clear_selctions(e, l))
    switch_btn.config(command=move_leagues)
    cancel_btn.config(command=cancel_revert_process)
    save_btn.config(command=save_process)

    # TODO Require filters for the list boxes

    # Object placement
    tbl1_frame.grid(row=0, columnspan=3, padx=10, pady=5)
    tbl1_header.grid(row=0, columnspan=3, padx=10, pady=5)
    monitored_leagues_listbox.container.grid(row=1, columnspan=3, padx=10, pady=5, sticky='NW')

    switch_btn.grid(row=1, column=0, columnspan=3, padx=10, pady=5, sticky='NW')

    tbl2_frame.grid(row=2, columnspan=3, padx=10, pady=5)
    tbl2_header.grid(row=0, columnspan=3, padx=10, pady=5)
    non_monitored_leagues_listbox.container.grid(row=1, columnspan=3, padx=10, pady=5, sticky='NW')

    cancel_btn.grid(row=3, column=1, pady=10, padx=10)
    save_btn.grid(row=3, column=2, pady=10, padx=10)

    # Configure grid
    parent.grid_columnconfigure(0, weight=1)
    parent.grid_columnconfigure(1, weight=0)
    parent.grid_columnconfigure(2, weight=0)

    # Configure tables
    monitored_leagues_listbox.tree.column("ID", width=170)
    monitored_leagues_listbox.tree.column("Country", width=170)
    monitored_leagues_listbox.tree.column("League Name", width=350)
    non_monitored_leagues_listbox.tree.column("ID", width=170)
    non_monitored_leagues_listbox.tree.column("Country", width=170)
    non_monitored_leagues_listbox.tree.column("League Name", width=350)
