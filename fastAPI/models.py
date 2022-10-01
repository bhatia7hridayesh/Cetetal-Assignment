from email.policy import default
from sqlalchemy import Column, Integer, String, Boolean
from database import Base

class List(Base):
    __tablename__ = 'List'
    id = Column(Integer, primary_key= True)
    task = Column(String(256))
    completed = Column(Boolean(), default= False)


