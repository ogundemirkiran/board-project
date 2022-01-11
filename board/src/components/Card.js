import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";

// one card in the list
function Card({ el, getItemStyle, state, setState, ind }) {
  return (
    <>
      {el.map((item, index) => (
        <Draggable key={item.id} draggableId={item.id} index={index}>
          {(provided, snapshot) => (
            <div
              className="card mt-3 p-4"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              style={
                ({ backgroundColor: item.data.color, borderRadius: "8px" },
                getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style,
                  item.data.color
                ))
              }
            >
              <div className="text-end">
                <button
                  className="btn-close text-end btn-sm  shadow-none"
                  type="button"
                  onClick={() => {
                    const newState = [...state];
                    newState[ind].splice(index, 1);
                    setState(newState.filter((group) => group.length));
                  }}
                ></button>
              </div>
              <p className="fs-6 text fw-bolder"> {item.data.title} </p>
              <p className="mt-2 lh-sm opacity-75">
                <small> {item.data.description}</small>
              </p>
            </div>
          )}
        </Draggable>
      ))}
    </>
  );
}

export default Card;
