import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import CarouselComponent from '../../components/home/CarouselComponent';
import CategoryLink from '../../components/blog/CategoryLink';
import ArticleLink from '../../components/blog/ArticleLink';
import { Link } from 'react-router-dom';

const Homepage = () => {
    const [categories, setCategories] = useState([]);
    const [articles, setArticles] = useState([]);
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
        fetchCategories();
        fetchArticles();
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


        </div>
    );
};

export default Homepage;
