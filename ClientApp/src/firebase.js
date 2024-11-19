import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, getDocs, doc, getDoc } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyBkC3Kg7YoEjuagLaAB65Jn2CeMxaJdtTc",
    authDomain: "unsa-student-helper.firebaseapp.com",
    projectId: "unsa-student-helper",
    storageBucket: "unsa-student-helper.firebasestorage.app",
    messagingSenderId: "57626012448",
    appId: "1:57626012448:web:258b125bc7f5f288c6c545",
    measurementId: "G-3MJMH23G0T"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// Funkcija za prijavu admina
const adminLogin = async (email, password) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};
// Funkcija za dohvaćanje članaka
export const getArticles = async () => {
    const articlesCollection = collection(db, "articles");
    const articleSnapshot = await getDocs(articlesCollection);
    return articleSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};
// Funkcija za dohvaćanje određenog članka
export const fetchArticle = async (id) => {
    try {
        const docRef = doc(db, 'articles', id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() };
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error fetching article:", error);
        throw error;
    }
};

// Funkcija za dohvaćanje kategorija
export const fetchCategories = async () => {
    const categoriesCollection = collection(db, 'categories');
    const categoriesSnapshot = await getDocs(categoriesCollection);
    const categoriesList = categoriesSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
    return categoriesList.reduce((acc, category) => {
        acc[category.id] = category.name; // Use category ID as key and name as value
        return acc;
    }, {});
};
// Eksportujte firebaseApp, auth, db i adminLogin
export { firebaseApp, auth, db, adminLogin };