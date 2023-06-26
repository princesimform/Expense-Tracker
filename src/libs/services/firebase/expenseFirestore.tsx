import { async } from "@firebase/util";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { expenseDataType } from "../../../redux/expanseSlice";
import FirebaseFileHandling from "./fileHandling";
import { firestore, FirestoreServiceType } from "./firestore";

const ExpenseFirestoreService: FirestoreServiceType = {};

ExpenseFirestoreService.addFile = async (
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

ExpenseFirestoreService!.addExpenseToFirestore = async (
  data: expenseDataType,
  collectionName: string
) => {
  return new Promise((resolve, reject) => {
    setDoc(doc(firestore, collectionName, String(data.id)), data)
      .then(() => {
        resolve({
          status: true,
          message: "Data Added Successfully",
          // data: docref,
        });
      })
      .catch((err) => {
        resolve({ status: false, message: err });
      });
  });
};

ExpenseFirestoreService!.updateExpenseToFirestore = async (
  data: any,
  collectionName: string
) => {
  return new Promise(async (resolve, reject) => {
    const docRef = await doc(firestore, collectionName, String(data.id));
    updateDoc(docRef, data)
      .then((res) => {
        resolve({ status: true, message: "Data Update Successfully" });
      })
      .catch((err) => {
        resolve({ status: false, message: "Something went wrong" });
      });
  });
};

ExpenseFirestoreService!.getExpensesFromFirestore = async (
  email: string,
  collectionName: string
) => {
  return new Promise((resolve, reject) => {
    console.log(email);

    const getExpenseQuery = query(
      collection(firestore, collectionName),
      where("deleted_at", "==", ""),
      where("member_list", "array-contains", email)
    );

    let data: expenseDataType[] = [];

    getDocs(getExpenseQuery)
      .then((res) => {
        res.forEach((doc) => {
          const ExpensesData = doc.data();
          const ExpenseData = {
            id: ExpensesData.id,
            title: ExpensesData.title,
            expense_description: ExpensesData.expense_description,
            member_list: ExpensesData.member_list,
            expense_file_url: ExpensesData.expense_file_url,
            expense_amount: ExpensesData.expense_amount,
            paid_by: ExpensesData.paid_by,
            currency_type: ExpensesData.currency_type,
            expense_date: ExpensesData.expense_date,
            created_at: ExpensesData.created_at,
            isSettle: ExpensesData.isSettle,
            expense_file: ExpensesData.expense_file,
            group_list: ExpensesData.group_list,
            settleBy: ExpensesData.settleBy,
            deleted_at: ExpensesData.deleted_at,
            type_of_settle : ExpensesData.type_of_settle,
          };

          data.push(ExpenseData);
        });
        resolve({ status: true, data: data });
      })
      .catch((err) => {
        resolve({ status: false, data: undefined });
      });
  });
};


export default ExpenseFirestoreService;
