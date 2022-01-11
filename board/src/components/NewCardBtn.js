import React from "react";

//button to click while adding new card
function NewCardBtn({ ind, newCardText, setNewCardText }) {
  return (
    <button
      id={ind}
      type="button"
      className="btn btn-outline-light rounded-circle"
      onClick={(e) => {
        setNewCardText({ ...newCardText, id: e.target.id });
      }}
    >
      <span
        id={ind}
        className="fs-4 text lh-1"
        onClick={(e) => {
          setNewCardText({
            ...newCardText,
            id: e.target.id,
          });
        }}
      >
        +
      </span>
    </button>
  );
}

export default NewCardBtn;
