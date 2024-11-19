import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // For accessing route parameters
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';
import Categories from '../../components/blog/Categories';

const ArticlesByCategory = () => {
    const { id } = useParams(); // Get category ID from URL
    const [categories, setCategories] = useState({});
    const [articles, setArticles] = useState([]);
    console.log(id);
    useEffect(() => {
        const fetchArticlesByCategory = async () => {
            const articlesCollection = collection(db, 'articles');
            const q = query(articlesCollection, where('categoryId', '==', id)); // Query by category ID
            const articlesSnapshot = await getDocs(q);
            const articlesList = articlesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            console.log(articlesList);
            setArticles(articlesList);
        };
        const fetchCategories = async () => {
            const categoriesCollection = collection(db, 'categories');
            const categoriesSnapshot = await getDocs(categoriesCollection);
            const categoriesList = categoriesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            const categoriesMap = categoriesList.reduce((acc, category) => {
                acc[category.id] = category.name; // Use category ID as key and name as value
                return acc;
            }, {});
            setCategories(categoriesMap);
            fetchCategories();
        };

        fetchArticlesByCategory();
    }, [id]); // Re-run effect when category ID changes

    return (
        <div className="container mt-4">
            <Categories />
            {articles.length > 0 ? (
                <div className="row">
                    {articles.map(article => (
                        <div key={article.id} className="col-md-4 mb-4">
                            <div className="card h-100">
                                <img
                                    src={article.imageURL || 'defaultImageURL.jpg'}
                                    className="card-img-top"
                                    alt="Article image"
                                />
                                <div className="position-absolute top-0 end-0 m-2">
                                    <span className="badge bg-secondary">
                                        {article.createdAt.toDate().toLocaleDateString('hr-HR')}
                                    </span>
                                    <span className="badge bg-info ms-2">
                                        {categories[article.categoryId] || 'Nepoznato'}
                                    </span>
                                </div>
                                <div className="card-body">
                                    <h5 className="card-title">{article.title || 'Bez naslova'}</h5>
                                    <p className="card-text">
                                        {article.content ? article.content.substring(0, 100) + '...' : 'Nema sadržaja'}
                                    </p>
                                    <Link key={article.id} to={`/blog/article/${article.id}`} className="btn btn-outline-primary me-2 mb-2" >
                                        Pročitaj više
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-center">Nema članaka u ovoj kategoriji.</p>
            )}
        </div>
    );
};

export default ArticlesByCategory;