import { FIREBASE_CONFIG } from "../../../firebase-config";
import { initializeApp } from "@firebase/app";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import AuthService from "./auth";
import { groupDataType } from "../../../redux/groupSlice";
import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytes,
} from "firebase/storage";
const firebase = initializeApp(FIREBASE_CONFIG);
const firestore = getFirestore(firebase);

interface FirestoreServiceType {
  [key: string]: Function;
}

const FirestoreService: FirestoreServiceType = {};

FirestoreService!.addDataToFirestore = async (
  data: any,
  collectionName: string
) => {
  const storage = getStorage();
  const storageRef = ref(
    storage,
    `group_images/${data.admin_user_id + data.name}`
  );
  console.log(data.group_image);
  await uploadBytes(storageRef, data.group_image).then();
  const downloadURL = await getDownloadURL(storageRef);
  data.group_image = downloadURL;
  const docRef = await addDoc(collection(firestore, collectionName), data);
  return docRef.id;
};

FirestoreService!.updateDataToFirestore = async (
  data: any,
  collectionName: string
) => {
  if (data.group_image) {
    const storage = getStorage();
    const storageRef = ref(
      storage,
      `group_images/${data.admin_user_id + data.name + "update"}`
    );
    console.log(data.group_image);
    await uploadBytes(storageRef, data.group_image).then();
    const downloadURL = await getDownloadURL(storageRef);
    data.group_image = downloadURL;
  }

  try {
    const docRef = await doc(firestore, collectionName, data.id);
    await updateDoc(docRef, data);
    return docRef.id;
  } catch (error) {
    return "data Not Updated";
  }
};

FirestoreService!.deleteDataToFirestore = async (
  doc: any,
  collectionName: string
) => {
  if (doc.group_image != '') {
    const storage = getStorage();
    const fileRef = ref(storage, doc.group_image);
    deleteObject(fileRef)
      .then(() => {
        deleteDoc(doc(firestore, collectionName, doc.id))
          .then(() => {
            throw new Error("We are Success");
          })
          .catch(() => {
            throw new Error("Data Not completed");
          });
      })
      .catch(() => {
        throw new Error("File Not Deleted");
      });
  } else {
    deleteDoc(doc(firestore, collectionName, doc.id))
      .then(() => {
        throw new Error("We are Success");
      })
      .catch(() => {
        throw new Error("Data Not completed");
      });
  }
};
FirestoreService!.getGroups = async () => {
  const user = await AuthService.getProfile();
  const groupQuery = query(
    collection(firestore, "groups"),
    where("admin_user_id", "==", user.uid)
  );

  const GroupSnap = await getDocs(groupQuery);
  const data: groupDataType[] = [];
  await GroupSnap.forEach((doc) => {
    const GroupAllData = doc.data();
    const GroupData = {
      id: doc.id,
      name: GroupAllData.name,
      group_image: GroupAllData.group_image,
      created_at: GroupAllData.created_at,
      admin_user_id: GroupAllData.admin_user_id,
      admin_user_name: GroupAllData.admin_user_name,
    };
    data.push(GroupData);
  });

  return data;
};

export default FirestoreService;
