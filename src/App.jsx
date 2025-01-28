import { useState } from "react";
import "./App.css";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter, Input } from "@material-tailwind/react";

let id = 0;

function App() {
  const [inputVal, setInputVal] = useState("");
  const [tasks, setTasks] = useState([]);
  const [open, setOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const handleOpen = () => {
    setOpen(!open);
    if (open) {
      setInputVal(""); 
      setTaskToEdit(null); 
    }
  };


  const deleteTask = (taskObj) => {
    setTasks(tasks.filter((task) => task.id !== taskObj.id));
  };

  const editTask = (taskObj) => {
    setInputVal(taskObj.title);
    setTaskToEdit(taskObj);
    setOpen(true);
  };

  const saveEditedTask = () => {
    if (!taskToEdit) return;
    setTasks(
      tasks.map((task) =>
        task.id === taskToEdit.id ? { ...task, title: inputVal } : task
      )
    );
    setOpen(false);
    setInputVal("");
  };

  return (
    <div className="container">
      <h1>T O D O</h1>
      <div className="input-container">
        <input
          type="text"
          className="task-input"
          placeholder="Currently typing"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
        />
        <button
          onClick={() => {
            if (inputVal.trim()) {
              setTasks([...tasks, { id: id++, title: inputVal }]);
              setInputVal("");
            }
          }}
          className="add-btn"
        >
          Add
        </button>
      </div>
      <div className="main">
        <ul className="task-list">
          {tasks.map((task) => (
            <li key={task.id} className="task-item">
              <span>{task.title}</span>
              <div className="btn-group">
                <button onClick={() => editTask(task)} className="edit-btn">Edit</button>
                <button onClick={() => deleteTask(task)} className="delete-btn">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer-options">
        <span>5 items left</span>
        <span className="color">All</span>
        <span>Active</span>
        <span>Completed</span>
        <span className="clear">Clear Completed</span>
      </div>
      <footer className="footer">
        <p>Drag and drop to reorder list</p>
      </footer>

      
        <Dialog open={open} handler={handleOpen}>
          <DialogHeader>Edit Task</DialogHeader>
          <DialogBody>
            <Input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Edit task title"
            />
          </DialogBody>
          <DialogFooter>
            <Button variant="text" color="red" onClick={handleOpen}>
              Cancel
            </Button>
            <Button variant="gradient" color="green" onClick={saveEditedTask}>
              Edit
            </Button>
          </DialogFooter>
        </Dialog>
      
    </div>
  );
}

export default App;
