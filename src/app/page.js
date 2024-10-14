// "use client";

// // pages/comments.js
// import { useEffect, useState } from "react";
// import {
//   getComments,
//   addComment,
//   updateComment,
//   deleteComment,
// } from "./server/api";

// const page = () => {
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(1);
//   const [newComment, setNewComment] = useState({
//     body: "",
//     postId: 1,
//     userId: 1,
//   });
//   const [editCommentId, setEditCommentId] = useState(null);

//   const fetchComments = async () => {
//     setLoading(true);
//     const data = await getComments(10, (page - 1) * 10);
//     setComments(data.comments);
//     setLoading(false);
//   };

//   const handleAddComment = async (e) => {
//     e.preventDefault();
//     const addedComment = await addComment(newComment);
//     setComments([addedComment, ...comments]);
//     setNewComment({ body: "", postId: 1, userId: 1 });
//   };

//   const handleEditComment = async (id, updatedBody) => {
//     const updatedComment = await updateComment(id, { body: updatedBody });
//     setComments(
//       comments.map((comment) => (comment.id === id ? updatedComment : comment))
//     );
//     setEditCommentId(null);
//   };

//   const handleDeleteComment = async (id) => {
//     await deleteComment(id);
//     setComments(comments.filter((comment) => comment.id !== id));
//   };

//   useEffect(() => {
//     fetchComments();
//   }, [page]);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Comments Management</h1>
//       <form onSubmit={handleAddComment} className="mb-4">
//         <input
//           type="text"
//           placeholder="Comment"
//           value={newComment.body}
//           onChange={(e) =>
//             setNewComment({ ...newComment, body: e.target.value })
//           }
//           required
//           className="border p-2 rounded mr-2"
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Add Comment
//         </button>
//       </form>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <table className="min-w-full border-collapse border border-gray-300">
//           <thead>
//             <tr>
//               <th className="border border-gray-300 p-2">ID</th>
//               <th className="border border-gray-300 p-2">Comment</th>
//               <th className="border border-gray-300 p-2">Likes</th>
//               <th className="border border-gray-300 p-2">User</th>
//               <th className="border border-gray-300 p-2">Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {comments.map((comment) => (
//               <tr key={comment.id}>
//                 <td className="border border-gray-300 p-2">{comment.id}</td>
//                 <td className="border border-gray-300 p-2">
//                   {editCommentId === comment.id ? (
//                     <input
//                       type="text"
//                       defaultValue={comment.body}
//                       onBlur={(e) =>
//                         handleEditComment(comment.id, e.target.value)
//                       }
//                       className="border p-1"
//                     />
//                   ) : (
//                     <span>{comment.body}</span>
//                   )}
//                 </td>
//                 <td className="border border-gray-300 p-2">{comment.likes}</td>
//                 <td className="border border-gray-300 p-2">
//                   {comment.user.username}
//                 </td>
//                 <td className="border border-gray-300 p-2">
//                   {editCommentId === comment.id ? (
//                     <button
//                       onClick={() => setEditCommentId(null)}
//                       className="bg-gray-500 text-white p-1 rounded"
//                     >
//                       Cancel
//                     </button>
//                   ) : (
//                     <button
//                       onClick={() => setEditCommentId(comment.id)}
//                       className="bg-yellow-500 text-white p-1 rounded"
//                     >
//                       Edit
//                     </button>
//                   )}
//                   <button
//                     onClick={() => handleDeleteComment(comment.id)}
//                     className="bg-red-500 text-white p-1 rounded ml-2"
//                   >
//                     Delete
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//       <div className="flex justify-between mt-4">
//         <button
//           onClick={() => setPage(page - 1)}
//           disabled={page === 1}
//           className="bg-blue-500 text-white p-2 rounded"
//         >
//           Previous
//         </button>
//         <button
//           onClick={() => setPage(page + 1)}
//           disabled={comments.length < 10}
//           className="bg-blue-500 text-white p-2 rounded"
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// };

// export default page;
// "use client";

// // pages/comments.js
// import { useEffect, useState } from "react";
// import {
//   getComments,
//   addComment,
//   updateComment,
//   deleteComment,
// } from "./server/api";
// import TablePagination from "@mui/material/TablePagination";

// const CommentsPage = () => {
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [totalComments, setTotalComments] = useState(0); // New state for total comments
//   const [newComment, setNewComment] = useState({
//     body: "",
//     postId: 1,
//     userId: 1,
//   });
//   const [editCommentId, setEditCommentId] = useState(null);

//   const fetchComments = async () => {
//     setLoading(true);
//     const data = await getComments(rowsPerPage, page * rowsPerPage);
//     setComments(data.comments);
//     setTotalComments(data.total); // Set total comments
//     setLoading(false);
//   };
//   const handleAddComment = async (e) => {
//     e.preventDefault();
//     const addedComment = await addComment(newComment);
//     setComments([addedComment, ...comments]);
//     setNewComment({ body: "", postId: 1, userId: 1 });
//   };

//   const handleEditComment = async (id, updatedBody) => {
//     const updatedComment = await updateComment(id, { body: updatedBody });
//     setComments(
//       comments.map((comment) => (comment.id === id ? updatedComment : comment))
//     );
//     setEditCommentId(null);
//   };

//   const handleDeleteComment = async (id) => {
//     await deleteComment(id);
//     setComments(comments.filter((comment) => comment.id !== id));
//   };

//   useEffect(() => {
//     fetchComments();
//   }, [page, rowsPerPage]);

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Comments Management</h1>
//       <form onSubmit={handleAddComment} className="mb-4">
//         <input
//           type="text"
//           placeholder="Comment"
//           value={newComment.body}
//           onChange={(e) =>
//             setNewComment({ ...newComment, body: e.target.value })
//           }
//           required
//           className="border p-2 rounded mr-2"
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Add Comment
//         </button>
//       </form>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="overflow-x-auto">
//           <table className="min-w-full border-collapse border border-gray-300">
//             <thead>
//               <tr>
//                 <th className="border border-gray-300 p-2">ID</th>
//                 <th className="border border-gray-300 p-2">Comment</th>
//                 <th className="border border-gray-300 p-2">Likes</th>
//                 <th className="border border-gray-300 p-2">User</th>
//                 <th className="border border-gray-300 p-2">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {comments.map((comment) => (
//                 <tr key={comment.id}>
//                   <td className="border border-gray-300 p-2">{comment.id}</td>
//                   <td className="border border-gray-300 p-2">
//                     {editCommentId === comment.id ? (
//                       <input
//                         type="text"
//                         defaultValue={comment.body}
//                         onBlur={(e) =>
//                           handleEditComment(comment.id, e.target.value)
//                         }
//                         className="border p-1"
//                       />
//                     ) : (
//                       <span>{comment.body}</span>
//                     )}
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     {comment.likes}
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     {comment.user.username}
//                   </td>
//                   <td className="border border-gray-300 p-2">
//                     {editCommentId === comment.id ? (
//                       <button
//                         onClick={() => setEditCommentId(null)}
//                         className="bg-gray-500 text-white p-1 rounded"
//                       >
//                         Cancel
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => setEditCommentId(comment.id)}
//                         className="bg-yellow-500 text-white p-1 rounded"
//                       >
//                         Edit
//                       </button>
//                     )}
//                     <button
//                       onClick={() => handleDeleteComment(comment.id)}
//                       className="bg-red-500 text-white p-1 rounded ml-2"
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//       <TablePagination
//         component="div"
//         count={totalComments} // Use total comments for pagination
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={(event, newPage) => setPage(newPage)}
//         onRowsPerPageChange={(event) => {
//           setRowsPerPage(parseInt(event.target.value, 10));
//           setPage(0); // Reset to the first page
//         }}
//         rowsPerPageOptions={[5, 10, 25]}
//       />
//     </div>
//   );
// };

// export default CommentsPage;

// "use client";
// import { useEffect, useState } from "react";
// import { getComments, addComment } from "./server/api";
// import TablePagination from "@mui/material/TablePagination";

// const CommentsPage = () => {
//   const [comments, setComments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [totalComments, setTotalComments] = useState(0);
//   const [newComment, setNewComment] = useState({
//     body: "",
//     likes: 0,
//     username: "",
//     postId: 1,
//     userId: 1,
//   });

//   const fetchComments = async () => {
//     setLoading(true);
//     const data = await getComments(rowsPerPage, page * rowsPerPage);
//     setComments(data.comments);
//     setTotalComments(data.total);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchComments();
//   }, [page, rowsPerPage]);

//   const handleAddComment = async (e) => {
//     e.preventDefault();
//     const addedComment = await addComment(newComment);
//     setComments([addedComment, ...comments]);
//     setTotalComments(totalComments + 1); // Increase total count
//     setNewComment({ body: "", likes: 0, username: "", postId: 1, userId: 1 }); // Reset form
//   };

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-2xl font-bold mb-4">Comments Management</h1>

//       <form onSubmit={handleAddComment} className="mb-4">
//         <input
//           type="text"
//           placeholder="Author Name"
//           value={newComment.username}
//           onChange={(e) =>
//             setNewComment({ ...newComment, username: e.target.value })
//           }
//           required
//           className="border p-2 rounded mr-2"
//         />
//         <input
//           type="text"
//           placeholder="Comment"
//           value={newComment.body}
//           onChange={(e) =>
//             setNewComment({ ...newComment, body: e.target.value })
//           }
//           required
//           className="border p-2 rounded mr-2"
//         />
//         <input
//           type="number"
//           placeholder="Likes"
//           value={newComment.likes}
//           onChange={(e) =>
//             setNewComment({ ...newComment, likes: Number(e.target.value) })
//           }
//           required
//           className="border p-2 rounded mr-2"
//         />
//         <button type="submit" className="bg-blue-500 text-white p-2 rounded">
//           Add Comment
//         </button>
//       </form>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {comments.map((comment) => (
//             <div
//               key={comment.id}
//               className="border p-4 rounded hover:shadow-lg transition"
//             >
//               <h2 className="text-lg font-bold">{comment.user.username}</h2>
//               <p className="text-gray-700">{comment.body}</p>
//               <p className="text-sm text-gray-500">Likes: {comment.likes}</p>
//               <button
//                 onClick={() => alert(`Viewing comment: ${comment.body}`)}
//                 className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
//               >
//                 View
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       <TablePagination
//         component="div"
//         count={totalComments}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={(event, newPage) => setPage(newPage)}
//         onRowsPerPageChange={(event) => {
//           setRowsPerPage(parseInt(event.target.value, 10));
//           setPage(0); // Reset to the first page
//         }}
//         rowsPerPageOptions={[5, 10, 25]}
//       />
//     </div>
//   );
// };

// export default CommentsPage;
"use client";
import { useEffect, useState } from "react";
import {
  getComments,
  getComment,
  addComment,
  updateComment,
  deleteComment,
} from "./server/api";
import TablePagination from "@mui/material/TablePagination";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

const CommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalComments, setTotalComments] = useState(0);
  const [selectedComment, setSelectedComment] = useState(null); // For Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editComment, setEditComment] = useState(true);
  const [isAscending, setIsAscending] = useState(true); // State for sorting
  const [newComment, setNewComment] = useState({
    body: "",
    likes: 0,
    username: "",
    postId: 1,
    userId: 1,
  });

  // Fetch comments for pagination
  const fetchComments = async () => {
    setLoading(true);
    const data = await getComments(rowsPerPage, page * rowsPerPage);
    setComments(data.comments);
    setTotalComments(data.total);
    setLoading(false);
  };

  useEffect(() => {
    fetchComments();
  }, [page, rowsPerPage]);

  // Handle Add Comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    const addedComment = await addComment(newComment);
    setComments([addedComment, ...comments]);
    setTotalComments(totalComments + 1); // Increase total count
    setNewComment({
      body: "",
      likes: 0,
      username: "",
      postId: 1,
      userId: 1,
    }); // Reset form
  };

  // Handle Open Modal
  const handleOpenModal = async (commentId) => {
    const comment = await getComment(commentId);
    setSelectedComment(comment);
    setModalOpen(true);
  };

  // Handle Close Modal
  const handleCloseModal = () => {
    setSelectedComment(null);
    setModalOpen(false);
  };

  // Handle Edit Comment
  const handleEditComment = async (e) => {
    e.preventDefault();
    const updatedComment = await updateComment(selectedComment.id, {
      body: selectedComment.body,
      likes: selectedComment.likes,
      user: {
        fullName: selectedComment.user.fullName,
      },
    });
    setComments(
      comments.map((comment) =>
        comment.id === updatedComment.id ? updatedComment : comment
      )
    );
    handleCloseModal();
  };

  // Handle Delete Comment
  const handleDeleteComment = async () => {
    await deleteComment(selectedComment.id);
    setComments(
      comments.filter((comment) => comment.id !== selectedComment.id)
    );
    handleCloseModal();
  };

  // Handle Sorting Toggle
  const handleSortToggle = () => {
    setIsAscending(!isAscending);
  };

  // Sort comments based on `id` and the `isAscending` state
  const sortedComments = [...comments].sort((a, b) =>
    isAscending ? a.id - b.id : b.id - a.id
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Comments Management</h1>

      {/* Form to Add a New Comment */}
      <form onSubmit={handleAddComment} className="mb-4">
        <input
          type="text"
          placeholder="Author Name"
          value={newComment.username}
          onChange={(e) =>
            setNewComment({ ...newComment, username: e.target.value })
          }
          required
          className="border p-2 rounded mr-2 mb-2 rounded "
        />
        <input
          type="text"
          placeholder="Comment"
          value={newComment.body}
          onChange={(e) =>
            setNewComment({ ...newComment, body: e.target.value })
          }
          required
          className="border p-2 rounded mr-2 mb-2 rounded "
        />
        <input
          type="number"
          placeholder="Likes"
          value={newComment.likes}
          onChange={(e) =>
            setNewComment({ ...newComment, likes: Number(e.target.value) })
          }
          required
          className="border p-2 rounded mr-2 mb-2 rounded "
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Comment
        </button>
      </form>

      {/* Button to toggle sorting */}
      <button
        onClick={handleSortToggle}
        className="bg-gray-300 text-black p-2 rounded mb-4"
      >
        Sort by ID ({isAscending ? "Ascending" : "Descending"})
      </button>

      {/* Display Comments in Grid */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sortedComments.map((comment) => (
            <div
              key={comment.id}
              className="border p-4 rounded hover:shadow-lg transition"
            >
              <h2 className="text-lg font-bold">
                {comment.user?.username || "Unknown User"}
              </h2>
              <p className="text-gray-700">{comment.body}</p>
              <p className="text-sm text-gray-500">Likes: {comment.likes}</p>
              <button
                onClick={() => handleOpenModal(comment.id)}
                className="mt-2 bg-blue-500 text-white px-3 py-1 rounded"
              >
                View
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      <TablePagination
        component="div"
        count={totalComments}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={(event, newPage) => setPage(newPage)}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(parseInt(event.target.value, 10));
          setPage(0); // Reset to the first page
        }}
        rowsPerPageOptions={[5, 10, 25]}
      />

      {/* Modal for Viewing/Editing a Comment */}
      {selectedComment && (
        <Modal open={modalOpen} onClose={handleCloseModal}>
          <Box className="modal-content bg-white p-6 rounded shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 mx-auto mt-20">
            <h2 className="text-2xl mb-4">Edit Comment</h2>

            {/* Editable Full Name */}
            <label className="block text-gray-700">Author Name</label>
            <input
              readOnly
              type="text"
              value={selectedComment.user.fullName}
              onChange={(e) =>
                setSelectedComment({
                  ...selectedComment,
                  user: {
                    ...selectedComment.user,
                    fullName: e.target.value,
                  },
                })
              }
              className="border p-2 w-full mb-3 rounded"
              placeholder="Author Full Name"
            />

            {/* Editable Likes */}
            <label className="block text-gray-700">Likes</label>
            <input
              readOnly
              type="number"
              value={selectedComment.likes}
              onChange={(e) =>
                setSelectedComment({
                  ...selectedComment,
                  likes: Number(e.target.value),
                })
              }
              className="border p-2 w-full mb-3 rounded"
              placeholder="Likes"
            />

            {/* Editable Comment */}
            <label className="block text-gray-700">Comment</label>
            <textarea
              value={selectedComment.body}
              disabled={editComment}
              onChange={(e) =>
                setSelectedComment({
                  ...selectedComment,
                  body: e.target.value,
                })
              }
              className={`border p-2 w-full mb-3 rounded ${
                editComment ? "disabled:opacity-50" : ""
              }`}
              placeholder="Edit Comment"
            />

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button
                onClick={handleEditComment}
                className="bg-green-500 text-white p-2 rounded w-1/3 mr-2"
              >
                Save Changes
              </button>

              <button
                onClick={() => setEditComment(!editComment)}
                className="bg-yellow-500 text-white p-2 rounded w-1/3 mr-2"
              >
                {editComment ? "Edit Comment" : "Cancel"}
              </button>

              <button
                onClick={handleDeleteComment}
                className="bg-red-500 text-white p-2 rounded w-1/3"
              >
                Delete Comment
              </button>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default CommentsPage;
