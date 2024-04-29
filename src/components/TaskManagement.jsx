import React, { useRef, useState } from "react";
import "../styles/TaskManagement.css";
import { Link } from "react-router-dom";

function TaskManagement({ taskArray, setTaskArray }) {
  const [showModal, setShowModal] = useState(false);
  const [whitelistWebsites, setWhitelistWebsites] = useState("");
  const [websiteList, setWebsiteList] = useState([]);

  const nameRef = useRef(null);
  const allowOrBlockRef = useRef(null);
  const websiteRef = useRef(null);
  const startTimeRef = useRef(null);
  const endTimeRef = useRef(null);

  const urlPattern =
    /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,}(\/\S*)?$/;

  function addWebsite(e) {
    e.preventDefault();

    const website = websiteRef.current.value;

    if (!urlPattern.test(website)) {
      websiteRef.current.classList.add("invalid");
    } else {
      websiteRef.current.classList.remove("invalid");
      if (website) {
        setWebsiteList((websiteList) => [...websiteList, website]);
        websiteRef.current.value = "";
      }
    }
  }

  function taskSubmit(e) {
    e.preventDefault();
    setWhitelistWebsites("");
    setShowModal(false);

    const name = nameRef.current.value;
    const allowOrBlock = allowOrBlockRef.current.value;
    const startTime = startTimeRef.current.value;
    const endTime = endTimeRef.current.value;

    const startDate = new Date();
    const [startHours, startMinutes] = startTime.split(":").map(Number);
    startDate.setHours(startHours);
    startDate.setMinutes(startMinutes);

    const endDate = new Date();
    const [endHours, endMinutes] = endTime.split(":").map(Number);
    endDate.setHours(endHours);
    endDate.setMinutes(endMinutes);

    setTaskArray((taskArray) => {
      let newArray = [
        ...taskArray,
        {
          name: name,
          allowOrBlock: allowOrBlock,
          startTime: startDate,
          endTime: endDate,
          websiteList: websiteList,
        },
      ];

      newArray.sort((a, b) => a.startTime - b.startTime);

      return newArray;
    });
  }

  return (
    <div>
      <header>
        <Link to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </Link>

        <p>Timeblock your day</p>
      </header>
      <main>
        <button
          className="addTaskBtn"
          onClick={() => {
            setShowModal(true);
          }}
        >
          + Add a Task
        </button>

        {taskArray.length !== 0 && (
          <>
            <div className="taskContainer">
              {taskArray.map((task, index) => (
                <div key={index} className="task">
                  <p>
                    {task.startTime.toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}{" "}
                    to{" "}
                    {task.endTime.toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                  </p>
                  <p>{task.name}</p>
                </div>
              ))}
            </div>

            <button className="doneBtn">Done</button>
          </>
        )}
      </main>

      {showModal && (
        <form id="modal" onSubmit={taskSubmit}>
          <div id="modal-content">
            <div id="modal-header">
              <span id="close" onClick={() => setShowModal(false)}>
                &times;
              </span>
              <p>Task Details</p>
            </div>

            <div className="input-container">
              <p className="label">Task Name:</p>
              <input type="text" id="name" name="name" required ref={nameRef} />
            </div>

            <div className="input-container">
              <p className="label">
                Are you going to whitelist or block websites?
              </p>
              <select
                name="allowOrBlock"
                required
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "allow") {
                    setWhitelistWebsites(true);
                  } else if (value === "block") {
                    setWhitelistWebsites(false);
                  }
                }}
                ref={allowOrBlockRef}
              >
                <option value="">Select...</option>
                <option value="allow">Whitelist</option>
                <option value="block">Block</option>
              </select>
            </div>

            {whitelistWebsites !== "" && (
              <div id="website-list-container">
                <div className="input-container">
                  <p className="label">
                    {whitelistWebsites ? "Whitelist" : "Blocklist"} websites
                  </p>
                  <div className="website-input-container">
                    <input type="text" name="website-input" ref={websiteRef} />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="website-add-btn"
                      onClick={addWebsite}
                    >
                      <rect
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                      ></rect>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                      <line x1="8" y1="12" x2="16" y2="12"></line>
                    </svg>
                  </div>
                </div>
                <ul>
                  {websiteList.map((website, index) => (
                    <li key={index}>{website}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="input-container">
              <p className="label">Time:</p>
              <div id="time-input-container">
                <input
                  type="time"
                  name="start-time"
                  required
                  ref={startTimeRef}
                />
                <p>to</p>
                <input type="time" name="end-time" required ref={endTimeRef} />
              </div>
            </div>

            <button id="save-task-button" type="submit">
              Save Task
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default TaskManagement;
