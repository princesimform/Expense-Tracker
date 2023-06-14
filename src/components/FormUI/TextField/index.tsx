import React from "react";
import { useField, FieldHookConfig } from "formik";
import { TextField, TextFieldProps } from "@mui/material";

interface TextfieldWrapperProps {
  name: string;
}

const TextfieldWrapper: React.FC<TextfieldWrapperProps> = ({
  name,
  ...otherProps
}) => {
  const [field, meta] = useField<string>(name);

  const configTextfield: TextFieldProps = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: "outlined",
    size: "small",
  };

  if (meta && meta.touched && meta.error) {
    configTextfield.error = true;
    configTextfield.helperText = meta.error;
  }

  return <TextField {...configTextfield} />;
};

export default TextfieldWrapper;
