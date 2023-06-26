import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { groupDataType } from "../../../redux/groupSlice";
import { FirestoreServiceType, firestore } from "./firestore";

const COLLECTION_NAME = "groups";
const GroupFirestoreService: FirestoreServiceType = {};
GroupFirestoreService.addGroup = async (data: groupDataType) => {
  return new Promise((resolve, reject) => {
    addDoc(collection(firestore, COLLECTION_NAME), data)
      .then((res) => {
        resolve({
          status: true,
          message: "Data Added Successfully",
          data: res.id,
        });
      })
      .catch((err) => {
        resolve({ status: false, message: err });
      });
  });
};

GroupFirestoreService.updateGroup = async (data: any) => {
  return new Promise((resolve, reject) => {
    const docRef = doc(firestore, COLLECTION_NAME, data.id);
    updateDoc(docRef, data)
      .then((res) => {
        resolve({
          status: true,
          message: "Data Updated Successfully",
        });
      })
      .catch((error) => {
        console.log(error);
        resolve({
          status: true,
          message: "Something Went Wrong",
        });
      });
  });
};

// GroupFirestoreService.deleteGroup = async (data: groupDataType) => {
//   return new Promise((resolve, reject) => {
//     deleteDoc(doc(firestore, COLLECTION_NAME, data.id))
//       .then(() => {
//         resolve({
//           status: true,
//           message: "Group Deleted Successfully",
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//         resolve({
//           status: true,
//           message: "Something Went Wrong",
//         });
//       });
//   });
// };

GroupFirestoreService.getGroups = async (email: string) => {
  return new Promise((resolve, reject) => {
    console.log(email);
    const groupQuery = query(
      collection(firestore, "groups"),
      where("deleted_at", "==", ""),
      where("member_list", "array-contains", email)
    );
    let data: groupDataType[] = [];
    getDocs(groupQuery)
      .then((res) => {
        console.log(res);
        res.forEach((doc) => {
          const GroupAllData = doc.data();
          const GroupData = {
            id: doc.id,
            name: GroupAllData.name,
            group_image: GroupAllData.group_image,
            created_at: GroupAllData.created_at,
            admin_user_id: GroupAllData.admin_user_id,
            admin_user_name: GroupAllData.admin_user_name,
            member_list: GroupAllData.member_list,
            deleted_at: GroupAllData.deleted_at,
          };
          data.push(GroupData);
        });

        resolve({
          status: true,
          message: "Data Fetch Successfully",
          data: data,
        });
      })
      .catch((error) => {
        resolve({
          status: true,
          message: "Something Went Wrong",
        });
      });
  });
};
export default GroupFirestoreService;
