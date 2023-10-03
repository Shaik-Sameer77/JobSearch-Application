import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Login from "./components/Login.jsx";
import SignUp from "./components/Signup.jsx";
import Home from "./components/Home.jsx";
import JobDetail from "./components/JobDetail.jsx";
import SuccessPage from "./components/SuccessPage.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/job-details" element={<JobDetail />} />
        <Route path="/submitted" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
