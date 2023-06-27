import { Auth, getAuth, updateProfile } from "firebase/auth";
import { addDoc, collection, doc, getDoc, setDoc } from "firebase/firestore";
import { profileDataType } from "../../../redux/profileSlice";
import { firestore, FirestoreServiceType } from "./firestore";

const COLLECTION_NAME = "profiles";
const ProfileService: FirestoreServiceType = {};
ProfileService.addProfile = async (data: profileDataType) => {
  return new Promise((resolve, reject) => {
    setDoc(doc(firestore, COLLECTION_NAME, String(data.u_id)), data)
      .then(() => {
        resolve({
          status: true,
          message: "Data Added Successfully",
          // data: docref,
        });
      })
      .catch((err) => {
        console.log(err);
        resolve({ status: false, message: err });
      });
  });
};

ProfileService.updateProfile = async (data: profileDataType) => {
  return new Promise((resolve, reject) => {
    const fauth: Auth = getAuth();
    setDoc(doc(firestore, COLLECTION_NAME, String(data.u_id)), data)
      .then(() => {
        const UpdateData = {
          displayName: data.displayName,
          photoURL: data.photoURL,
        };

        updateProfile(fauth.currentUser!, UpdateData)
          .then((res) => {
            resolve({
              status: true,
              message: "User Update Successfully",
              // data: docref,
            });
          })
          .catch((err) => {
            console.log(err);
            resolve({
              status: true,
              message: "Something went wrong",
              // data: docref,
            });
          });
      })
      .catch((err) => {
        resolve({ status: false, message: err });
      });
  });
};

ProfileService.getProfile = async (u_id: string) => {
  return new Promise((resolve, reject) => {
    const docRef = doc(firestore, COLLECTION_NAME, u_id);
    const docSnap = getDoc(docRef)
      .then((res) => {
        resolve({
          status: true,
          data: res.data(),
        });
      })
      .catch((err) => {
        resolve({ status: false, message: err });
      });
  });
};

export default ProfileService;
