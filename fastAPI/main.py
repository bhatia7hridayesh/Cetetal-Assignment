from fastapi import FastAPI, Depends
from requests import session
from fastapi.middleware.cors import CORSMiddleware
import schemas
import models
from database import Base, engine, SessionLocal
from sqlalchemy.orm import Session

Base.metadata.create_all(engine)

def get_Session():
    session = SessionLocal()
    try:
        yield session
    
    finally:
        session.close()


app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:3000",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#creating a DB type object to simulate a Database.
exampleDB = {
    1:{'task': 'complete cetetal django assignmnet'},
    2:{'task': 'create frontend for django assignmnet'},
    3:{'task': 'learn fastAPI'},
    4:{'task': 'create a fastAPI mini project'}
}


@app.get("/")
def getTask(session: Session = Depends(get_Session)):
    tasks = session.query(models.List).all()
    return tasks


"""
we can  use the Body class of fastAPI to get post requests or we can create schemas to specify what 
we need in the put request.
"""
@app.post("/")
def addTask(task:schemas.Task, session: Session = Depends(get_Session)):
    todo = models.List(task = task.task, completed = task.completed)
    session.add(todo)
    session.commit()
    session.refresh(todo)
    return todo


@app.get('/{id}')
def getTask(id:int, session: Session = Depends(get_Session)):
    todo = session.query(models.List).get(id)
    return todo


@app.put("/{id}")
def updateTask(id:int, task:schemas.UpdateTask, session: Session = Depends(get_Session)):
    todo = session.query(models.List).get(id)
    todo.completed = task.completed
    session.commit()
    return todo

@app.delete("/{id}")
def deleteTask(id:int, session: Session = Depends(get_Session)):
    todo = session.query(models.List).get(id)
    session.delete(todo)
    session.commit()
    session.close()
    return "Deleted Successfully"