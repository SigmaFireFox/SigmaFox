class RawData:

    def __init__(self, raw_data, data_description):
        self.content = raw_data
        self.title = data_description

    def write_to_txt(self):
        file = open(f"{self.title}", "w+")
        file.write(self.content)
        file.close()



