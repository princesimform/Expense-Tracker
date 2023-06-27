import * as yup from "yup";
const FILE_SIZE = 200 * 1024;
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/gif", "image/png"];
const phoneRegExp = /^(\+91|0)?[6789]\d{9}$/;

export const AddGroupSchema = yup.object({
  name: yup.string().trim().required("Please enter Full Name"),
  group_image: yup
    .mixed()
    .nullable()
    .test("fileSize", "Filesize is too large", (value: any) => {
      if (value == null) return true;
      if (value != null) return value.size <= FILE_SIZE;
    })
    .test("fileFormat", "Unsupported Format", (value: any) => {
      if (value == null) return true;
      if (value != null) return value && SUPPORTED_FORMATS.includes(value.type);
    }),
});

export const RegistrationFormSchema = yup.object({
  full_name: yup.string().trim().required("Full name is required"),
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Enter valid email address"),
  password: yup
    .string()
    .trim()
    .required("Please enter Password")
    .min(8, "Password must be at least 8 characters long"),
  confirm_password: yup
    .string()
    .trim()
    .oneOf([yup.ref("password"), undefined], "Password must match")
    .required("confirm password require"),
  profile: yup.string(),
});

export const LoginFormSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Enter valid email address"),
  password: yup
    .string()
    .trim()
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
  title: yup.string().trim().required("reduired"),
  expense_description: yup.string().trim().required("reduired"),
  member_list: yup
    .array()
    .required("reduired")
    .min(1, "at least one member orgroup require"),
  expense_file: yup
    .mixed()
    .nullable()
    .test("fileSize", "Filesize is too large", (value: any) => {
      if (value == null) return true;
      if (value != null) return value.size <= FILE_SIZE;
    }),
  expense_amount: yup.number().required("reduired"),
  paid_by: yup.string().required("reduired"),
  expense_date: yup.date().required("Please select a date"),
});

export const SettleExpenseFormSchema = yup.object({
  settle_expense_type: yup.string().trim().required("required"),
});

export const ProfileUpdateFormSchema = yup.object({
  // profile_iamge: yup.string().trim().required("required"),
  displayName: yup.string().trim().required("required"),
  photoURL: yup
    .mixed()
    .nullable()
    .test("fileSize", "Filesize is too large", (value: any) => {
      if (typeof value == "string") return true;
      if (value != null) return value.size <= FILE_SIZE;
    })
    .test("fileFormat", "Unsupported Format", (value: any) => {
      if (typeof value == "string") return true;
      if (value != null) return value && SUPPORTED_FORMATS.includes(value.type);
    }),
  email: yup.string().trim().required("required"),
  phoneNumber: yup
    .string()
    .required("Mobile No is required")
    .matches(phoneRegExp, "Phone number is not valid"),
  city: yup.string().trim(),
  state: yup.string().trim(),
  country: yup.string().trim(),
  description: yup.string().trim(),
});
