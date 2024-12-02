import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../../firebase';
import CarouselComponent from '../../components/home/CarouselComponent';
import CategoryLink from '../../components/blog/CategoryLink';
import ArticleLink from '../../components/blog/ArticleLink';
import Banner from '../../components/home/Banner';
import Post from '../../components/forum/Post'; // Import Post komponente
import { Link } from 'react-router-dom';
import Contact from '../../pages/contact/Contact';

const Homepage = () => {
    const [categories, setCategories] = useState([]);
    const [articles, setArticles] = useState([]);
    const [topLikedPost, setTopLikedPost] = useState(null); // Post sa najviše lajkova
    const [topCommentedPost, setTopCommentedPost] = useState(null); // Post sa najviše komentara
    const [isLoading, setIsLoading] = useState(true);

    // Niz slika koje će se ciklično koristiti
    const categoryImages = [
        'https://storage.googleapis.com/s5-bucket/queensgate/landing/ballicons/smarter.png',
        'https://storage.googleapis.com/s5-bucket/queensgate/landing/ballicons/ebookstore.png',
        'https://storage.googleapis.com/s5-bucket/queensgate/landing/ballicons/a-community.png',
    ];

    // Dohvatanje kategorija iz Firestore baze
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, 'categories'));
                const categoriesData = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data(),
                }));
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            } finally {
                setIsLoading(false);
            }
        };
        const fetchArticles = async () => {
            const articlesCollection = collection(db, 'articles');
            const articlesSnapshot = await getDocs(articlesCollection);
            const articlesList = articlesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            articlesList.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
            setArticles(articlesList.slice(0, 4)); // Prikaz zadnjih 4 članaka
        };
        const fetchTopPosts = async () => {
            try {
                const postsCollection = collection(db, 'posts');

                // Post sa najviše lajkova
                const likedQuery = query(postsCollection, orderBy('likeCounter', 'desc'), limit(1));
                const likedSnapshot = await getDocs(likedQuery);
                if (!likedSnapshot.empty) {
                    setTopLikedPost({
                        id: likedSnapshot.docs[0].id,
                        ...likedSnapshot.docs[0].data(),
                    });
                }

                // Post sa najviše komentara (izbrojavanje komentara u svakom postu)
                const postsSnapshot = await getDocs(postsCollection);
                let topCommented = null;
                let maxComments = 0;

                for (let postDoc of postsSnapshot.docs) {
                    const postId = postDoc.id;
                    const commentsCollection = collection(db, 'posts', postId, 'comments');
                    const commentsSnapshot = await getDocs(commentsCollection);

                    const commentsCount = commentsSnapshot.size; // Broj komentara za trenutni post

                    if (commentsCount > maxComments) {
                        maxComments = commentsCount;
                        topCommented = {
                            id: postId,
                            ...postDoc.data(),
                            commentsCount: commentsCount,
                        };
                    }
                }

                if (topCommented) {
                    setTopCommentedPost(topCommented);
                }
            } catch (error) {
                console.error('Error fetching top posts:', error);
            }
        };
        const fetchData = async () => {
            setIsLoading(true);
            await Promise.all([fetchCategories(), fetchArticles(), fetchTopPosts()]);
            setIsLoading(false);
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading categories...</div>;
    }

    return (
        <div>
            <CarouselComponent />
            <div className="row justify-content-center">
                <div className="col-10">
                    {/*Blog categories*/}
                    <div className="categories-header d-flex align-items-center justify-content-between my-4 border-bottom pb-2">
                        <h4 className="text-secondary mb-0">ISTRAŽI BLOG PREMA KATEGORIJAMA</h4>
                        <Link to="/blog/articles" className="text-decoration-none d-flex align-items-center">
                            <span className="me-2">Pogledaj sve</span>
                            <i className="fa fa-arrow-right"></i>
                        </Link>
                    </div>
                    <div className="row justify-content-around">
                        {categories.map((category, index) => (
                            <div className="col-lg-2 col-4" key={category.id}>
                                <CategoryLink
                                    categoryId={category.id}
                                    imageUrl={categoryImages[index % categoryImages.length]}
                                    categoryName={category.name}
                                />
                            </div>
                        ))}
                    </div>
                    {/*Blog*/}
                    <div className="categories-header d-flex align-items-center justify-content-between my-4 border-bottom pb-2">
                        <h4 className="text-secondary mb-0">NAJNOVIJE SA BLOGA</h4>
                    </div>
                    <div className="row justify-content-around">
                        {articles.map((article) => (
                            <div className="col-lg-3 col-6" key={article.id}>
                                <ArticleLink
                                    articleId={article.id}
                                    imageUrl={article.imageURL}
                                    articleName={article.title}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/*Baner*/}
            <Banner />
            {/* Posts */}
            <div className="row justify-content-center">
                <div className="col-10">
                    <div className="categories-header d-flex align-items-center justify-content-between my-4 border-bottom pb-2">
                        <h4 className="text-secondary mb-0">ISTRAŽI FORUM POSTOVE</h4>
                        <Link to="/forum" className="text-decoration-none d-flex align-items-center">
                            <span className="me-2">Pogledaj sve</span>
                            <i className="fa fa-arrow-right"></i>
                        </Link>
                    </div>
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <div className="h-100">
                                <h5>Forum post sa najviše podrške</h5>
                                {topLikedPost ? (
                                    <Post
                                        id={topLikedPost.id}
                                        name={topLikedPost.name}
                                        content={topLikedPost.content}
                                        likeCounter={topLikedPost.likeCounter}
                                        createdAt={topLikedPost.createdAt}
                                    />
                                ) : (
                                    <div>No liked posts available</div>
                                )}
                            </div>

                        </div>
                        <div className="col-lg-6 col-12">
                            <div className="h-100">
                                <h5>Forum post sa najviše odgovora</h5>
                                {topCommentedPost ? (
                                    <Post
                                        id={topCommentedPost.id}
                                        name={topCommentedPost.name}
                                        content={topCommentedPost.content}
                                        likeCounter={topCommentedPost.likeCounter}
                                        createdAt={topCommentedPost.createdAt}
                                    />
                                ) : (
                                    <div>No commented posts available</div>
                                )}
                            </div>

                        </div>
                    </div>
                     
                </div>
                <div className="col-10">
                    <Contact />
                </div>   
            </div>
        </div>
    );
};

export default Homepage;

