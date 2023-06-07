import { createSlice } from "@reduxjs/toolkit";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import { FIREBASE_CONFIG } from "../firebase-config";
import { initializeApp } from "@firebase/app";
const firebase = initializeApp(FIREBASE_CONFIG);
const db = getFirestore(firebase);

const groupFirestoreSlice = createSlice({
  name: "groupFirestore",
  initialState: {},
  reducers: {
    setData: (state, action) => {
      setDoc(doc(db, "groups", "sdfjg"), action.payload);
    },
  },
});
