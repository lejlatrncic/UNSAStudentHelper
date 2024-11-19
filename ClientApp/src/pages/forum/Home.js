import NewPost from '../../components/forum/NewPost';
import Post from "../../components/forum/Post";
import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [posts, setPosts] = useState([]);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    useEffect(() => {
        // Use query to order posts by 'createdAt' in descending order
        const postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const reload = onSnapshot(postsQuery, (snapshot) => {
            setPosts(snapshot.docs.map((doc) => ({
                id: doc.id,
                post: doc.data(),
            })));
        });

        // Clean up the subscription
        return () => reload();
    }, []);

    return (
        <div className="container-fluid mt-4">
            <div
                className="container-fluid position-relative text-center text-white py-5"
                style={{
                    backgroundImage: `url('https://i.ytimg.com/vi/FQ-sXu102_k/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AH-CYAC0AWKAgwIABABGDQgTyh_MA8=&rs=AOn4CLClwBz8LxaocIxGgyPaEF4ECoRg8Q')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "white",
                }}
            >
                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 1,
                    }}
                ></div>
                <div className="position-relative" style={{ zIndex: 2 }}>
                    <h1 className="text-primary">UNSA STUDENT FORUM</h1>
                    <p className="mx-auto d-none d-md-block" style={{ maxWidth: "800px" }}>
                        Ovdje možete anonimno postaviti pitanja, podijeliti svoje iskustvo ili pružiti savjet kolegama. Forum je prostor gdje studenti međusobno pomažu u suočavanju sa stresom, razmjenjuju korisne savjete za učenje, motiviraju jedni druge i diskutuju o izazovima akademskog života.
                    </p>
                    <button
                        className="btn btn-outline-primary mb-3"
                        onClick={handleShowModal}
                    >
                        Dodaj novi post
                    </button>
                </div>
            </div>

            {/* Post List */}
            <div className="mx-sm-2 mx-lg-5 mt-3">
                {posts.map(({ post, id }) => (
                    <Post
                        key={id}
                        id={id}
                        name={post.name}
                        content={post.content}
                        createdAt={post.createdAt}
                        likeCounter={post.likeCounter}
                    />
                ))}
            </div>

            {/* Modal */}
            {showModal && (
                <div className={`modal fade ${showModal ? 'show d-block' : ''}`} tabIndex="-1">
                    <div className="modal-dialog modal-dialog-centered modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <NewPost onClose={handleCloseModal} /> {/* Pass onClose prop */}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;


