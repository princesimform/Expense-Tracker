import * as yup from "yup";

const SUPPORTED_FORMATS = ["image/jpeg", "image/jpg", "image/png"];
export const AddGroupSchema = yup.object({
  name: yup.string().required("Please enter Full Name"),
  group_image: yup.mixed(),
  // .notRequired()
  // .test(
  //   "fileFormat",
  //   "Unsupported Format",
  //   (value: yup.AnyObject) => value && SUPPORTED_FORMATS.includes(value.type)
  // ),
  // .test(
  //   "fileSize",
  //   "File more than 0.5 MB not Allowed",
  //   (value: yup.AnyObject) => value && value.size <= 524288
  // )
});

export const RegistrationFormSchema = yup.object({
  full_name: yup.string().required("Full name is required"),
  email: yup
    .string()
    .required("Email is required")
    .email("Enter valid email address"),
  password: yup
    .string()
    .required("Please enter Password")
    .min(8, "Password must be at least 8 characters long"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Password must match")
    .required("confirm password require"),
  profile: yup.string(),
});

export const LoginFormSchema = yup.object({
  email: yup
    .string()
    .required("Email is required")
    .email("Enter valid email address"),
  password: yup
    .string()
    .required("Please enter Password")
    .min(8, "Password must be at least 8 characters long"),
});

export const AddMemberFormSchema = yup.object({
  new_member: yup
    .string()
    .required("Email is required")
    .email("Enter valid email address"),
});
