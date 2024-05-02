import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { ADD_COMMENT } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { QUERY_COMMENTS, QUERY_PROJECTS } from "../../utils/queries";

const CommentForm = () => {
    const [formState, setFormState] = useState({
        text: '',
    });

    const [addComment, { error }] = useMutation(ADD_COMMENT, {
        refetchQueries: [
            { query: QUERY_PROJECTS },
            { query: QUERY_COMMENTS }
        ]
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // addComment(projectId, formState.commentText);

        try {
            const { data } = await addComment({
                variables: { ...formState },
            });

            setFormState({
                text: "",
            });

            alert("Comment added!");
            // navigate("/home");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            {Auth.loggedIn() ? (
                <div className="form-div">
                    <form onSubmit={handleFormSubmit} className='add-project-form-card'>
                        <div className="login-text-div">
                            <h4 className="login-text">Add Comment</h4>
                        </div>

                        {error && (
                            <div>
                                <p className="error-text">Error with adding comment. Please try again!</p>
                            </div>
                        )}

                        <div className='input-div'>
                            <div className="add-project-title-div">
                                <input
                                    className="project-title-input"
                                    placeholder="Your Comment"
                                    name="name"
                                    type="text"
                                    value={formState.text}
                                    onChange={handleChange}
                                />
                                <label className="form-label" >
                                </label>
                            </div>
                            
                            <div className='done-btn-div'>
                                <button className='done-btn'>Done</button>
                            </div>
                        </div>
                    </form>
                </div>
            ) : (
                <p>
                    You need to be logged in to share your thoughts. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </>
    );
};

export default CommentForm;



// const CommentForm = ({ projectId, isOpen }) => {
//     const [formState, setFormState] = useState({
//         commentText: '',
//     });

//     const [addCommentMutation] = useMutation(ADD_COMMENT);

//     const addComment = async (projectId, text) => {
//         console.log('Adding comment:', text); // Log the comment text
//         try {
//             await addCommentMutation({ variables: { projectId, text } });
//             // Optionally, you can refetch the project data to update the UI
//         } catch (error) {
//             if (error.message.includes('AuthenticationError')) {
//                 // Handle authentication error
//                 console.error('AuthenticationError:', error.message);
//             } else {
//                 // Handle other errors
//                 console.error('Error adding comment:', error);
//             }
//         }
//     };

//     const handleChange = (event) => {
//         const { name, value } = event.target;

//         setFormState({
//             ...formState,
//             [name]: value,
//         });
//     };

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         addComment(projectId, formState.commentText);
//     };

//     return (
//         <div className={`comment-form-div ${isOpen ? "active" : ""}`}>
//             <div className="comment-form-card">
//                 <div>
//                     <p>Add Your Comment</p>
//                 </div>
//                 <div>
//                     <input
//                         className="comment-text-input, comment-input"
//                         type="text"
//                         placeholder="Your comments here"
//                         name="commentText"
//                         value={formState.commentText}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="addComment-btn-div">
//                     <button
//                         className='comment-btn'
//                         style={{ cursor: 'pointer' }}
//                         type="submit"
//                         onClick={handleSubmit}
//                     >
//                         Submit Comment
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default CommentForm;