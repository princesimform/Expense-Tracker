import { FIREBASE_CONFIG } from "../../../firebase-config";
import { initializeApp } from "@firebase/app";
import {
  addDoc,
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import AuthService from "./auth";
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
    data.push(doc.data());
  });
  return data;
};

export default FirestoreService;
