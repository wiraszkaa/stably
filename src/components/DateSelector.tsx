import { IconButton, Stack } from "@mui/material";
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface Props {
  date: string;
  days: number;
  onChange: (newValue: Dayjs | null) => void;
}

const style = {
  animation: "shrink 0.3s ease-in-out",
  "&:hover": {
    animation: "grow 0.3s ease-in-out",
    transform: "scale(1.3)",
  },
  "@keyframes grow": {
    from: {
      transfrom: "scale(1)",
    },
    to: {
      transform: "scale(1.3)",
    },
  },
  "@keyframes shrink": {
    from: {
      transform: "scale(1.3)",
    },
    to: {
      transform: "scale(1)",
    },
  },
};

export default function DateSelector({ date, days, onChange }: Props) {
  const goLeft = () => {
    onChange(dayjs(date).subtract(days, "day"));
  };

  const goRight = () => {
    onChange(dayjs(date).add(days, "day"));
  };

  return (
    <Stack direction="row">
      <IconButton size="large" onClick={goLeft} sx={style}>
        <ChevronLeftIcon sx={{ color: "white" }} />
      </IconButton>
      <MobileDatePicker
        value={dayjs(date)}
        onChange={onChange}
        label="Wybierz datę"
        format="DD.MM.YYYY"
        sx={{
          "& .MuiOutlinedInput-root": {
            color: "white",
          },
          "& .MuiInputLabel-root": {
            color: "white",
          },
          "& .MuiTextField-root": {
            color: "white",
          },
          "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "white",
          },
        }}
      />
      <IconButton size="large" onClick={goRight} sx={style}>
        <ChevronRightIcon sx={{ color: "white" }} />
      </IconButton>
    </Stack>
  );
}
