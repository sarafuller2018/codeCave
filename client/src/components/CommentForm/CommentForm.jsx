import React, { useState } from "react";
import { useMutation, gql } from '@apollo/client';

const ADD_COMMENT = gql`
  mutation AddComment($projectId: ID!, $text: String!) {
    addComment(projectId: $projectId, text: $text) {
      text
      user
    }
  }
`;

const CommentForm = ({ projectId, isOpen }) => {
    const [formState, setFormState] = useState({
        commentText: '',
    });

    const [addCommentMutation] = useMutation(ADD_COMMENT);

    const addComment = async (projectId, text) => {
        console.log('Adding comment:', text); // Log the comment text
        try {
            await addCommentMutation({ variables: { projectId, text } });
            // Optionally, you can refetch the project data to update the UI
        } catch (error) {
            if (error.message.includes('AuthenticationError')) {
                // Handle authentication error
                console.error('AuthenticationError:', error.message);
            } else {
                // Handle other errors
                console.error('Error adding comment:', error);
            }
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        addComment(projectId, formState.commentText);
    };

    return (
        <div className={`comment-form-div ${isOpen ? "active" : ""}`}>
            <div className="comment-form-card">
                <div>
                    <p></p>
                </div>
                <div>
                    <input
                        className="comment-text-input, comment-input"
                        type="text"
                        placeholder="Your comments here"
                        name="commentText"
                        value={formState.commentText}
                        onChange={handleChange}
                    />
                </div>
                <div className="addComment-btn-div">
                    <button
                        className='submit-comment-btn'
                        style={{ cursor: 'pointer' }}
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Submit Comment
                    </button>
                </div>
            </div>
        </div>
        
    );
};

export default CommentForm;