import API from "./api";

//general data extraction
export const getData = async () => {
  return await API.get(`/main`);
};

// data extraction by id
export const getDataId = async (slug) => {
  return await API.get(`main/${slug.boardId}`);
};

//data update
export const putData = async (data) => {
  return await API.put(`main/${data.id}`, data);
};

// delete data
export const deleteData = async (id) => {
  console.log(typeof id);
  return await API.delete(`main/${id}`);
};

//  creating new data
export const postData = async (id) => {
  let data = {
    id: id,
    data: [
      [
        {
          color: "#C340A1",
          description: "Lorem Ipsum Test",
          title: "Test",
        },
      ],
      [
        {
          color: "#0d6efd",
          description: "Lorem Ipsum Test",
          title: "Test",
        },
      ],
      [
        {
          color: "#C340A1",
          description: "Lorem Ipsum Test",
          title: "Test",
        },
      ],
      [
        {
          color: "#C340A1",
          description: "Lorem Ipsum Test",
          title: "Test",
        },
      ],
    ],
  };

  return await API.post("main/", data);
};
