from enum import Enum


class UserRoles(str, Enum):
    ADMIN = "Admin"
    MODERATOR = "Moderator"
    USER = "User"

    @classmethod
    def get_default_roles(cls) -> str:
        return cls.USER.value

    @classmethod
    def get_roles(cls) -> list:
        return [r.value for r in cls]
