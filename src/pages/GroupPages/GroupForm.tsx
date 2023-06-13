import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Avatar,
  Backdrop,
  Box,
  Button,
  Fade,
  InputLabel,
  Modal,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import {
  getGroups,
  groupDataType,
  setData,
  updateData,
} from "../../redux/groupSlice";
import AddGroupImg from "./../../assets/add_group.png";
import { Field, Form, Formik } from "formik";
import { AddGroupSchema } from "../../libs/services/ValidationSchema";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import AuthService from "../../libs/services/firebase/auth";
import useToggle from "../../customHooks/useToggle";
import { GeneralPropType } from "../../routes/AuthRoutes";
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
interface PropsType extends GeneralPropType {
  groupData?: groupDataType;
}

function GroupForm({ groupData, userData }: PropsType) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const reader = new FileReader();
  const date = new Date();
  const [toggles, toggle] = useToggle({
    isModleOpen: false,
  });
  const [hasOldIamge, setHasOldIamge] = useState<boolean>(
    groupData ? true : false
  );
  const buttonValue = groupData ? "Update" : "Create";
  const [GroupProfileimage, setgroupProfileimage] = useState<string>("");
  const [initalValues, setInitalValues] = useState({
    name: "",
    group_image: "",
  });

  useEffect(() => {
    if (groupData) {
      setInitalValues({
        name: groupData.name,
        group_image: "",
      }),
        setgroupProfileimage(groupData.group_image);
      // initalValues.group_image = groupData.group_image;
    }
  }, []);

  const handleFileInputChange = (
    e: ChangeEvent<HTMLInputElement>,
    setFieldValue: Function
  ) => {
    if (e.target.files && e.target.files[0]) {
      reader.addEventListener("load", function (event) {
        console.log(reader.result);
        setHasOldIamge(false);
        setgroupProfileimage(JSON.stringify(reader.result));
      });
      reader.readAsDataURL(e.target.files[0]);
      setFieldValue("group_image", e.target.files[0]);
    }
  };

  const handleSubmit = async (values: formDataType) => {
    if (groupData) {
      const NewData = JSON.parse(JSON.stringify(groupData));
      NewData.name = values.name;
      NewData.group_image = values.group_image;
      console.log(NewData);
      try {
        const dataId = await dispatch(updateData(NewData));
        enqueueSnackbar(`Group Updated successfully ${dataId.payload.docId}`, {
          variant: "success",
          autoHideDuration: 3000,
        });
        toggle("isModleOpen");
        dispatch(getGroups());
      } catch (error) {}
    } else {
      const userData = await AuthService.getProfile();
      const createdAtTime =
        date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
      const req_data: groupDataType = {
        id: "",
        name: values.name,
        group_image: values.group_image,
        admin_user_id: userData.uid,
        admin_user_name: userData.displayName,
        created_at: createdAtTime,
        member_list: [`${userData?.email}`],
      };
      try {
        const dataId = await dispatch(setData(req_data));
        enqueueSnackbar(`Group Created successfully ${dataId.payload.docId}`, {
          variant: "success",
          autoHideDuration: 3000,
        });
        toggle("isModleOpen");
        dispatch(getGroups());
        navigate(`/group`);
      } catch (error) {
        enqueueSnackbar(`Something Went Wrong`, {
          variant: "error",
          autoHideDuration: 3000,
        });
      }
    }
  };

  return (
    <>
      <Button onClick={() => toggle("isModleOpen")}>{buttonValue}</Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={toggles.isModleOpen}
        // onClose={handleModleToggle}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={toggles.isModleOpen}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h5"
              sx={{ textAlign: "center", mb: 2 }}
              component="h2"
            >
              {groupData ? "Update Group" : "Create Group"}
            </Typography>

            <Formik
              initialValues={initalValues}
              onSubmit={handleSubmit}
              validationSchema={AddGroupSchema}
              validateOnMount
            >
              {({ handleSubmit, errors, isValid, touched, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                  <InputLabel
                    htmlFor="group-image"
                    className="m-auto flex w-fit text-center"
                    sx={{ mb: 2 }}
                  >
                    <Field
                      style={{ display: "none" }}
                      id="group-image"
                      name="group_image"
                      type="file"
                      value={undefined}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        handleFileInputChange(event, setFieldValue)
                      }
                    />
                    <Avatar
                      alt="Remy Sharp"
                      src={
                        GroupProfileimage
                          ? hasOldIamge
                            ? GroupProfileimage
                            : JSON.parse(GroupProfileimage)
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
                  <Field
                    name="name"
                    type="text"
                    variant="outlined"
                    color="primary"
                    label="Full Name"
                    fullWidth
                    sx={{ mb: 2 }}
                    as={TextField}
                    error={Boolean(errors.name) && Boolean(touched.name)}
                    helperText={Boolean(touched.name) && errors.name}
                  />

                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    {groupData ? (
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={!isValid}
                      >
                        {buttonValue}
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={!isValid}
                      >
                        Create Group
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      onClick={() => toggle("isModleOpen")}
                    >
                      Cancle
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </Fade>
      </Modal>
    </>
  );
}

export default GroupForm;
