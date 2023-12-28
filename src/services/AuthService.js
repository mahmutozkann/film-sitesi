// AuthService.js

import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const firebaseConfig = {
    // firebase konfigürasyon bilgileri
    apiKey: "AIzaSyCe4yh6NfV2lFUSzI-NwrXA739DWNpHoJE",
    authDomain: "film-web-sitesi.firebaseapp.com",
    projectId: "film-web-sitesi",
    storageBucket: "film-web-sitesi.appspot.com",
    messagingSenderId: "75512205651",
    appId: "1:75512205651:web:8a59c204233b22c23a91a6"

};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

export { db };
class AuthService {
    static registerUser = async (email, password) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            console.log('Kullanıcı başarıyla kaydedildi.');
        } catch (error) {
            console.error('Kullanıcı kaydı sırasında bir hata oluştu:', error.message);
        }
    };

    static loginUser = async (email, password) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Kullanıcı başarıyla giriş yaptı.');
            return true; // Burada true döndürüyoruz, çünkü başarılı giriş yaptı.
        } catch (error) {
            console.error('Kullanıcı girişi sırasında bir hata oluştu:', error.message);
            return false; // Burada false döndürüyoruz, çünkü başarısız giriş oldu.
        }
    };

    static getCurrentUserEmail = () => {
        const user = auth.currentUser;

        if (user) {
            return user.email;
        }

        return null;
    };

    static isLoggedIn = () => {
        const user = auth.currentUser;
        return user !== null;
    };

    static logoutUser = () => {
        signOut(auth);
        console.log('Kullanıcı başarıyla çıkış yaptı.');
    };

    // Kullanıcı durumu değiştiğinde bu fonksiyon çalışacak
    static watchAuthState = (callback) => {
        onAuthStateChanged(auth, (user) => {
            callback(user);
        });
    };


    static getCurrentUserId = () => {
        const user = auth.currentUser;

        if (user) {
            return user.uid;
        }

        return null;
    };
}

export default AuthService;
