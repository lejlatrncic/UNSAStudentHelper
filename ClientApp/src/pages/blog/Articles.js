import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db, fetchCategories } from '../../firebase'; // Import existing fetchCategories function
import { Link } from 'react-router-dom';
import Categories from '../../components/blog/Categories';
import ArticlesList from '../../components/blog/ArticlesList';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState({});
    const [visibleArticles, setVisibleArticles] = useState(14);

    useEffect(() => {
        const fetchArticles = async () => {
            const articlesCollection = collection(db, 'articles');
            const articlesSnapshot = await getDocs(articlesCollection);
            const articlesList = articlesSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            articlesList.sort((a, b) => b.createdAt.toMillis() - a.createdAt.toMillis());
            setArticles(articlesList);
        };

        // Fetch articles and categories on component mount
        fetchArticles();
        fetchCategories().then(setCategories); // Set categories from the shared fetch function
    }, []);

    const currentArticles = articles.slice(0, visibleArticles);

    const handleLoadMore = () => {
        setVisibleArticles(prev => prev + 6);
    };

    return (
        <div className="container-fluid mt-4">
            <div
                className="container-fluid position-relative text-center text-white py-5"
                style={{
                    backgroundImage: `url('https://img.freepik.com/premium-photo/burning-mind-drowning-water-surreal-illustration-persons-head-with-flames-erupting-from-it-submerged-water_1282444-125352.jpg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    color: "white",
                }}
            >
                {/* Overlay */}
                <div
                    className="position-absolute top-0 start-0 w-100 h-100"
                    style={{
                        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent overlay
                        zIndex: 1,
                    }}
                ></div>

                {/* Content */}
                <div className="position-relative" style={{ zIndex: 2 }}>
                    <h1 className="text-primary">UNSA ANTI-STRES BLOG</h1>
                    <p className="mx-auto d-none d-md-block" style={{ maxWidth: "800px" }}>
                        Normalno je da se ponekad osjećate umorno ili preopterećeno. U današnjem ubrzanom svijetu, mnogi se suočavaju s osjećajem sagorijevanja, što može utjecati na vaše svakodnevne aktivnosti i postignuća. Važno je prepoznati ove osjećaje i potražiti načine za poboljšanje svog mentalnog zdravlja.
                        <br /><br />
                        Ovdje ćete pronaći niz članaka koji vam mogu pomoći da se nosite s ovim izazovima. Od savjeta za upravljanje stresom do tehnika za poboljšanje produktivnosti, naši članci su osmišljeni da vam pruže podršku i korisne informacije. Pročitajte naše članke i pronađite inspiraciju za ostvarivanje vaših akademskih ciljeva!
                    </p>
                </div>
            </div>
            <Categories />
            {articles.length > 0 ? (
                <>
                    <div className="row">
                        <div className="col-md-9 col-sm-12">
                            <div className="row">
                                <div className="col-md-8 mb-6">
                                    <div className="card mb-4 position-relative">
                                        <img
                                            src={articles[0].imageURL || 'defaultImageURL.jpg'}
                                            className="card-img-top"
                                            alt="Article image"
                                        />
                                        <div className="position-absolute top-0 end-0 m-2">
                                            <span className="badge bg-secondary">
                                                {articles[0].createdAt?.toDate().toLocaleDateString('hr-HR')}
                                            </span>
                                            <span className="badge bg-danger ms-2">NOVO</span>
                                            <span className="badge bg-info ms-2">
                                                {categories[articles[0].categoryId] || 'Nepoznato'}
                                            </span>
                                        </div>
                                        <div className="card-body">
                                            <h3 className="card-title">{articles[0].title || 'Bez naslova'}</h3>
                                            <p className="card-text mt-2">
                                                {articles[0].content ? articles[0].content.substring(0, 200) + '...' : 'Nema sadržaja'}
                                            </p>
                                            <Link to={`/blog/article/${articles[0].id}`} className="btn btn-outline-primary me-2 mb-2">
                                                Pročitaj više
                                            </Link>
                                        </div>
                                    </div>
                                </div>

                                {currentArticles.slice(1).map(article => (
                                    <div key={article.id} className="col-md-4 mb-4">
                                        <div className="card h-100">
                                            <img
                                                src={article.imageURL || 'defaultImageURL.jpg'}
                                                className="card-img-top"
                                                alt="Article image"
                                            />
                                            <div className="position-absolute top-0 end-0 m-2">
                                                <span className="badge bg-secondary">
                                                    {article.createdAt?.toDate().toLocaleDateString('hr-HR')}
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
                                                <Link to={`/blog/article/${article.id}`} className="btn btn-outline-primary me-2 mb-2">
                                                    Pročitaj više
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            {visibleArticles < articles.length && (
                                <button className="mt-3 text-center" onClick={handleLoadMore}>
                                    Učitaj više
                                </button>
                            )}
                        </div>
                        <div
                            className="col-md-3 d-none d-md-block"
                            style={{
                                position: 'sticky',
                                top: '20px', // Razmak sa vrha
                                height: 'calc(100vh - 20px)', // Visina ekrana minus razmak
                                overflowY: 'auto', // Omogućava skrolovanje unutar sidebara
                            }}
                        >
                            <h5 className="text-center">Preporučeni članci</h5>
                            <ArticlesList />
                        </div>
                    </div>
                </>
            ) : (
                <p className="text-center">Trenutno nema članaka za prikaz.</p>
            )}
        </div>
    );
};

export default Articles;
