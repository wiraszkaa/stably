import { CircularProgress, IconButton, IconButtonProps } from "@mui/material";
import { ReactElement, forwardRef, useEffect, useState } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import SuccessIcon from "@mui/icons-material/CheckCircle";

interface Props extends IconButtonProps {
  icon: ReactElement;
  state: string;
}

let timeout: number;

const HTTPButton = forwardRef<HTMLButtonElement, Props>(
  ({ icon: startIcon, state, ...rest }, ref) => {
    const [icon, setIcon] = useState(startIcon);

    useEffect(() => {
      if (state === "error") {
        setIcon(<ErrorIcon color="error" />);
        clearTimeout(timeout);
      } else if (state === "loading") {
        setIcon(<CircularProgress size={24} />);
        clearTimeout(timeout);
      } else if (state === "success") {
        setIcon(<SuccessIcon color="success" />);
        timeout = setTimeout(() => setIcon(startIcon), 1000);
      }
    }, [state]);

    return (
      <IconButton {...rest} ref={ref}>
        {icon}
      </IconButton>
    );
  }
);

export default HTTPButton;
