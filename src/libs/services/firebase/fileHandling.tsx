import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
import { FirestoreServiceType } from "./firestore";

const FirebaseFileHandling: FirestoreServiceType = {};

FirebaseFileHandling.addFile = async (
  data: File,
  FolderName: string,
  FileName: string
) => {
  return new Promise((resolve, reject) => {
    if (data != undefined) {
      const storage = getStorage();
      const storageRef = ref(storage, `${FolderName}/${FileName}`);
      uploadBytes(storageRef, data)
        .then((res) => {
          getDownloadURL(storageRef)
            .then((downloadUrl) => {
              resolve({
                status: true,
                message: "Data Added Successfully",
                downloadUrl: downloadUrl,
              });
            })
            .catch((err) => {
              console.log(err);

              resolve({
                status: false,
                message: "Something Went Wrong",
                downloadUrl: null,
              });
            });
        })
        .catch((err) => {
          console.log(err);

          resolve({
            status: false,
            message: "Something Went Wrong",
            downloadUrl: null,
          });
        });
    } else {
      resolve({
        status: false,
        message: "File is Not Given",
        downloadUrl: null,
      });
    }
  });
};

FirebaseFileHandling.removeFile = async (ObjectUrl: string) => {
  return new Promise((resolve, reject) => {
    const storage = getStorage();
    const fileRef = ref(storage, ObjectUrl);
    deleteObject(fileRef)
      .then(() => {
        resolve({ status: true, message: "Deleted Successfully" });
      })
      .catch((err) => {
        console.log(err);
        resolve({ status: false, message: "Something Went Wrong" });
      });
  });
};

export default FirebaseFileHandling;
