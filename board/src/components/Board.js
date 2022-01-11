import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { getDataId, putData } from "../api/index";
import { useParams } from "react-router-dom";
import Card from "./Card";
import NewCardForm from "./NewCardForm";
import NewCardBtn from "./NewCardBtn";

//  data  generator
const getItems = (count, offset = 0, data) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    data: data ? data[k] : {},

    content: k + offset,
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 8;

const getItemStyle = (isDragging, draggableStyle, bgColor) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  // change background colour if dragging
  background: isDragging ? "lightgreen" : bgColor,

  // styles we need to apply on draggables
  ...draggableStyle,
});

// style of cards
const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250,
});

//main function
function Board() {
  let slug = useParams();

  const [state, setState] = useState([]);
  const [newCardText, setNewCardText] = useState({
    newTitle: "",
    newDescription: "",
    newColor: "",
    id: null,
  });

  // data before page load
  useEffect(async () => {
    await getDataId(slug)
      .then((res) => {
        const data = res.data.data;
        setState(
          data.map((item, index) =>
            getItems(item.length, index * 100 + 100, item)
          )
        );
      })
      .catch((err) => console.log(err));
  }, []);

  // converts data to json type and updates it
  useEffect(() => {
    let lastData = state.map((res) => {
      let newData1 = res.map((item) => {
        let color = item.data.color;
        let description = item.data.description;
        let title = item.data.title;

        return { color, description, title };
      });

      return newData1;
    });

    let lastDataItem = {
      id: slug.boardId,
      data: lastData,
    };

    if (!!lastDataItem?.data?.length) {
      putData(lastDataItem)
        .then((res) => {})
        .catch((err) => console.log(err));
    }
  }, [state, newCardText.id]);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter((group) => group.length));
    }
  }

  const mainTitle = ["Backlog", "To do", "In Progress", "Designed"];

  return (
    <>
      <div className="text-start ms-3 mt-3">
        <button
          type="button"
          className="btn btn-secondary "
          onClick={() => {
            setState([...state, []]);
          }}
        >
          Add new group
        </button>
      </div>
      <div
        className="container-fluid "
        //style={{ margin: 0, padding: 0, width: "min-content" }}
        style={{ margin: 0, padding: 0 }}
      >
        <DragDropContext onDragEnd={onDragEnd}>
          <ul className="row list-group d-flex flex-row  justify-content-center m-auto mt-3 dragDropBoard">
            {/* <ul className="  list-group d-flex flex-row  justify-content-center ms-3 m-auto mt-3 dragDropBoard"> */}
            <>
              {state.map((el, ind) => (
                <Droppable key={ind} droppableId={`${ind}`}>
                  {(provided, snapshot) => (
                    <li
                      className=" col-12  col-md-6  col-lg-3 list-group-item  text-white ms-1   mt-3 mb-5 p-4 "
                      // className="  list-group-item  text-white ms-1   mt-3 mb-5 p-4 "
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      style={
                        (getListStyle(snapshot.isDraggingOver),
                        {
                          width: "23rem",
                          backgroundColor: "#262626",
                          borderRadius: "16px",
                          height: "fit-content",
                        })
                      }
                    >
                      <div className="d-flex justify-content-between">
                        <h2>{mainTitle[ind]}</h2>
                        <NewCardBtn
                          ind={ind}
                          newCardText={newCardText}
                          setNewCardText={setNewCardText}
                        />
                      </div>
                      <Card
                        el={el}
                        getItemStyle={getItemStyle}
                        setState={setState}
                        ind={ind}
                        state={state}
                      />

                      <NewCardForm
                        ind={ind}
                        state={state}
                        newCardText={newCardText}
                        setNewCardText={setNewCardText}
                      />

                      {provided.placeholder}
                    </li>
                  )}
                </Droppable>
              ))}
            </>
          </ul>
        </DragDropContext>
      </div>
    </>
  );
}

export default Board;
