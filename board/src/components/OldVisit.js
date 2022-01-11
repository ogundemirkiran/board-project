import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getOldPages } from "../helpers/OldVisitsApi";

function OldVisit() {
  // let host = window.location.host;
  // let slug = useParams();

  const [oldVisit, setOldVisit] = useState([]);

  //last visited 5 pages
  useEffect(async () => {
    let itemData = [];
    await getOldPages().map((res) => {
      let itemSplit = res.split("");
      let itemSplice = itemSplit.splice(0, 6);
      let itemJoin = itemSplit.join("");

      itemData.push(itemJoin);
    });

    let last5 = itemData.splice(-5);

    setOldVisit(last5);
  }, []);

  return (
    <div>
      <h5 className="text-start ms-3 mb-3">Last Pages</h5>
      <div
        className=" container d-flex justify-content-start ms-0"
        style={{ maxWidth: 400 }}
      >
        {oldVisit.map((res, index) => (
          <Link
            key={index}
            to={`/main/${res}`}
            type="button"
            className="list-group-item list-group-item-action"
            onClick={(e) =>
              window.location.assign(
                `http://localhost:3000/main/${e.target.innerText}`
              )
            }
          >
            {res}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default OldVisit;
