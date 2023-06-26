import { initializeApp } from "@firebase/app";
import { FIREBASE_CONFIG } from "../../../firebase-config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  getAuth,
  updateProfile,
  Auth,
  User,
} from "firebase/auth";
import storage, {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
const firebase = initializeApp(FIREBASE_CONFIG);
interface AuthServiceType {
  [key: string]: Function;
}

const AuthService: AuthServiceType = {};
AuthService!.uploadFile = async (
  fauth: Auth,
  userid: string,
  profile: Blob
) => {
  const storage = getStorage();
  const storageRef = ref(storage, `profile_images/${fauth.currentUser?.uid}`);
  await uploadBytes(storageRef, profile).then();
  const downloadURL = await getDownloadURL(storageRef);
  return downloadURL;
};
AuthService!.register = async (
  name: string,
  email: string,
  password: string,
  profile: Blob
) => {
  const fauth: Auth = getAuth();

  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(fauth, email, password)
      .then(async (userCredential) => {
        if (fauth.currentUser != null) {
          const UpdateData = { displayName: name, photoURL: "" };
          if (profile) {
            UpdateData.photoURL = await AuthService.uploadFile(
              fauth,
              fauth.currentUser?.uid,
              profile
            );
          }
          localStorage.setItem(
            "isExpire",
            await fauth.currentUser.getIdToken()
          );
          updateProfile(fauth.currentUser, UpdateData)
            .then(async () => {})
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
      .then(async (user) => {
        if (user) {
          localStorage.setItem(
            "isExpire",
            await fauth.currentUser!.getIdToken()
          );
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
        localStorage.removeItem("isExpire");
        resolve({ status: true, message: "Logged out successfully." });
      })
      .catch((err) => {
        resolve({ status: true, message: "Logged out successfully." });
      });
  });
};

export default AuthService;
