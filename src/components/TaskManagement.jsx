import React, { useState } from "react";
import "../styles/TaskManagement.css";
import { Link } from "react-router-dom";

function TaskManagement(props) {
  const [showModal, setShowModal] = useState(false);
  const [taskContainerEmpty, setTaskContainerEmpty] = useState(true);
  const [whitelistWebsites, setWhitelistWebsites] = useState("");

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
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
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

        {!taskContainerEmpty && (
          <>
            <div className="taskContainer"></div>

            <button className="doneBtn">
              Done and Sync with Google calendar
            </button>
          </>
        )}
      </main>

      {showModal && (
        <form id="modal">
          <div id="modal-content">
            <div id="modal-header">
              <span id="close" onClick={() => setShowModal(false)}>
                &times;
              </span>
              <p>Task Details</p>
            </div>

            <div className="input-container">
              <p className="label">Task Name:</p>
              <input type="text" id="name" name="name" required />
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
                    <input type="text" name="website-input" />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      className="website-add-btn"
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
                <ul></ul>
              </div>
            )}

            <div className="input-container">
              <p className="label">Time:</p>
              <div id="time-input-container">
                <input type="time" name="start-time" required />
                <p>to</p>
                <input type="time" name="end-time" required />
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
