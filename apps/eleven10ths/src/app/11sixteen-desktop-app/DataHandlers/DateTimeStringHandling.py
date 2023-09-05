# A small function to take a DateTime string and separates it into a Date and Time to be stored as a Data and Time type

from datetime import datetime


def sting_to_datetime(date_time_sting):
    converted_date_time = datetime.strptime(date_time_sting, "%Y-%m-%dT%H:%M:%S%z")
    return converted_date_time


def datetime_splitter(date_time):
    converted_date = datetime(date_time.year, date_time.month, date_time.day).date()
    converted_time = date_time.strftime('%H:%M')
    return converted_date, converted_time
    return converted_date, converted_time
