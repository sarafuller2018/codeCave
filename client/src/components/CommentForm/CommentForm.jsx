import { useState } from "react";

const CommentForm = ({ isOpen, toggleForm }) => {
    const [formState, setFormState] = useState({
        commentText: '',
    });

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormState({
            ...formState,
            [name]: value,
        });
    };

    return (
        <div className={`comment-form-div ${isOpen ? "active" : ""}`}>
            <form className="comment-form-card" onSubmit={toggleForm}>
                <div>
                    <p>Add Your Comment</p>
                </div>
                <div>
                    <input className="comment-text-input" type="text" placeholder="Your comments here"
                        name="comment-text" value={formState.text}
                        onChange={handleChange} />
                </div>
                <div className="addComment-btn-div">
                    <button
                        className="addComment-btn"
                        style={{ cursor: 'pointer' }}
                        type="submit"
                    >
                        Submit Comment
                    </button>
                </div>
            </form>
        </div>
    );

};

export default CommentForm;