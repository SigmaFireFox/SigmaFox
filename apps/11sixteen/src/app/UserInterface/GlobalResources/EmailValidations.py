def email_valid(email):
    def min_required_char_present():
        # Minimum characters required in email - if not test auto fails
        if "@" not in email:
            return False
        if "." not in email:
            return False
        return True

    def char_in_appropriate_positions():

        # "@" and "." cant be first or last character
        def first_last_char_valid():
            first_char = email[0]
            last_char = email[len(email) - 1]
            if first_char in [".", "@"] or last_char in [".", "@"]:
                return False
            else:
                return True

        def one_point_after_at():

            def only_one_at():
                # Can contain only one "@"
                if email.count("@") == 1:
                    return True
                else:
                    return False

            # Must have one "." after
            if only_one_at():
                if email.rfind(".") > email.index("@"):
                    return True
                else:
                    return False
            else:
                return False

        if first_last_char_valid() and one_point_after_at():
            return True
        else:
            return False

    if min_required_char_present() and char_in_appropriate_positions():
        return True
    else:
        return False