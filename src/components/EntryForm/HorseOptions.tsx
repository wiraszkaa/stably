import {
  Card,
  Checkbox,
  IconButton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { MobileTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";
import TimeTextField from "../TimeTextField";
import InsertCommentIcon from "@mui/icons-material/InsertComment";
import CommentsDisabledIcon from "@mui/icons-material/CommentsDisabled";
import ObstacleIcon from "../../UI/ObstacleIcon";
import WarningIcon from "@mui/icons-material/Warning";
import WarningOffIcon from "@mui/icons-material/WarningAmberOutlined";
import { useState } from "react";
import { Entry, Training } from "../../utils/types";
import PenguinIcon from "../../UI/PenguinIcon";

interface Props {
  entry: Entry | undefined;
  setEntry: React.Dispatch<React.SetStateAction<Entry | undefined>>;
}

export default function HorseOptions({ entry, setEntry }: Props) {
  const [comment, setComment] = useState(false);

  const handleTime = (v: Dayjs | null) =>
    setEntry((prev) => ({ ...prev!, date: v?.toISOString() || prev!.date }));
  const handleJumping = () =>
    setEntry((prev) => ({
      ...prev!,
      training:
        prev?.training === Training.JUMPING ? undefined : Training.JUMPING,
    }));
  const handleDressage = () =>
    setEntry((prev) => ({
      ...prev!,
      training:
        prev?.training === Training.DRESSAGE ? undefined : Training.DRESSAGE,
    }));
  const handleWarning = (_: any, v: boolean) =>
    setEntry((prev) => ({ ...prev!, warning: v }));
  const handleComment = (e: any) =>
    setEntry((prev) => ({ ...prev!, comment: e.target.value }));
  const toggleComment = () =>
    setComment((prev) => {
      if (prev) setEntry((prev) => ({ ...prev!, comment: undefined }));
      return !prev;
    });

  if (!entry) return null;

  return (
    <Stack gap={1}>
      <Stack direction="row" alignItems="center" gap={1}>
        <Typography fontWeight="bold" flexGrow={1}>
          {entry.horse.slice(0, 10)}
        </Typography>

        <Card sx={{ py: 1, px: 0.5 }}>
          <Tooltip title="Wybierz dokładny czas wejścia na halę">
            <span>
              <MobileTimePicker
                value={dayjs(entry.date)}
                onChange={handleTime}
                openTo="minutes"
                views={["minutes"]}
                format="mm[ min]"
                minutesStep={5}
                slots={{
                  textField: TimeTextField,
                }}
              />
            </span>
          </Tooltip>
        </Card>

        <Card sx={{ py: 0.5 }}>
          <IconButton
            sx={{
              border:
                entry.training === Training.JUMPING
                  ? "1px solid black"
                  : undefined,
            }}
            onClick={handleJumping}
          >
            <ObstacleIcon />
          </IconButton>
          <IconButton
            sx={{
              border:
                entry.training === Training.DRESSAGE
                  ? "1px solid black"
                  : undefined,
            }}
            onClick={handleDressage}
          >
            <PenguinIcon />
          </IconButton>
        </Card>

        <Card sx={{ py: 0.5 }}>
          <Tooltip title="Czy trzeba uważać na tego konia?">
            <Checkbox
              value={entry.warning}
              onChange={handleWarning}
              checkedIcon={<WarningIcon color="warning" />}
              icon={<WarningOffIcon />}
            />
          </Tooltip>
        </Card>

        <Card sx={{ py: 0.5 }}>
          <Tooltip title={comment ? "Usuń komentarz" : "Dodaj komentarz"}>
            <IconButton onClick={toggleComment}>
              {comment ? <CommentsDisabledIcon /> : <InsertCommentIcon />}
            </IconButton>
          </Tooltip>
        </Card>
      </Stack>
      {comment && (
        <TextField
          placeholder="Wpisz komentarz"
          value={entry.comment || ""}
          onChange={handleComment}
        />
      )}
    </Stack>
  );
}
