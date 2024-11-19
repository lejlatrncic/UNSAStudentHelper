import React, { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

function Comment({ postId, commentId, name, text, timestamp, likeCounter }) {
    const [likes, setLikes] = useState(likeCounter);
    const [isClicked, setIsClicked] = useState(false);

    const handleClick = async () => {
        setIsClicked(!isClicked);
        const newLikes = isClicked ? likes - 1 : likes + 1;
        setLikes(newLikes);

        try {
            // Update the nested comment within the specific post
            const commentRef = doc(db, "posts", postId, "comments", commentId);
            await updateDoc(commentRef, { likeCounter: newLikes });
        } catch (error) {
            console.error("Error updating like count:", error);
        }
    };

    return (
        <div className="d-flex align-items-start mb-2">
            <img
                src="https://png.pngtree.com/png-clipart/20220125/original/pngtree-cartoon-hand-drawn-default-avatar-cat-png-image_7227767.png"
                alt="avatar"
                className="rounded-circle"
                style={{ width: '40px', height: '40px', marginRight: '10px' }}
            />
            <div className="flex-grow-1">
                <p className="mb-1"><strong>{name}</strong></p>
                <p className="mb-1">{text}</p>
                <small className="text-secondary">{new Date(timestamp?.toDate()).toLocaleString()}</small>
            </div>

            {/* Like Button aligned to the right */}
            <button
                className={`btn btn-sm ${isClicked ? 'text-success' : 'text-muted'} ms-auto`}
                onClick={handleClick}
                style={{ border: 'none', padding: '0 0.5rem' }}  // Remove outline and reduce padding
            >
                <i className={`fa ${isClicked ? 'fa-thumbs-up' : 'fa-thumbs-o-up'}`} aria-hidden="true"></i> {likes}
            </button>
        </div>
    );
}

export default Comment;

