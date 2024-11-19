import React, { useState } from 'react';
import { db } from '../../firebase'; // Import Firebase configuration
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import './NewPost.css';

const NewPost = ({ onClose }) => { // Add onClose prop to control modal visibility
    const [name, setName] = useState('');
    const [content, setContent] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Success message state

    const handleAddPost = async (e) => {
        e.preventDefault();

        try {
            await addDoc(collection(db, 'posts'), {
                name,
                content,
                likeCounter: 0,
                createdAt: serverTimestamp(),
            });

            // Reset input fields and show success message
            setName('');
            setContent('');
            setShowSuccessMessage(true);

            // Close modal after a delay
            setTimeout(() => {
                setShowSuccessMessage(false);
                onClose(); // Call the onClose function to close the modal
            }, 4000); // Closes modal after 2 seconds
        } catch (error) {
            console.error("Error adding post: ", error);
        }
    };

    return (
        <div className="container-fluid mt-0 mb-0">
            <div className="row">
                <div className="col-lg-4 d-none d-lg-block text-center newpost-bg">
                    <img
                        src="https://unsa.ba/sites/default/files/styles/1000x620_node/public/slika/2020-12/UNSA_5.png?itok=YIkhWIV4"
                        alt="logo"
                        className="img-fluid mt-3"
                        style={{ maxHeight: '90px', transition: 'max-height 0.5s ease' }}
                    />
                </div>
                <div className="col-lg-8 col-sm-12">
                    <div className="text-center">
                        <img
                            src="https://cdn-icons-png.flaticon.com/512/9806/9806570.png"
                            alt="newpost"
                            className="img-fluid mt-3"
                            style={{ maxHeight: '90px', transition: 'max-height 0.5s ease' }}
                        />
                        <h1 className="m-2 fw-normal" style={{ color: 'rgb(77, 124, 138)', fontFamily: 'Forum' }}>Novi post</h1>
                        <p style={{ fontFamily: 'DM Sans', color: 'rgba(0, 0, 0, 0.8)' }}>
                            Molimo vas da poštujete <a href="#">pravila foruma</a> i da objavljujete samo dozvoljene sadržaje. Ukoliko Vaš post ne ispunjava potrebne uslove bit će uklonjen.
                        </p>

                        {/* Show success message if post added */}
                        {showSuccessMessage ? (
                            <p className="alert alert-success">Vaš post je uspješno dodan!</p>
                        ) : (
                            <form onSubmit={handleAddPost}>
                                <div className="form-floating mb-3">
                                    <input
                                        type="text"
                                        id="name"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Ime/Nadimak"
                                        required
                                    />
                                    <label htmlFor="name">Ime/Nadimak</label>
                                </div>

                                <div className="form-floating mb-3">
                                    <textarea
                                        id="content"
                                        className="form-control"
                                        rows="5"
                                        value={content}
                                        onChange={(e) => setContent(e.target.value)}
                                        placeholder="Tekst"
                                        style={{ height: '180px' }}
                                        required
                                    />
                                    <label htmlFor="content">Tekst</label>
                                </div>

                                <div className="mb-3 text-start">
                                    <button type="submit" className="btn btn-primary rounded-pill w-100">OBJAVI</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewPost;
