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
  onSnapshot,
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
  docData: groupDataType,
  collectionName: string
) => {
  const storage = getStorage();

  return new Promise((resolve, reject) => {
    const fileRef = ref(storage, docData.group_image);
    const docRef = doc(firestore, collectionName, docData.id);
    if (docData.group_image != "") {
      deleteObject(fileRef)
        .then(() => {
          deleteDoc(docRef)
            .then(() => {
              resolve({ status: true, message: "Deleted Successfully" });
            })
            .catch((error) => {
              resolve({ status: true, message: "Something Went Wrong" });
            });
        })
        .catch(() => {
          resolve({ status: true, message: "Something Went Wrong" });
        });
    } else {
      console.log("i am From ele deprt");

      deleteDoc(docRef)
        .then(() => {
          resolve({ status: true, message: "Deleted Successfully" });
        })
        .catch((error) => {
          resolve({ status: true, message: "Something Went Wrong" });
        });
    }
  });
};
FirestoreService!.getGroups = async () => {
  const user = await AuthService.getProfile();
  const groupQuery = query(
    collection(firestore, "groups"),
    where("admin_user_id", "==", user.uid)
  );
  let data: groupDataType[] = [];

  const GroupSnap = await getDocs(groupQuery);
  await GroupSnap.forEach((doc) => {
    const GroupAllData = doc.data();
    const GroupData = {
      id: doc.id,
      name: GroupAllData.name,
      group_image: GroupAllData.group_image,
      created_at: GroupAllData.created_at,
      admin_user_id: GroupAllData.admin_user_id,
      admin_user_name: GroupAllData.admin_user_name,
      member_list: GroupAllData.member_list,
    };
    data.push(GroupData);
  });

  // await onSnapshot(groupQuery, (querySnapshot) => {
  //   const data: groupDataType[] = [];
  //   querySnapshot.forEach((doc) => {
  //     const GroupAllData = doc.data();

  //     const GroupData = {
  //       id: GroupAllData.id,
  //       name: GroupAllData.name,
  //       group_image: GroupAllData.group_image,
  //       created_at: GroupAllData.created_at,
  //       admin_user_id: GroupAllData.admin_user_id,
  //       admin_user_name: GroupAllData.admin_user_name,
  //       member_list: GroupAllData.member_list,
  //     };
  //     data.push(GroupData);
  //   });

  //   Groupdata = data;
  // });

  return data;
  
};
export default FirestoreService;
