import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./components/Home";
import TaskManagement from "./components/TaskManagement";
import { useState } from "react";

function App() {
  const [taskArray, setTaskArray] = useState([]);
  function doneAddingTasks() {
    /* global chrome */

    chrome.storage.local.set({ key: taskArray }).then(() => {
      console.log(taskArray);
    });
  }

  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home taskArray={taskArray} />} />
          <Route
            path="/tasks"
            element={
              <TaskManagement
                taskArray={taskArray}
                setTaskArray={setTaskArray}
                doneAddingTasks={doneAddingTasks}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
