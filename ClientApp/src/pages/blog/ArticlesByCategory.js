import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // For accessing route parameters
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import ArticleLinkWithDetails from '../../components/blog/ArticleLinkWithDetails';
import Categories from '../../components/blog/Categories';
import Search from '../../components/blog/Search';

const ArticlesByCategory = () => {
    const { id } = useParams(); // Get category ID from URL
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticlesByCategory = async () => {
            const articlesCollection = collection(db, 'articles');
            const q = query(articlesCollection, where('categoryId', '==', id)); // Query by category ID
            const articlesSnapshot = await getDocs(q);
            const articlesList = articlesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setArticles(articlesList);
        };

        fetchArticlesByCategory();
    }, [id]); // Re-run effect when category ID changes

    return (
        <div className="container mt-4">
            <Search />
            <Categories />
            {articles.length > 0 ? (
                <div className="row">
                    {articles.map(article => (
                        <ArticleLinkWithDetails
                            key={article.id}
                            article={article}
                        />
                    ))}
                </div>
            ) : (
                <p className="text-center">Nema članaka u ovoj kategoriji.</p>
            )}
        </div>
    );
};

export default ArticlesByCategory;
