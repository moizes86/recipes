import re


def required(value):
    return 'Required' if value is None else True


def email(value):
    required(value)
    if not re.match("^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$", value):
        return False
    return True


def username(value):
    if len(value) < 5:
        return 'Username too short'
    if len(value) > 25:
        return 'Username too long'
    if not re.match("^[A-Za-z0-9_-]*$", value):
        return 'Username must consist of only letters and numbers'
    return True


def password(value):
    required(value)
    if len(value) < 6:
        return "Password length must be at least six chars"
    if not re.match("^(?=.*[0-9])(?=.*[a-zA-Z]).{6,}$", value):
        return "Invalid password. Must contain numbers and letters"
    return True


def confirmPassword(value, password):
    if not required(value):
        return 'Confirm password is required'

    if value != password:
        return 'Password do not match'

    return True


validations = {
    'required': required,
    'email': email,
    'username': username,
    'password': password,
    'confirmPassword': confirmPassword
}
