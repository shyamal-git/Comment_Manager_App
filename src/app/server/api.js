// // services/comments.js
// const API_URL = "https://dummyjson.com/comments";

// export const getComments = async (limit = 10, skip = 0) => {
//   const res = await fetch(`${API_URL}?limit=${limit}&skip=${skip}`);
//   return await res.json();
// };

// export const getComment = async (id) => {
//   const res = await fetch(`${API_URL}/${id}`);
//   return await res.json();
// };

// export const addComment = async (commentData) => {
//   const res = await fetch(`${API_URL}/add`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(commentData),
//   });
//   return await res.json();
// };

// export const updateComment = async (id, commentData) => {
//   const res = await fetch(`${API_URL}/${id}`, {
//     method: "PUT",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify(commentData),
//   });
//   return await res.json();
// };

// export const deleteComment = async (id) => {
//   const res = await fetch(`${API_URL}/${id}`, {
//     method: "DELETE",
//   });
//   return await res.json();
// };

const API_URL = "https://dummyjson.com/comments";

export const getComments = async (limit = 10, skip = 0) => {
  const res = await fetch(`${API_URL}?limit=${limit}&skip=${skip}`);
  return await res.json();
};

export const getComment = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);
  return await res.json();
};

export const addComment = async (commentData) => {
  const res = await fetch(`${API_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentData),
  });
  return await res.json();
};

export const updateComment = async (id, commentData) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(commentData),
  });
  return await res.json();
};

export const deleteComment = async (id) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });
  return await res.json();
};
