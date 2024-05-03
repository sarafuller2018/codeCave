import React, { useState } from "react";
import { useMutation, gql } from '@apollo/client';
import Auth from "../../utils/auth";
import { useNavigate } from 'react-router-dom';
import { QUERY_SINGLE_PROJECT } from "../../utils/queries";
import { Link } from "react-router-dom"; 

const ADD_COMMENT = gql`
  mutation AddComment($projectId: ID!, $text: String!, $user: String!) {
    addComment(projectId: $projectId, text: $text, user: $user) {
id
    }
  }
`;

const CommentForm = ({ projectId, user, isOpen }) => {
    const [formState, setFormState] = useState({
        commentText: '',
    });
    const navigate = useNavigate();

    const [addCommentMutation] = useMutation(ADD_COMMENT, {
        refetchQueries: [
            {query: QUERY_SINGLE_PROJECT}
        ]
    });

    const addComment = async (projectId, text) => {
        console.log('Adding comment:', text, "by:", user, "to project:", projectId); // Log the comment text
        try {
            await addCommentMutation({ variables: { projectId, user, text } });
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
        addComment(projectId, formState.commentText, user);
        
    };

    return (
        <>
        {Auth.loggedIn() ? (
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