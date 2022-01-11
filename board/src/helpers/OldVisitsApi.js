//send data to the page visited
export const setOldPages = (lastVisit) => {
  let localData = JSON.parse(localStorage.getItem("oldPages"));

  if (localData === null) {
    localStorage.setItem("oldPages", JSON.stringify([lastVisit]));
  } else {
    let datacopy = [...localData];
    if (datacopy.splice(-1)[0] != lastVisit) {
      localStorage.setItem(
        "oldPages",
        JSON.stringify([...localData, lastVisit])
      );
    }
  }
};

// get data from visited page
export const getOldPages = () => {
  let localData = JSON.parse(localStorage.getItem("oldPages"));
  return localData;
};
