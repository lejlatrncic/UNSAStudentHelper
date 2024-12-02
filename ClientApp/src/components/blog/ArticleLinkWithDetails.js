import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const ArticleLinkWithDetails = ({ article }) => {
    const [category, setCategory] = useState(null);

    useEffect(() => {
        const fetchCategory = async () => {
            if (article.categoryId) {
                const categoriesCollection = collection(db, 'categories');
                const categoriesSnapshot = await getDocs(categoriesCollection);
                const categoriesList = categoriesSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                const categoryData = categoriesList.find(cat => cat.id === article.categoryId);
                setCategory(categoryData ? categoryData.name : 'Nepoznato');
            }
        };

        fetchCategory();
    }, [article.categoryId]);

    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100">
                <img
                    src={article.imageURL || 'defaultImageURL.jpg'}
                    className="card-img-top"
                    alt="Article"
                />
                <div className="position-absolute top-0 end-0 m-2">
                    <span className="badge bg-secondary">
                        {article.createdAt.toDate().toLocaleDateString('hr-HR')}
                    </span>
                    <span className="badge bg-info ms-2">
                        {category || 'Nepoznato'}
                    </span>
                </div>
                <div className="card-body">
                    <h5 className="card-title">{article.title || 'Bez naslova'}</h5>
                    <p className="card-text">
                        {article.content ? article.content.substring(0, 100) + '...' : 'Nema sadržaja'}
                    </p>
                    <Link to={`/blog/article/${article.id}`} className="btn btn-outline-primary me-2 mb-2">
                        Pročitaj više
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ArticleLinkWithDetails;