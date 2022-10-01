import './App.css';
import Todolist from './Todolist';
import TodoDetail from './TodoDetail';
import AddTask from './AddTask';
import {BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element=<Todolist /> />
          <Route path='details/:id' element = <TodoDetail /> />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
