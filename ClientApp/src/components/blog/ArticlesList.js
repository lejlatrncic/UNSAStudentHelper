import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

const ArticlesList = () => {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState({});

    useEffect(() => {
        const fetchArticles = async () => {
            const articlesCollection = collection(db, 'articles');
            const articlesSnapshot = await getDocs(articlesCollection);
            const articlesList = articlesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            articlesList.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
            setArticles(articlesList.slice(0, 10)); // Prikaz zadnjih 10 članaka
        };

        const fetchCategories = async () => {
            const categoriesCollection = collection(db, 'categories');
            const categoriesSnapshot = await getDocs(categoriesCollection);
            const categoriesList = categoriesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Kreiranje mape kategorija { [id]: name }
            const categoriesMap = categoriesList.reduce((acc, category) => {
                acc[category.id] = category.name;
                return acc;
            }, {});
            setCategories(categoriesMap);
        };

        // Fetch articles and categories on component mount
        fetchArticles();
        fetchCategories();
    }, []);

    return (
        <div className="container mt-4">
            <hr />
            {articles.length > 0 ? (
                <div className="articles-list">
                    {articles.map((article) => (
                        <div key={article.id} className="article-item mb-4">
                            <div className="article-header mb-2">
                                <p className="text-uppercase font-weight-bold text-primary small mb-1">
                                    {categories[article.categoryId] || 'Kategorija'}
                                </p>
                                <Link to={`/blog/article/${article.id}`} className="text-dark">
                                    <p className="m-0">{article.title}</p>
                                </Link>
                                <p className="text-muted small">
                                    {article.createdAt.toDate().toLocaleDateString('hr-HR')}
                                </p>
                            </div>
                            <hr />
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">Trenutno nema članaka za prikaz.</p>
            )}
        </div>
    );
};

export default ArticlesList;