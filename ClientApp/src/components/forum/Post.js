import React, { useEffect, useState } from 'react';
import { doc, updateDoc, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import Comment from './Comment';
import { Link } from 'react-router-dom';

function Post({ id, name, content, likeCounter, createdAt }) {
    const [likes, setLikes] = useState(likeCounter);
    const [isClicked, setIsClicked] = useState(false);
    const [comment, setComment] = useState('');
    const [nickname, setNickname] = useState('');
    const [comments, setComments] = useState([]);
    const [showCommentForm, setShowCommentForm] = useState(false);

    // Like handling
    const handleClick = async () => {
        setIsClicked(!isClicked);
        const newLikes = isClicked ? likes - 1 : likes + 1;
        setLikes(newLikes);

        await updateDoc(doc(db, "posts", id), { likeCounter: newLikes });
    };

    // Posting a comment
    const postComment = async (e) => {
        e.preventDefault();
        if (!nickname) {
            alert("Please enter your name or nickname");
            return;
        }

        await addDoc(collection(db, "posts", id, "comments"), {
            name: nickname,
            text: comment,
            timestamp: serverTimestamp(),
            likeCounter: 0
        });

        setComment('');
        setNickname('');
        setShowCommentForm(false);
    };

    // Fetching comments
    useEffect(() => {
        const commentsRef = query(
            collection(db, "posts", id, "comments"),
            orderBy("timestamp", "asc")    
        );
        const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
            setComments(snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            })));
        });

        return () => unsubscribe();
    }, [id]);
    comments.sort((a, b) => b.likeCounter - a.likeCounter);
    const displayedComments = comments.slice(0, 3); 
    const totalComments = comments.length;

    return (
        <div className="card mb-4 shadow">
            <div className="card-body">

                {/* Post Header */}
                <div className="d-flex align-items-center mb-3">
                    <img
                        src="https://png.pngtree.com/png-clipart/20220117/original/pngtree-cartoon-hand-drawn-default-avatar-png-image_7130443.png"
                        alt="avatar"
                        className="rounded-circle"
                        style={{ width: '100px', height: '100px' }}
                    />
                    <div className="ms-3">
                        <h5 className="card-title">{name}</h5>
                        <p className="text-muted small">{new Date(createdAt?.seconds * 1000).toLocaleString()}</p>
                    </div>
                </div>

                {/* Post Content */}
                <p className="card-text">{content}</p>

                {/* Like Button */}
                <div className="d-flex align-items-center justify-content-between mb-3">
                    <button
                        className={`btn btn-outline-danger ${isClicked && 'text-danger'}`}
                        onClick={handleClick}
                    >
                        <i className={`fa ${isClicked ? 'fa-heart' : 'fa-heart-o'}`} aria-hidden="true"></i> {likes}
                    </button>
                    <Link to={`/post/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        Pogledaj više..
                    </Link>
                </div>

                {/* Comment Section */}
                <hr />
                <div className="mb-3">
                    {/* Add Comment Button */}
                    {!showCommentForm && (
                        <button
                            className="btn btn-outline-primary"
                            onClick={() => setShowCommentForm(true)}
                        >
                            Dodaj komentar
                        </button>
                    )}

                    {/* Comment Form */}
                    {showCommentForm && (
                        <div className="d-flex align-items-center mb-2">
                            <img
                                src="https://png.pngtree.com/png-clipart/20220125/original/pngtree-cartoon-hand-drawn-default-avatar-cat-png-image_7227767.png"
                                alt="avatar"
                                className="rounded-circle"
                                style={{ width: '80px', height: '80px' }}
                            />
                            <div className="ms-3 w-100">
                                <div className="d-flex justify-content-end">
                                    <button
                                        type="button"
                                        className="btn btn-link text-danger"
                                        onClick={() => setShowCommentForm(false)}
                                    >
                                        <i className="fa fa-times" aria-hidden="true"></i>
                                    </button>
                                </div>

                                <input
                                    type="text"
                                    className="form-control mb-2"
                                    placeholder="Upiši ime/nadimak..."
                                    value={nickname}
                                    onChange={(e) => setNickname(e.target.value)}
                                    required
                                />
                                <textarea
                                    className="form-control mb-2"
                                    placeholder="Dodaj komentar..."
                                    value={comment}
                                    onChange={(e) => setComment(e.target.value)}
                                    required
                                />
                                <button type="submit" className="btn btn-primary" onClick={postComment}>Dodaj</button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Display top 3 comments */}
                <div className="mx-3">
                    {totalComments > 0 && (
                        <div className="text-start">
                            <small style={{ color: 'gray' }}>
                                Top komentari
                            </small>
                        </div>
                    )}
                    {displayedComments.map((comment) => (
                        <Comment
                            key={comment.id}
                            postId={id}
                            commentId={comment.id}
                            name={comment.name}
                            text={comment.text}
                            timestamp={comment.timestamp}
                            likeCounter={comment.likeCounter}
                        />
                    ))}
                </div>

                {/* "View More Comments" link */}
                {totalComments > 3 && (
                    <div className="text-center mt-3">
                        <Link to={`/post/${id}`} style={{ textDecoration: 'none', color: 'gray' }}>
                            Pogledaj {totalComments} komentara
                        </Link>
                    </div>
                )}

            </div>
        </div>
    );
}

export default Post;
