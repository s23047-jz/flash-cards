from typing import List, Union

from fastapi import Depends, HTTPException, status

from flash_cards_api.dependencies.auth import get_current_active_user
from flash_cards_api.models.users import User


class RoleAccessChecker:
    def __init__(self, role: [Union[str, List[str]]]):
        self.role = role

    def __call__(
            self,
            user: User = Depends(get_current_active_user)
    ):
        has_role = (
            any([user.role == role for role in self.role])
            if isinstance(self.role, list)
            else user.role == self.role
        )
        if not user.is_superuser and not has_role:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="You do not have required role"
            )
        return True
