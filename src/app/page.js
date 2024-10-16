"use client";
import { useEffect, useRef, useState } from "react";
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
import CustomToast, {
  showSuccessToast,
  showErrorToast,
  showInfoToast,
  showWarningToast,
} from "./Components/CustomToast";
import Loader from "./Components/Loader";

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
  const fetchComments = async (signal) => {
    setLoading(true);
    try {
      const data = await getComments(rowsPerPage, page * rowsPerPage);
      if (!signal.aborted) {
        setComments(data.comments);
        setTotalComments(data.total);
        showSuccessToast("Comments loaded successfully!");
      }
    } catch (error) {
      showErrorToast("Failed to load comments."); // Show error toast
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchComments(controller.signal);

    // Clean up the effect to prevent duplicate API calls
    return () => {
      controller.abort(); // Abort any ongoing requests
    };
  }, [page, rowsPerPage]);

  // Handle Add Comment
  const handleAddComment = async (e) => {
    e.preventDefault();
    try {
      console.log("NewComment = ", newComment);
      const addedComment = await addComment(newComment);
      setComments([...comments, addedComment]);
      setTotalComments(totalComments + 1); // Increase total count
      showSuccessToast("Comment added successfully!"); // Show success toast
      setNewComment({
        body: "",
        likes: 0,
        username: "",
        postId: 0,
        userId: 0,
      }); // Reset form
    } catch (error) {
      showErrorToast("Failed to add comment."); // Show error toast
    }
  };
  // Handle Add Comment
  // const handleAddComment = async (e) => {
  //   e.preventDefault();

  //   // Generate a random 4-digit postId
  //   const randomPostId = Math.floor(1000 + Math.random() * 9000);

  //   try {
  //     const updatedComment = {
  //       ...newComment,
  //       postId: randomPostId, // Set the generated random postId
  //     };

  //     console.log("NewComment = ", updatedComment);

  //     // Send the updated comment to the server
  //     const addedComment = await addComment(updatedComment);

  //     // Show the added comment at the top of the list
  //     setComments([addedComment, ...comments]);

  //     // Increase the total comments count
  //     setTotalComments(totalComments + 1);

  //     // Show success toast
  //     showSuccessToast("Comment added successfully!");

  //     // Reset form
  //     setNewComment({
  //       body: "",
  //       likes: 0,
  //       username: "",
  //       postId: 0,
  //       userId: 0,
  //     });
  //   } catch (error) {
  //     showErrorToast("Failed to add comment."); // Show error toast
  //   }
  // };

  // Handle Open Modal
  const handleOpenModal = async (commentId) => {
    try {
      const comment = await getComment(commentId);
      setSelectedComment(comment);
      setModalOpen(true);
      // showInfoToast("Comment loaded successfully!"); // Show success toast
    } catch (error) {
      showErrorToast("Failed to load comment."); // Show error toast
    }
  };

  // Handle Close Modal
  const handleCloseModal = () => {
    setSelectedComment(null);
    setEditComment(true);
    setModalOpen(false);
  };

  // Handle Edit Comment
  const handleEditComment = async (e) => {
    e.preventDefault();
    try {
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
      showInfoToast("Comment updated successfully!"); // Show success toast
      handleCloseModal();
    } catch (error) {
      showErrorToast("Failed to update comment."); // Show error toast
    }
  };

  // Handle Delete Comment
  const handleDeleteComment = async () => {
    try {
      await deleteComment(selectedComment.id);
      setComments(
        comments.filter((comment) => comment.id !== selectedComment.id)
      );
      showSuccessToast("Comment deleted successfully!"); // Show success toast
      handleCloseModal();
    } catch (error) {
      showErrorToast("Failed to delete comment."); // Show error toast
    }
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
      <CustomToast />
      {loading && <Loader />}
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedComments.map((comment, index) => (
            <div
              key={comment.id}
              className="customDiv p-4 rounded shadow-2xl hover:shadow-lg transition flex justify-between flex-col"
            >
              <div>
                <h2 className="text-lg font-bold mb-2">
                  {" "}
                  Name: {comment.user?.username || "Unknown User"}
                </h2>
                <p className="text-gray-500 text-sm mb-2">
                  Comment : {comment.body}
                </p>
                <p className="text-sm text-red-500 mb-4">
                  Likes: {comment.likes}
                </p>
              </div>
              <button
                onClick={() => handleOpenModal(comment.id)}
                className=" viewButton  mt-2 bg-blue-500 text-white px-3 py-1 rounded"
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
              value={selectedComment.user?.fullName}
              onChange={(e) =>
                setSelectedComment({
                  ...selectedComment,
                  user: {
                    ...selectedComment?.user,
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
