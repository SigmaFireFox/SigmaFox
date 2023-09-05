from random import randrange

def generate_password():
    password = ""
    for char in range(10):
        rand_num = randrange(33,126)
        password = password + chr(rand_num)
    return password
