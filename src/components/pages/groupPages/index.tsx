import { Button, TextField } from "@mui/material";
import { AsyncThunkAction, Dispatch } from "@reduxjs/toolkit";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { groupActions, setData } from "../../../store/groupSlice";
import AddGroup from "./AddGroup";

function Groups() {
  const dispatch = useDispatch();
  const reader = new FileReader();
  const date = new Date();
  const [form, setForm] = useState({
    name: { value: "" },
    group_image: { value: {} },
  });

  const creategroup = () => {
    console.log("i am creating group");
  };

  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let _form: any = { ...form };
    _form[e.currentTarget.name].value = e.currentTarget.value;
    setForm(_form);
  };
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let _form: any = { ...form };
    console.log(e.target.name);
    if (e.target.files && e.target.files[0]) {
      reader.addEventListener("load", function (event) {
        _form[e.target.name].value = JSON.stringify(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
    setForm(_form);
  };
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createdAtTime =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const req_data = { ...form, created_at: createdAtTime };
    dispatch(setData(req_data));
  };

  return (
    <div>
      <AddGroup />
    
    </div>
  );
}

export default Groups;
