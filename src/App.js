import "./App.css";
import React, { useState } from "react";
import Editbutton from "./edit-button.svg"
// import Deletebutton from "./delete-svgrepo-com.svg"


function App() {
  const [task, setTask] = useState("");
  const [item, setItem] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleAddTask = () => {
    if (task.trim() !== "") {
      if (editIndex !== null) {
        const updatedItems = [...item];
        updatedItems[editIndex] = { text: task, timestamp: new Date() };
        updatedItems[editIndex] = task;
        setItem(updatedItems);
        setEditIndex(null);
        setTask("");
      } else {
        const newTask = { text: task, timestamp: new Date() };
        setItem([...item, task]);
        setTask("");
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleAddTask();
    }
  };

  const handleDeleteTask = (index) => {
    const updatedItems = [...item];
    updatedItems.splice(index, 1);
    setItem(updatedItems);
    setEditIndex(null);
  };

  const handleDeleteAll = () => {
    setShowModal(true);
  };
  const handleConfirmDeleteAll = () => {
    setItem([]);
    setShowModal(false);
  };
  const handleCancelDeleteAll = () => {
    setShowModal(false);
  };
  
  const handleEditTask = (index) => {
    setEditIndex(index);
    setTask(item[index]);
  };

  return (
    <>
      <header className="App-container">
        <h1 className="App-header">To Do App</h1>
        <h3 className="App-para">List your day-to-day task here</h3>
      </header>
      <h3 className="totalTasks">Total tasks: {item.length}</h3>
      <div className="input-div">
        <input
          onChange={handleTaskChange}
          onKeyPress={handleKeyPress}
          value={task}
          type="text"
          placeholder="Enter your task..."
          className="to-do-input"
        />
        <button onClick={handleAddTask} className="add">
        {editIndex !== null ? "Save" : "Add"}
        </button>

        <button className="reset" onClick={handleDeleteAll}
        style={{ display: editIndex !== null ? 'none' : 'block' }}>
        Delete all
      </button>
      {showModal && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <p>Are you sure you want to delete all of the tasks?</p>
            <button onClick={handleConfirmDeleteAll}>Yes</button>
            <button onClick={handleCancelDeleteAll}>No</button>
          </div>
        </div>
      )}

      </div>
      {item.length > 0 && <h3 className="all-tasks-heading">To-Do tasks:</h3>}
      <div className="list-style">
        <ul>
          {item.map((i, index) => {
            const slNo = index + 1;
            return (
              <li className="listing-task" key={index}>
                <div className="task-content">
                  <span className="sl-no">{slNo}. </span>
                  {editIndex === index ? (
                    <div className="editable-task">
                      <span>{task}</span>
                      
                    </div>
                  ) : (   <span>{i}</span>
                  )}

                </div>
                <div className="buttons-flex">
                <span
                  onClick={() => handleEditTask(index)}
                >
                   <img className="edit-button" src={Editbutton} alt="Edit" />
                </span>
                <span
                  onClick={() => handleDeleteTask(index)}
                  className="delete-button"
                > <span role="img" aria-label="Delete" className="emoji">
                🗑
                {/* <img className="edit-button" src={Deletebutton} alt="Delete" /> */}
              </span>
                </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;

