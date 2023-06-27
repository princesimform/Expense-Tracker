import React, { ChangeEvent } from "react";
// import { TextField, MenuItem, TextFieldProps } from '@material-ui/core';
import { TextField, MenuItem, TextFieldProps } from "@mui/material";
import { useField, useFormikContext } from "formik";

interface SelectWrapperProps {
  name: string;
  options: Record<string, string>;
  lable?: string;
  size?: string;
  defaultValue?: string;
}

const SelectWrapper: React.FC<SelectWrapperProps> = ({
  name,
  options,
  lable,
  size,
  defaultValue,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value } = evt.target;
    setFieldValue(name, value);
  };

  const configSelect: TextFieldProps = {
    ...field,
    ...otherProps,
    select: true,
    variant: "outlined",
    fullWidth: true,
    label: lable,
    size: "small",
    defaultValue: defaultValue,
    onChange: handleChange,
  };

  if (meta && meta.touched && meta.error) {
    configSelect.error = true;
    configSelect.helpertext = meta.error;
  }

  return (
    <TextField {...configSelect}>
      {Object.keys(options).map((item, pos) => {
        return (
          <MenuItem key={pos} value={item}>
            {options[item]}
          </MenuItem>
        );
      })}
    </TextField>
  );
};

export default SelectWrapper;
