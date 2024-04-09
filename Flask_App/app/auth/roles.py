"""Defines the role enum for User."""
from enum import Enum, unique


@unique
class UserRole(Enum):
    STUDENT = "Student"
    INSTRUCTOR = "Instructor"
    ADMIN = "Admin"
