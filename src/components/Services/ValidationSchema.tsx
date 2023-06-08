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
