import * as yup from "yup";
const FILE_SIZE = 200 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
export const AddGroupSchema = yup.object({
  name: yup.string().required("Please enter Full Name"),
  group_image: yup
    .mixed()
    .test(
      "fileSize",
      "Filesize is too large",
      (value: any) => value.size <= FILE_SIZE
    )
    .test(
      "fileFormat",
      "Unsupported Format",
      (value: any) => { console.log(value);
       return value && SUPPORTED_FORMATS.includes(value.type)}
    ),
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

export const AddExpenseFormSchema = yup.object({
  title: yup.string().required("reduired"),
  expense_description: yup.string().required("reduired"),
  member_list: yup
    .array()
    .required("reduired")
    .min(1, "at least one member orgroup require"),
  // expense_file: yup,
  expense_amount: yup.number().required("reduired"),
  currency_type: yup.string().required("reduired"),
  paid_by: yup.string().required("reduired"),
  expense_date: yup.date().required("Please select a date"),
});
