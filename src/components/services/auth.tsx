import { FirebaseApp, initializeApp } from "@firebase/app";
import { FIREBASE_CONFIG } from "../../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updateProfile,
  Auth,
  User,
} from "firebase/auth";

import { object } from "prop-types";
import { getFirestore } from "firebase/firestore";

const firebase =  initializeApp(FIREBASE_CONFIG);
interface AuthServiceType {
  [key: string]: Function | boolean;
}

const AuthService: AuthServiceType = {};

AuthService!.register = (name: string, email: string, password: string) => {
  const fauth: Auth = getAuth();

  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(fauth, email, password)
      .then((userCredential) => {
        if (fauth.currentUser != null) {
          updateProfile(fauth.currentUser, {
            displayName: name,
          })
            .then(() => {
              resolve({ status: true, message: "Register successfully." });
            })
            .catch((error) => {
              resolve({ status: false, message: error.message });
            });
        }
      })
      .catch((error) => {
        let message = "Something Went Wrong";
        if (error && error.code && error.code == "auth/email-already-in-use") {
          message = "Email already used.";
        }
        resolve({ status: false, message: message });
      });
  });
};

AuthService.login = (email: string, password: string) => {
  const fauth: Auth = getAuth();
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(fauth, email, password)
      .then((user) => {
        if (user) {
          resolve({ status: true, message: "Login successfully." });
        } else {
          resolve({ status: false, message: "Incorrect Email or Password." });
        }
      })
      .catch((err) => {
        resolve({ status: false, message: "Incorrect Email or Password." });
      });
  });
};

AuthService.user = false;

AuthService.getProfile = () => {
  return new Promise(async (res, rej) => {
    const fauth: Auth = getAuth();

    await fauth.onAuthStateChanged((user: User | null) => {
      if (user) {
        res(user);
      } else {
        res(false);
      }
    });
  });
};

AuthService.logout = async () => {
  return new Promise((resolve) => {
    const fauth: Auth = getAuth();
    fauth
      .signOut()
      .then(() => {
        resolve({ status: true, message: "Logged out successfully." });
      })
      .catch((err) => {
        resolve({ status: true, message: "Logged out successfully." });
      });
  });
};

AuthService.setDataToFireStore = (data: any) => {
  console.log("setDataToFireStore");
  
  console.log(data);
};
export default AuthService;
