from pymongo import MongoClient
from UserInterface.GlobalResources.UserObjects import User


def retrieve_all_users():
    client = MongoClient('mongodb+srv://RubenFerreira:TPVXAliOZt3OqFpk@11sixteen.zzyri.mongodb.net/test?')
    db = client['football_data']
    collection = db['users']

    return collection


def find_email_matches(collection, search_email):
    matches = collection.aggregate([
        {'$match':
             {'email': search_email}
         },
    ])

    return matches

def match_count(email_matches):
    count = 0
    for email in email_matches:
        count += 1
    return count


def validate_username_and_pw(email, password):

    def validate_password(password, matches):

        def record_user_data(user_d):
            user.ID = user_d['_id']
            user.first_name = user_d['first_name']
            user.last_name = user_d['last_name']
            user.email = user_d['email']
            user.pw = user_d['password']

        for user_doc in matches:
            if user_doc['password'] == password.content:
                record_user_data(user_doc)
                return True
        return False

    # -------- functions to remove any duplicate users (if found) ----------

    def remove_non_matching_and_duplicates(users, email_matches, password):
        remove_non_matching(users, email_matches, password)
        remove_duplicate_matching(users, email_matches, password)

    def remove_non_matching(users, email_matches, password):
        for email in email_matches:
            if email['password'] != password:
                users.delete_one({"_id": email['_id']})

    def remove_duplicate_matching(users, email_matches, password):
        match_counter = 0
        for email in email_matches:
            if email['password'] != password:
                match_counter += 1
                if match_counter > 1:
                    users.delete_one({"_id": email['_id']})

    # ----------------------------- main process of of validate login function ------------------------------
    user = User
    users = retrieve_all_users()
    email_matches = find_email_matches(users, email.content)
    if email_matches.alive:
        if validate_password(password, email_matches):
            if match_count(email_matches) > 1:
                remove_non_matching_and_duplicates(users, email_matches, password)
            return True, "Success", user
        else:
            return False, "Incorrect password", None
    else:
        return False, "User email not found", None



