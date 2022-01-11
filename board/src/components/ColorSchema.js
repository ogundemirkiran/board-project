import React, { useState } from "react";

// color selected when adding a new card
function ColorSchema({ newCardText, setNewCardText }) {
  const [color, setColor] = useState([
    { primary: "#0d6efd" },
    { danger: "#dc3545" },
    { warning: "#ffc107" },
    { success: "#198754" },
    { info: "#0dcaf0" },
  ]);

  return (
    <div className="btn-group mt-2 justify-content-center" role="group">
      {color.map((res, index) => (
        <div key={index}>
          <input
            type="radio"
            className="btn-check "
            name="btnradio"
            id={Object.values(res)[0]}
            onChange={(e) =>
              setNewCardText({
                ...newCardText,
                newColor: e.target.id,
              })
            }
          />
          <label
            className={`ms-1 me-1 btn btn-outline-${Object.keys(res)[0]} `}
            htmlFor={Object.values(res)[0]}
          >
            +
          </label>
        </div>
      ))}
    </div>
  );
}

export default ColorSchema;
