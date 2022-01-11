import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { deleteData, getData, postData } from "../api/index";

function Main() {
  const [mainData, setMainData] = useState([]);

  // Get data for id list and update state
  useEffect(() => {
    getData()
      .then((res) => {
        const data = res.data;

        setMainData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  // add new board
  const addBoard = () => {
    let newId = mainData[mainData.length - 1].id + 100;
    postData(newId)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    window.location.reload();
  };

  const deleteBoard = (item) => {
    console.log(item);
    deleteData(item)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));

    window.location.reload();
  };

  return (
    <>
      <div className=" container mt-5">
        <h1 className="mb-3 text-center"> Kanban Board List </h1>
        <button
          type="button"
          className="btn btn-primary mb-3"
          onClick={() => addBoard()}
        >
          Add New Board
        </button>
        {mainData === [] && <div> Loading... </div>}
        <ul className="list-group">
          {mainData !== [] &&
            mainData.map((res, index) => (
              <li
                key={index}
                className="list-group-item d-flex justify-content-between"
              >
                <Link to={`${res.id}`}>{res.id}</Link>
                <button
                  id={res.id}
                  type="button"
                  className="btn btn-sm btn-outline-danger "
                  onClick={(e) => deleteBoard(e.target.id)}
                >
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </div>
    </>
  );
}

export default Main;
