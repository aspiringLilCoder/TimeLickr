import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ApiCalendar from "react-google-calendar-api";

import Home from "./components/Home";
import TaskManagement from "./components/TaskManagement";
import { useState } from "react";

function App() {
  const [signedIn, setSignedIn] = useState(false);

  const config = {
    clientId:
      "1009873572568-trr3tso3sogl1o18qfr4ekptpq29pjit.apps.googleusercontent.com",
    apiKey: "AIzaSyDXfdYSE0GiIzhO7i_Wu-aKkEVx9GrwbHs",
    scope: "https://www.googleapis.com/auth/calendar",
    discoveryDocs: [
      "https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest",
    ],
  };

  const apiCalendar = new ApiCalendar(config);

  function handleSignIn() {
    apiCalendar.handleAuthClick();
    setSignedIn(true);
  }

  return (
    <>
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={<Home handleSignIn={handleSignIn} signedIn={signedIn} />}
          />
          <Route path="/tasks" element={<TaskManagement />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
