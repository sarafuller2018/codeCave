import React from 'react';

const CommentList = ({ comments }) => {
    return (
        <div className="comment-list">
             <div className="project-title-div">
                            <p className="comments-title">Comments</p>
                        </div>
                        <hr className='divider'/>
            {comments.map((comment, index) => (
                <div className="comment-item" key={index}>
                    
                    <p className="comment-text">- {comment.text}</p>
                    <p className="comment-user">By: {comment.user}</p>
                </div>
            ))}
        </div>
    );
};

export default CommentList;