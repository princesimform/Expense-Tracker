import { FIREBASE_CONFIG } from "../../../firebase-config";
import { initializeApp } from "@firebase/app";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDoc,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import AuthService from "./auth";
import { groupDataType } from "../../../redux/groupSlice";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
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

FirestoreService!.getGroups = async () => {
  const user = await AuthService.getProfile();
  const groupQuery = query(
    collection(firestore, "groups"),
    where("admin_user_id", "==", user.uid)
  );

  const GroupSnap = await getDocs(groupQuery);
  const data: any = [];
  GroupSnap.forEach((doc) => {
    data.push({ data: doc.data(), id: doc.id });
  });
  return data;
};

export default FirestoreService;
