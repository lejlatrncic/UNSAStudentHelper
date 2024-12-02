import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import ArticleLinkWithDetails from '../../components/blog/ArticleLinkWithDetails';
import Categories from '../../components/blog/Categories';
import Search from '../../components/blog/Search';

const SearchResults = () => {
    const [articles, setArticles] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const location = useLocation();

    // Izvuci query parametar iz URL-a
    const query = new URLSearchParams(location.search).get('query') || '';

    useEffect(() => {
        const fetchArticles = async () => {
            const querySnapshot = await getDocs(collection(db, 'articles'));
            const articlesList = querySnapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setArticles(articlesList);
        };
        fetchArticles();
    }, []);

    useEffect(() => {
        const lowerCaseQuery = query.toLowerCase();
        const results = articles.filter(
            (article) =>
                article.title.toLowerCase().includes(lowerCaseQuery) ||
                article.content.toLowerCase().includes(lowerCaseQuery)
        );
        setFilteredArticles(results);
    }, [query, articles]);

    return (
        <div className="container my-4">
            <Search />
            <Categories />
            <h3>Rezultati pretrage za: "{query}"</h3>
            <div className="row">
                {filteredArticles.length > 0 ? (
                    <div className="row">
                        {filteredArticles.map(article => (
                            <ArticleLinkWithDetails
                                key={article.id}
                                article={article}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="text-center">Nema članaka koji sadrže "{query}".</p>
                )}
            </div>
        </div>
    );
};

export default SearchResults;