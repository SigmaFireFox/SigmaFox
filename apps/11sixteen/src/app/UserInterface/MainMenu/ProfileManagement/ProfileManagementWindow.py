import tkinter as tk
from pymongo import MongoClient
from UserInterface.GlobalResources.GuiObjectsFactories import MessageBox, LabelEntryCombo, ColourSchemedButton
from bson.objectid import ObjectId
from tkinter import messagebox
from UserInterface.GlobalResources.UserObjects import User
from copy import copy


def prof_man_window(parent, user_data):

    # ------------------------------------ Main processes -----------------------------------------------------
    def display_user_details():

        def changes_made():

            if f_name.entry.get() != user_data.first_name:
                return True
            if l_name.entry.get() != user_data.last_name:
                return True
            if email.entry.get() != user_data.email:
                return True
            if pw.entry.get() != user_data.pw:
                return True

            return False

        def fill_entry_boxes():
            pass
            # Clear entry boxes
            f_name.entry.delete(0, 'end')
            l_name.entry.delete(0, 'end')
            email.entry.delete(0, 'end')
            pw.entry.delete(0, 'end')

            # Populate with original data
            f_name.entry.insert(0, user_data.first_name)
            l_name.entry.insert(0, user_data.last_name)
            email.entry.insert(0, user_data.email)
            pw.entry.insert(0, user_data.pw)

        def record_changes():
            changes = [user_data.ID, {}]
            if f_name.entry.get() != user_data.first_name:
                user_data.first_name = f_name.entry.get()
                changes[1]['first_name'] = f_name.entry.get()
            if l_name.entry.get() != user_data.last_name:
                user_data.last_name = l_name.entry.get()
                changes[1]['last_name'] = l_name.entry.get()
            if email.entry.get() != user_data.email:
                user_data.email = email.entry.get()
                changes[1]['email'] = email.entry.get()
            if pw.entry.get() != user_data.pw:
                user_data.pw = pw.entry.get()
                changes[1]['password'] = pw.entry.get()

            return changes

        # ---------------------- functions required by display user details function -------------------------
        def cancel_revert_process():
            if not changes_made():
                user_man_win.destroy()
            else:
                MsgBox = messagebox.askquestion('Revert Changes',
                                                f'Changes have been made - are you sure you want to revert?',
                                                icon='question')
                if MsgBox == 'yes':
                    fill_entry_boxes()
                    save_btn.config(state='disabled', bg='gray80')
                    cancel_btn.config(text="Cancel")

        def save_process():
            act_panel_messenger = MessageBox(act_panel, "")
            act_panel_messenger.grid(row=5, column=0, columnspan=3, sticky='nsew')
            act_panel_messenger.update_content(act_panel, "Saving changes to database - one moment")
            changes = record_changes()
            client = MongoClient('mongodb+srv://RubenFerreira:TPVXAliOZt3OqFpk@11sixteen.zzyri.mongodb.net/test?')
            db = client['football_data']
            collection = db['users']
            for key in changes[1]:
                collection.update_one({"_id": ObjectId(changes[0])},
                                      {"$set": {key: changes[1][key]}}
                                      )
            act_panel_messenger.destroy()
            messagebox.showinfo("User detail updated",
                                "The changes to your profile have been saved")
            display_user_details()

        def key_pressed(event):
            if changes_made():
                cancel_btn.config(text="Revert", state='normal', bg="#E6FFEA")
                save_btn.config(state='normal', bg="#43E082")
            else:
                cancel_btn.config(text="Cancel", state='disabled', bg='gray80')
                save_btn.config(state='disabled', bg='gray80')

        # ---------------- display user detail main processes -----------------
        # Create objects
        f_name = LabelEntryCombo(act_panel, "First name:")
        l_name = LabelEntryCombo(act_panel, "Last name:")
        email = LabelEntryCombo(act_panel, "Email:")
        pw = LabelEntryCombo(act_panel, "Password")
        cancel_btn = ColourSchemedButton(act_panel, "PaleGreen", "Cancel")
        save_btn = ColourSchemedButton(act_panel, "GreenBlue", "Save", state='disabled', bg='gray80')

        # Bind objects
        f_name.entry.bind('<KeyRelease>', lambda e: key_pressed(e))
        l_name.entry.bind('<KeyRelease>', lambda e: key_pressed(e))
        email.entry.bind('<KeyRelease>', lambda e: key_pressed(e))
        pw.entry.bind('<KeyRelease>', lambda e: key_pressed(e))
        cancel_btn.config(command=cancel_revert_process)
        save_btn.config(command=save_process)

        # Place objects
        f_name.frame.grid(row=0, columnspan=3, pady=10, padx=10)
        l_name.frame.grid(row=1, columnspan=3, pady=10, padx=10)
        email.frame.grid(row=2, columnspan=3, pady=10, padx=10)
        pw.frame.grid(row=3, columnspan=3, pady=10, padx=10)
        cancel_btn.grid(row=4, column=1, pady=10, padx=10)
        save_btn.grid(row=4, column=2, pady=10, padx=10)

        # Configure grid
        act_panel.grid_columnconfigure(0, weight=1)
        act_panel.grid_columnconfigure(1, weight=0)
        act_panel.grid_columnconfigure(2, weight=0)

        # Fill entry boxes
        fill_entry_boxes()

    def on_closing():
        if vars(user_data) == vars(original_user):
            MsgBox = messagebox.askquestion('Close without saving',
                                            f'Changes have been made - are you sure you want to close this window?',
                                            icon='question')
            if MsgBox == 'yes':
                user_man_win.destroy()
        else:
            user_man_win.destroy()

    # -------------------------------- Main process of function -------------------------------------------------
    if parent is not None:
        parent.destroy()

    # Copy user data for check on close
    original_user = copy(user_data)

    # Window Setup
    user_man_win = tk.Tk()
    user_man_win.title("11Sixteen Database Management Controller - Profile Management")
    user_man_win.geometry("%dx%d+0+0" % (user_man_win.winfo_screenwidth(), user_man_win.winfo_screenheight()))

    # Object creation
    nav_panel = tk.Frame(user_man_win, borderwidth=1, highlightbackground="black", relief='solid')
    nav_messenger = MessageBox(nav_panel, "No sub-menus available for this screen ", width=25, height=4,
                               wraplength=100, justify='center')
    act_panel = tk.Frame(user_man_win, borderwidth=1, highlightbackground="black", relief='solid')

    # Object placement
    nav_panel.grid(column=0, row=0, padx=10, pady=10, sticky='NW')
    act_panel.grid(column=1, row=0, padx=10, pady=10, sticky='NW')
    nav_messenger.grid(column=0, row=0, padx=10, pady=10, sticky='NW')

    display_user_details()

    user_man_win.protocol("WM_DELETE_WINDOW", on_closing)
    user_man_win.mainloop()


if __name__ == "__main__":
    user = User()
    prof_man_window(None, user)
