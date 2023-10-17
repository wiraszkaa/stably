import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { forwardRef } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const TimeTextField = forwardRef<HTMLDivElement, TextFieldProps>(
  (props, ref) => {
    return (
      <TextField
        {...props}
        ref={ref}
        sx={{ maxWidth: 85 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccessTimeIcon />
            </InputAdornment>
          ),
        }}
        variant="standard"
      />
    );
  }
);

export default TimeTextField;
