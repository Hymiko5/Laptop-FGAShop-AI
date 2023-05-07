from pydantic import BaseModel
from typing import *

class Response():
    is_success: bool
    type: str
    msg: str = ''
    res: None
    def __init__(self, is_success, type, msg = '', res = None):
        self.is_success = is_success
        self.type = type
        self.msg = msg
        self.res = res