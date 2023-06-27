import React from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { useField } from "formik";

interface DateTimePickerProps {
  name: string;
  label?: string;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  name,
  label,
  ...otherProps
}) => {
  const [field, meta] = useField(name);

  const configDateTimePicker: TextFieldProps = {
    ...field,
    ...otherProps,
    type: "date",
    variant: "outlined",
    fullWidth: true,
    InputLabelProps: {
      shrink: true,
    },
  };

  if (meta && meta.touched && meta.error) {
    configDateTimePicker.error = true;
    configDateTimePicker.helpertext = meta.error;
  }

  return <TextField {...configDateTimePicker} />;
};

export default DateTimePicker;
