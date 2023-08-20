import tkinter as tk
import tkinter.ttk as ttk
import tkinter.font as tk_font
from PIL import Image, ImageTk


# ---------------------Image handlers ----------------------
class PhotoImageComp(ImageTk.PhotoImage):
    def __init__(self, image_path):
        image = Image.open(image_path)
        super().__init__(image)

# --------------------- Buttons ---------------------------
class MicroGroove(tk.Button):
    def __init__(self, parent, **kw):
        super().__init__(master=parent, width=30, height=20, relief="groove", **kw)

class LargeGroove(tk.Button):
    def __init__(self, parent, **kw):
        super().__init__(master=parent, width=130, height=130, relief="groove", **kw)

# ------------------------ Labels --------------------------
class ImagedLabel(tk.Label):
    def __init__(self, parent, image_path, **kw):
        super().__init__(master=parent, **kw)
        image = PhotoImageComp(image_path)
        self.label = tk.Label(image=image)
        self.label.image = image


class MessagingLable(tk.Label):

    def __init__(self, parent, message, **kw):
        super().__init__(parent, **kw)
        self.update_content(parent, message)

    def update_content(self, parent, message):
        self.config(text=message)
        tk.Tk.update(parent)


# ------------------------ Buttons --------------------------
class ImagedButton(tk.Button):
    def __init__(self, parent, image_path, **kw):
        image = PhotoImageComp(image_path)
        super().__init__(master=parent, **kw)
        self.btn = tk.Button(width=30, height=20, relief="groove", image=image)
        self.btn.image = image

class CSButton_GreenBlue(tk.Button):
    def __init__(self, parent, text, bg="#43E082", width=12, **kw):
        super().__init__(parent, text=text, bg=bg, activebackground="#43E0DC", width=width, **kw)

class CSButton_PaleGreen(tk.Button):
    def __init__(self, parent, text, bg='#E6FFEA', width=12, **kw):
        super().__init__(parent, text=text, bg=bg, activebackground="#E6FFFF", width=width, **kw)
''
# ------------------------ Entry boxes --------------------------
class StandardEntryBoxWithDefaultText(tk.Entry):

    def __init__(self, parent, default_text, **kw):
        super().__init__(**kw)
        # --- initial attributes ---
        self.box = tk.Entry(parent, bg='white', fg='grey', width=30, justify="center")
        self.default_text = default_text
        self.box.insert(0, default_text)
        self.content = default_text
        self.contains_value = False
        # --- initial methods ---
        self.bindings()

    def bindings(self):
        self.box.bind('<FocusIn>', lambda event: self.clear_box_if_default_text(event))
        self.box.bind('<FocusOut>', lambda event: self.focus_out_process(event))
        self.box.bind('<KeyPress>', lambda event: self.key_pressed(event))

    def key_pressed(self, event):
        self.box.config(fg='black')
        self.save_content()

    def save_content(self):
        self.content = self.box.get()

    def focus_out_process(self, event):
        if event.widget.get() == "":
            self.insert_default_text(event)
        else:
            self.save_content()

    def insert_default_text(self, event):
        if event.widget.get() == "":
            event.widget.insert(0, self.default_text)
            event.widget.config(show="", fg='grey')


    def clear_box_if_default_text(self, event):
        if self.default_text == event.widget.get():
            event.widget.delete(0, 'end')


class PasswordEntryBoxWithDefaultText(StandardEntryBoxWithDefaultText):

    def key_pressed(self, event):
        self.box.config(fg='black', show="*")
        self.content = event.widget.get()

    def reveal_content(self, event):
        self.box.config(show="")

    def hide_content(self, event):
        if self.content != self.default_text:
            self.box.config(show="*")


class ListBox(tk.Listbox):
    def __init__(self, parent, **kw):
        super().__init__(master=parent, width=100, height=5, relief="groove", **kw)


class MultiColumnListbox(object):
    """use a ttk.TreeView as a multicolumn ListBox"""

    def __init__(self, parent, col_headers, display_list, min_col_width):
        self.container = None
        self.tree = None
        self._setup_widgets(parent, col_headers)
        self._build_tree(col_headers, display_list, min_col_width)

    def _setup_widgets(self, parent, col_headers):
        # Container (needed to group the Treeview and the scroll bars)
        self.container = tk.Frame(parent)

        # Treeview with dual scrollbars
        self.tree = ttk.Treeview(columns=col_headers, show="headings")
        vsb = ttk.Scrollbar(orient="vertical", command=self.tree.yview)
        hsb = ttk.Scrollbar(orient="horizontal", command=self.tree.xview)
        self.tree.configure(yscrollcommand=vsb.set, xscrollcommand=hsb.set)
        self.tree.grid(column=0, row=0, sticky='nsew', in_=self.container)
        vsb.grid(column=1, row=0, sticky='ns', in_=self.container)
        hsb.grid(column=0, row=1, sticky='ew', in_=self.container)

    def _build_tree(self, col_headers, display_list, min_col_width):
        self.build_col(col_headers, min_col_width)
        self.build_list(display_list, col_headers)

    def build_col(self, col_headers, min_col_width):
        for col in col_headers:
            self.tree.heading(col, text=col.title())
            # adjust the column's width to the header string )if greater then the min_col_width
            for column in self.tree.column:
                if tk_font.Font().measure(col.title()) > min_col_width:
                    self.tree.column(column, width=tk_font.Font().measure(col.title()))

    def build_list(self, display_list, col_headers):
        for item in display_list:
            self.tree.insert('', 'end', values=item)
            # adjust column's width if necessary to fit each value
            for ix, val in enumerate(item):
                col_w = tk_font.Font().measure(val)
                if self.tree.column(col_headers[ix], width=None) < col_w:
                    self.tree.column(col_headers[ix], width=col_w)
