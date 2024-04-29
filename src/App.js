import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Home from "./components/Home";
import TaskManagement from "./components/TaskManagement";
import { useEffect, useState } from "react";

function App() {
  const [taskArray, setTaskArray] = useState([]);
  const [justOpened, setJustOpened] = useState(false);

  useEffect(() => {
    chrome.storage.local.get(["key"]).then((result) => {
      if (result.key && result.key.length > 0) {
        setTaskArray(result.key);
        setJustOpened(true);
      }
    });
  }, []);

  function doneAddingTasks() {
    /* global chrome */
    chrome.storage.local.set({ key: taskArray }).then(() => {});

    checkTask();
    setInterval(checkTask, 5000);
  }

  useEffect(() => {
    if (taskArray.length > 0) {
      if (justOpened) checkTask();
      setTimeout(checkTask, 5000);
    }
  }, [taskArray]);

  const [taskState, setTaskState] = useState();
  const [taskName, setTaskName] = useState();
  const [taskTime, setTaskTime] = useState();

  function checkTask() {
    const filteredTaskArray = taskArray.filter((obj) => {
      console.log(new Date().getTime(), new Date(obj.endTime).getTime());

      return new Date().getTime() < new Date(obj.endTime).getTime();
    });
    console.log("filtered:", filteredTaskArray);

    chrome.storage.local.set({
      key: filteredTaskArray,
    });

    let taskFound = false;

    filteredTaskArray.forEach((task) => {
      if (
        new Date().getTime() >= new Date(task.startTime).getTime() &&
        new Date().getTime() <= new Date(task.endTime).getTime()
      ) {
        setTaskState("Current task:");
        setTaskName(task.name);
        setTaskTime(
          `(${new Date(task.startTime).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })} to ${new Date(task.endTime).toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
          })})`
        );

        taskFound = true;
        return;
      }
    });

    if (taskFound) return;

    if (filteredTaskArray.length !== 0) {
      const firstTask = filteredTaskArray[0];
      setTaskState("Next task:");
      setTaskName(firstTask.name);
      setTaskTime(
        `(${new Date(firstTask.startTime).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })} to ${new Date(firstTask.endTime).toLocaleTimeString([], {
          hour: "numeric",
          minute: "2-digit",
        })})`
      );
    }
  }

  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Home
                taskArray={taskArray}
                taskState={taskState}
                taskTime={taskTime}
                taskName={taskName}
              />
            }
          />
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
