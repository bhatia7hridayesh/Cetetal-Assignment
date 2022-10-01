from lib2to3.pytree import Base
from requests import Session
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


engine =create_engine('sqlite:///todolist.db')


Base = declarative_base()


SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)

