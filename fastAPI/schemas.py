from pydantic import BaseModel

class Task(BaseModel):
    task:str
    completed: bool

class UpdateTask(BaseModel):
    completed: bool