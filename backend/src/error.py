"""
error.py - SENG2021 Invoice Validation Apple Pie
    Description:
        Errors for functions
"""

from werkzeug.exceptions import HTTPException


class AccessError(HTTPException):
    """Error that indicates an Access Error"""

    code = 403
    message = "No message specified"


class InputError(HTTPException):
    """Error that indicates an Input Error"""

    code = 400
    message = "No message specified"
