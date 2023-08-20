import tkinter as tk
from UserInterface.GlobalResources.GuiObjectsFactories \
    import \
    LabelEntryCombo, \
    MessageBox, \
    SortableMultiColumnListbox, \
    ColourSchemedButton
from pymongo import MongoClient
from tkinter import messagebox
from bson.objectid import ObjectId

def maintain_users(act_panel, user_dict):

    def display_selected_user(event, user_frame):

        def fill_entry_boxes():
            # Clear entry boxes
            f_name.entry.delete(0, 'end')
            l_name.entry.delete(0, 'end')
            email.entry.delete(0, 'end')

            # Populate with original data
            f_name.entry.insert(0, user_dict[user_id]['f_name'])
            l_name.entry.insert(0, user_dict[user_id]['l_name'])
            email.entry.insert(0, user_dict[user_id]['email'])

            cancel_btn.config(text="Cancel")

        def changes_made():
            if f_name.entry.get() != user_dict[user_id]['f_name']:
                return True
            if l_name.entry.get() != user_dict[user_id]['l_name']:
                return True
            if email.entry.get() != user_dict[user_id]['email']:
                return True

            return False

        def cancel_revert_process(event=None):
            if not changes_made():
                user_detail_frame.grid_forget()
                close_btn.grid(row=2, column=2, padx=10, pady=10, sticky='E')
            else:
                MsgBox = messagebox.askquestion('Revert Changes',
                                                f'Changes have been made - are you sure you want to revert?',
                                                icon='question')
                if MsgBox == 'yes':
                    fill_entry_boxes()
                    save_btn.config(state='disabled', bg='gray80')

        def record_changes():
            changes = [user_id, {}]
            if f_name.entry.get() != user_dict[user_id]['f_name']:
                user_dict[user_id]['f_name'] = f_name.entry.get()
                changes[1]['first_name'] = f_name.entry.get()
            if l_name.entry.get() != user_dict[user_id]['l_name']:
                user_dict[user_id]['l_name'] = l_name.entry.get()
                changes[1]['last_name'] = l_name.entry.get()
            if email.entry.get() != user_dict[user_id]['email']:
                user_dict[user_id]['email'] = email.entry.get()
                changes[1]['email'] = email.entry.get()

            return changes

        def save_process(event):
            user_frame_messenger = MessageBox(user_frame, "")
            user_frame_messenger.grid(row=4, column=0, columnspan=3, sticky='nsew')
            user_frame_messenger.update_content(user_frame, "Saving user changes to database - one moment")
            changes = record_changes()
            client = MongoClient('mongodb+srv://RubenFerreira:TPVXAliOZt3OqFpk@11sixteen.zzyri.mongodb.net/test?')
            db = client['football_data']
            collection = db['users']
            for key in changes[1]:
                collection.update_one({"_id": ObjectId(changes[0])},
                                      {"$set": {key: changes[1][key]}}
                                      )
            user_frame_messenger.destroy()
            messagebox.showinfo("User detail updated",
                                "The changes to the user details have been saved")
            maintain_users(act_panel, user_dict)
            cancel_revert_process(event=None)

        def key_pressed(event):
            if changes_made():
                cancel_btn.config(text="Revert")
                save_btn.config(state='normal', bg="#43E082")
            else:
                cancel_btn.config(text="Cancel")
                save_btn.config(state='disabled', bg='gray80')

        # Record data of selected user
        user = user_lst.tree.focus()
        user_data = user_lst.tree.item(user)
        user_id = user_data['values'][0]

        # Remove cancel button
        close_btn.grid_forget()

        # Create objects
        f_name = LabelEntryCombo(user_frame, "First name:")
        l_name = LabelEntryCombo(user_frame, "Last name:")
        email = LabelEntryCombo(user_frame, "Email:")
        cancel_btn = ColourSchemedButton(user_frame, "PaleGreen", "Cancel")
        save_btn = ColourSchemedButton(user_frame, "GreenBlue", "Save", state='disabled', bg='gray80')

        # Fill entry boxes
        fill_entry_boxes()

        # Bind objects
        f_name.entry.bind('<KeyRelease>', lambda e: key_pressed(e))
        l_name.entry.bind('<KeyRelease>', lambda e: key_pressed(e))
        email.entry.bind('<KeyRelease>', lambda e: key_pressed(e))
        cancel_btn.bind('<ButtonRelease>', lambda e: cancel_revert_process(e))
        save_btn.bind('<ButtonRelease>', lambda e: save_process(e))

        # Place objects
        user_detail_frame.grid(row=2, columnspan=3, padx=10, pady=10, sticky='NW')
        f_name.frame.grid(row=0, columnspan=3, pady=10, padx=10)
        l_name.frame.grid(row=1, columnspan=3, pady=10, padx=10)
        email.frame.grid(row=2, columnspan=3, pady=10, padx=10)
        cancel_btn.grid(row=3, column=1, pady=10, padx=10)
        save_btn.grid(row=3, column=2, pady=10, padx=10)

        # Configure grid
        user_detail_frame.grid_columnconfigure(0, weight=1)
        user_detail_frame.grid_columnconfigure(1, weight=0)
        user_detail_frame.grid_columnconfigure(2, weight=0)

    def convert_user_dict_to_display_list(user_dict):
        dis_list = []
        for key in user_dict:
            dis_list.append((key,
                             user_dict[key]['f_name'],
                             user_dict[key]['l_name'],
                             user_dict[key]['email']))
        return dis_list

    def cancel():
        act_panel.grid_forget()

    # Setup required data for ListBox
    col_headers = ['ID', 'First Name', 'Last Name', 'Email']
    display_list = convert_user_dict_to_display_list(user_dict)

    # Create objects
    user_title = MessageBox(act_panel, "List of users")
    user_lst = SortableMultiColumnListbox(act_panel, col_headers, display_list, min_col_width=100)
    user_detail_frame = tk.Frame(act_panel, borderwidth=1, highlightbackground="black", relief='solid')
    act_panel.config(borderwidth=1)
    close_btn = ColourSchemedButton(act_panel, "PaleGreen", "Close")

    # Bind objects (as required)
    user_lst.tree.bind('<ButtonRelease>', lambda e, r=user_detail_frame: display_selected_user(e, r))
    close_btn.config(command=lambda: cancel())

    # Place objects
    user_title.grid(row=0, columnspan=3, padx=10, pady=5, sticky='NW')
    user_lst.container.grid(row=1, columnspan=3, padx=10, pady=5, sticky='NW')
    close_btn.grid(row=2, column=2, padx=10, pady=10, sticky='E')

    # Configure grid
    act_panel.grid_columnconfigure(0, weight=1)
    act_panel.grid_columnconfigure(1, weight=0)
    act_panel.grid_columnconfigure(2, weight=0)
