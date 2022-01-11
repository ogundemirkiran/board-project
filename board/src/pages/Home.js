import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="text-center mt-5">
      <Link to="/main">Kanban Board List</Link>
    </div>
  );
}

export default Home;
