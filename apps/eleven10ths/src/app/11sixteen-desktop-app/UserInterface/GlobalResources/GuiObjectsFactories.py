import tkinter as tk
import tkinter.font as tk_font

from UserInterface.GlobalResources.GUIObjectsComponents \
    import PhotoImageComp, \
    MicroGroove, \
    LargeGroove, \
    CSButton_GreenBlue,\
    CSButton_PaleGreen, \
    MessagingLable, \
    ListBox, \
    MultiColumnListbox


# --------------------- User messaging --------------------
def MessageBox(parent, message="", **kwargs):
    return MessagingLable(parent, message, **kwargs)


# ---------------------Image handlers ----------------------
def PhotoImage(image_path):
    return PhotoImageComp(image_path)

# ------------------------ Buttons --------------------------

class ImagedButton(tk.Button):
    def __init__(self, parent, image_path, btn_type, **kw):
        super().__init__(master=parent, **kw)
        image = PhotoImageComp(image_path)
        if btn_type == "MicroGroove":
            self.btn = MicroGroove(parent, image=image)
        if btn_type == "LargeGroove":
            self.btn = LargeGroove(parent, image=image)
        self.btn.image = image

class ImagedButtonWithText(tk.Frame):
    def __init__(self, parent, image_path, btn_type, text, **kw):
        self.frame = tk.Frame(parent)

        # Set up button
        image = PhotoImageComp(image_path)
        if btn_type == "MicroGroove":
            self.btn = MicroGroove(self.frame, image=image)
        if btn_type == "LargeGroove":
            self.btn = LargeGroove(self.frame, image=image)
        self.btn.image = image
        self.btn.grid(row=0, column=0)

        # Set up text
        self.label = tk.Label(self.frame, text=text)
        self.label.grid(row=1, column=0)

def ColourSchemedButton(parent, scheme, text, **kw):
    if scheme == "GreenBlue":
        return CSButton_GreenBlue(parent, text, **kw)
    if scheme == "PaleGreen":
        return CSButton_PaleGreen(parent, text, **kw)

# ---------------------- Form Objects -------------------------

class LabelEntryCombo():
    def __init__(self, parent, label_text, label_w=15, box_w=100):
        self.frame = tk.Frame(parent)
        self.label = tk.Label(self.frame, text=label_text, width=label_w, anchor="w")
        self.label.grid(column=0, row=0)
        self.entry = tk.Entry(self.frame, width=box_w)
        self.entry.grid(column=1, row=0)

# -------------------------- List boxes -------------------------
def AppListBox(parent):
    return ListBox(parent)


class SortableMultiColumnListbox(MultiColumnListbox):
    def __init__(self, col_headers, parent, display_list, **kw):
        super().__init__(col_headers, parent, display_list, **kw)

    def build_col(self, col_headers, min_col_width):
        for col in col_headers:
            self.tree.heading(col, text=col.title(), command=lambda c=col: self.col_sort(c, 0))
            # adjust the column's width to the header string
            if tk_font.Font().measure(col.title()) > min_col_width:
                self.tree.column(col, width=tk_font.Font().measure(col.title()))

    def col_sort(self, col, descending):
        """Sorts table contents when a column header is clicked"""
        # grab values to sort
        data = [(self.tree.set(child, col), child) for child in self.tree.get_children('')]
        # if the data to be sorted is numeric change to float
        # data =  change_numeric(data)
        # now sort the data in place
        data.sort(reverse=descending)
        for ix, item in enumerate(data):
            self.tree.move(item[1], '', ix)
        # switch the heading so it will sort in the opposite direction
        self.tree.heading(col, command=lambda c=col: self.col_sort(c, int(not descending)))