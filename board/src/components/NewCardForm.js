import React from "react";
import ColorSchema from "./ColorSchema";

//form to fill in when adding a new card
function NewCardForm({ ind, state, newCardText, setNewCardText }) {
  const saveNewCard = (e, index) => {
    e.preventDefault();

    let Arrlength = state[index].length;
    let allData = {
      content: Number(`${index}0${Arrlength - 1}`),
      id: `item-${index}0${Arrlength - 1}-${new Date().getTime()}`,
      data: {
        color: newCardText.newColor,
        description: newCardText.newDescription,
        title: newCardText.newTitle,
      },
    };

    state[index].push(allData);

    setNewCardText({
      newTitle: "",
      newDescription: "",
      id: null,
    });
  };

  return (
    <>
      {newCardText.id == ind && (
        <form
          className="card mt-3 p-4 form-group"
          style={{
            borderRadius: "8px",
            backgroundColor: "#F5F5F1",
          }}
        >
          <input
            value={newCardText.newTitle}
            type="text"
            className="form-control form-control-sm fw-bolder"
            onChange={(e) =>
              setNewCardText({
                ...newCardText,
                newTitle: e.target.value,
              })
            }
          ></input>

          <textarea
            value={newCardText.newDescription}
            className="form-control mt-2 lh-sm opacity-75 fs-6 text"
            onChange={(e) =>
              setNewCardText({
                ...newCardText,
                newDescription: e.target.value,
              })
            }
          ></textarea>

          <ColorSchema
            newCardText={newCardText}
            setNewCardText={setNewCardText}
          />

          <div className="text-end">
            <button
              id={ind}
              type="submit"
              className="mt-2  btn btn-sm btn-success rounded-3"
              onClick={(e) => saveNewCard(e, e.target.id)}
              disabled={
                newCardText.newTitle === "" ||
                newCardText.newColor === "" ||
                (newCardText.newDescription === "" && true)
              }
            >
              Save
            </button>
            <button
              id={ind}
              type="button"
              className="mt-2 ms-2 me-1 btn btn-sm btn-danger rounded-3"
              onClick={() =>
                setNewCardText({
                  ...newCardText,
                  id: null,
                  newTitle: "",
                  newDescription: "",
                  newColor: "",
                })
              }
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </>
  );
}

export default NewCardForm;
