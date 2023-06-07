import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Fade,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setData } from "../../../store/groupSlice";
import AddGroupImg from "./../../../assets/add_group.png";
import { Field, Formik } from "formik";
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};
interface formDataType {
  name: string;
  group_image: string;
}

const initalValues: formDataType = {
  name: "",
  group_image: "",
};

function AddGroup() {
  const [isModleOpen, setIsModleOpen] = useState(false);
  const dispatch = useDispatch();
  const reader = new FileReader();
  const date = new Date();
  const [form, setForm] = useState({
    name: "",
    group_image: "",
  });

  const [GroupProfileimage, setgroupProfileimage] = useState<string>("");

  const handleModleToggle = () => {
    setIsModleOpen((prevState) => !prevState);
  };
  const handleTextInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let _form: any = { ...form };
    _form[e.currentTarget.name] = e.currentTarget.value;
    setForm(_form);
  };
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    let _form: any = { ...form };
    console.log(e.target.name);
    console.log(_form);
    if (e.target.files && e.target.files[0]) {
      reader.addEventListener("load", function (event) {
        _form[e.target.name].value = JSON.stringify(reader.result);
        console.log(_form);
        setgroupProfileimage(JSON.stringify(reader.result));
      });
      reader.readAsDataURL(e.target.files[0]);
    }
    setForm(_form);
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const createdAtTime =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const req_data = { ...form, created_at: createdAtTime };
    try {
      await dispatch(setData(req_data));
      handleModleToggle();
    } catch (error) {
      console.log(error);
    }
  };
  const handleSubmitFormik = (values: formDataType) => {};
  return (
    <>
      <Button onClick={handleModleToggle}>Opan Modal</Button>
      <Modal
        aria-labelledby='transition-modal-title'
        aria-describedby='transition-modal-description'
        open={isModleOpen}
        // onClose={handleModleToggle}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isModleOpen}>
          <Box sx={style}>
            <Typography
              id='transition-modal-title'
              variant='h5'
              sx={{ textAlign: "center", mb: 2 }}
              component='h2'
            >
              Create Group
            </Typography>

            <Box></Box>

            <form onSubmit={handleSubmit}>
              <InputLabel
                htmlFor='group-image'
                className='m-auto flex w-fit text-center'
                sx={{ mb: 2 }}
              >
                <input
                  style={{ display: "none" }}
                  id='group-image'
                  name='group_image'
                  type='file'
                  onChange={handleFileInputChange}
                />
                <Avatar
                  alt='Remy Sharp'
                  src={
                    GroupProfileimage
                      ? JSON.parse(GroupProfileimage)
                      : AddGroupImg
                  }
                  sx={{
                    width: 100,
                    height: 100,
                    borderWidth: 2,
                    borderColor: "primary",
                  }}
                />
              </InputLabel>

              <TextField
                fullWidth
                id='outlined-basic'
                margin='dense'
                label='Group Name'
                variant='outlined'
                name='name'
                autoFocus
                onChange={handleTextInputChange}
                sx={{ mb: 2 }}
                size='small'
              />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button type='submit' variant='contained'>
                  Create Group
                </Button>
                <Button variant='contained' onClick={handleModleToggle}>
                  Cancle
                </Button>
              </Box>
            </form>
          </Box>
        </Fade>
      </Modal>

      <Formik
        initialValues={initalValues}
        onSubmit={handleSubmitFormik}
        component='form'
      >
        <Field
          component={TextField}
          name='name'
          label='Name'
          fullWidth
          margin='normal'
        />
        <Field
          component={TextField}
          name='group_image'
          label='Email'
          fullWidth
          margin='normal'
        />
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
      </Formik>
    </>
  );
}

export default AddGroup;
