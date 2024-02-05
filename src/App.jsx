import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import AuthPage from "./pages/AuthPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
