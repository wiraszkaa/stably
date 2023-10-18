import {
  InputAdornment,
  TextField,
  TextFieldProps,
  Tooltip,
} from "@mui/material";
import { forwardRef } from "react";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const TimeTextField = forwardRef<HTMLDivElement, TextFieldProps>(
  (props, ref) => {
    return (
      <Tooltip title="Wybierz dokładny czas wejścia na halę">
        <TextField
          {...props}
          ref={ref}
          sx={{ maxWidth: 85 }}
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccessTimeIcon />
              </InputAdornment>
            ),
          }}
          variant="standard"
        />
      </Tooltip>
    );
  }
);

export default TimeTextField;
