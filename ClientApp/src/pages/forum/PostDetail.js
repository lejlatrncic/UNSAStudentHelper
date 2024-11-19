// src/pages/PostDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc, updateDoc, collection, addDoc, serverTimestamp, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../../firebase';
import Comment from '../../components/forum/Comment';

function PostDetail() {
    const { id } = useParams(); // Get post ID from the URL
    const [post, setPost] = useState(null);
    const [likes, setLikes] = useState(0);
    const [isClicked, setIsClicked] = useState(false);
    const [comment, setComment] = useState('');
    const [nickname, setNickname] = useState('');
    const [comments, setComments] = useState([]);
    const [showCommentForm, setShowCommentForm] = useState(false);

    useEffect(() => {
        const fetchPost = async () => {
            const postRef = doc(db, 'posts', id);
            const postSnapshot = await getDoc(postRef);
            if (postSnapshot.exists()) {
                setPost({ id: postSnapshot.id, ...postSnapshot.data() });
                setLikes(postSnapshot.data().likeCounter); // Set initial likes from post data
            } else {
                console.log("No such post found!");
            }
        };

        const fetchComments = () => {
            const commentsRef = query(
                collection(db, "posts", id, "comments"),
                orderBy("timestamp", "desc")
            );
            const unsubscribe = onSnapshot(commentsRef, (snapshot) => {
                setComments(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                })));
            });

            return unsubscribe;
        };
        fetchPost();
        const unsubscribeComments = fetchComments();

        return () => unsubscribeComments();
    }, [id]);

    const handleLikeClick = async () => {
        setIsClicked(!isClicked);
        const newLikes = isClicked ? likes - 1 : likes + 1;
        setLikes(newLikes);

        await updateDoc(doc(db, "posts", id), { likeCounter: newLikes });
    };

    const postComment = async (e) => {
        e.preventDefault();
        if (!nickname) {
            alert("Please enter your name or nickname");
            return;
        }

        await addDoc(collection(db, "posts", id, "comments"), {
            name: nickname, // Save the nickname as the name of the commenter
            text: comment,
            timestamp: serverTimestamp(),
            likeCounter: 0
        });

        setComment(''); // Clear the comment input
        setNickname(''); // Clear the nickname input after submission
        setShowCommentForm(false); // Hide the comment form after posting
        
    };

    if (!post) return <p>Loading...</p>;

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
                        <h5 className="card-title">{post.name}</h5>
                        <p className="text-muted small">{new Date(post.createdAt?.seconds * 1000).toLocaleString()}</p>
                    </div>
                </div>

                {/* Post Content */}
                <p className="card-text">{post.content}</p>

                {/* Like Button */}
                <div className="d-flex align-items-center mb-3">
                    <button
                        className={`btn ${isClicked ? 'btn-danger' : 'btn-outline-danger'}`}
                        onClick={handleLikeClick}
                    >
                        <i className={`fa ${isClicked ? 'fa-heart' : 'fa-heart-o'}`} aria-hidden="true"></i> {likes}
                    </button>
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
                                {/* Close Button (X) */}
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
                                    onChange={(e) => setNickname(e.target.value)}  // Handle nickname change
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

                {/* Comment List */}
                <div className="mx-3">
                    {comments.length > 0 && (
                        <div className="text-start">
                            <small style={{ color: 'gray' }}>
                                Komenari od najnovijih
                            </small>
                        </div>
                    )}
                    {comments.map((comment) => (
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
            </div>
        </div>
    );
}

export default PostDetail;
