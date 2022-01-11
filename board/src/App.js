import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Main from "./pages/Main";
import BoardIdPage from "./pages/BoardIdPage";

import "./App.css";

function App() {
  return (
    <div className="App" style={{ maxWidth: "100rem", overflow: "overlay" }}>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="main" element={<Main />} />
        <Route path="main/:boardId" element={<BoardIdPage />} />
      </Routes>
    </div>
  );
}

export default App;
