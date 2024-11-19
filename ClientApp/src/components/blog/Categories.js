import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

const Categories = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        
        const fetchCategories = async () => {
            const categoriesCollection = collection(db, 'categories');
            const categoriesSnapshot = await getDocs(categoriesCollection);
            const categoriesList = categoriesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            setCategories(categoriesList);
        };

        fetchCategories();
    }, []);

    return (
        <div className="container mt-4 justify-content-center">
            {categories.length > 0 ? (
                <>
                    <div className="d-flex flex-wrap mb-3">
                        <Link
                            to={`/blog/articles`} 
                            className="btn btn-outline-primary me-2 mb-2" // Bootstrap button for styling
                        >
                            Svi članci
                        </Link>
                        {categories.map(category => (
                            <Link
                                key={category.id}
                                to={`/blog/articles/${category.id}`} // Link to ArticlesByCategory
                                className="btn btn-outline-primary me-2 mb-2" // Bootstrap button for styling
                            >
                                {category.name}
                            </Link>
                        ))}
                    </div>
                </>
            ) : (
                <p className="text-center">Kategorije nisu dostupne.</p>
            )}
        </div>
    );
};

export default Categories;