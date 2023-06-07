import { FIREBASE_CONFIG } from "../../firebase-config";
import { initializeApp } from "@firebase/app";
import { addDoc, collection, getFirestore } from "firebase/firestore";
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

export default FirestoreService;
