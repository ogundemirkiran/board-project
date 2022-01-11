import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { setOldPages } from "../helpers/OldVisitsApi";
import Board from "../components/Board";
import OldVisit from "../components/OldVisit";

function BoardIdPage() {
  let location = useLocation();
  let pageId = location.pathname;

  useEffect(() => {
    setOldPages(pageId);
  }, [pageId]);

  return (
    <div>
      <OldVisit />
      <Board />
    </div>
  );
}

export default BoardIdPage;
