

const CommentList = ({ comments }) => {
    return(
        <>
        {comments &&
        comments.map((comment) => (
            <div className="comment-card-div">
                <div className="comment-card">
                    <div className="comment-text-div">
                        <p className="comment-text">{comment.text}</p>
                    </div>
                    <div className="comment-author-div">
                        <p className="comment-author">{comment.user}</p>
                    </div>
                </div>
            </div>
        ))}
        </>
    );
};

export default CommentList;