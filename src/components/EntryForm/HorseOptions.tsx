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
import { useEffect, useState } from "react";
import { Entry, Training } from "../../utils/types";
import PenguinIcon from "../../UI/PenguinIcon";

interface Props {
  entry: Entry | undefined;
  setEntry: React.Dispatch<React.SetStateAction<Entry | undefined>>;
}

export default function HorseOptions({ entry, setEntry }: Props) {
  const [comment, setComment] = useState(!!entry?.comment);

  useEffect(() => {
    if (entry?.comment) setComment(true);
  }, [entry]);

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
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        gap={1}
        flexWrap="wrap"
      >
        <Tooltip title={entry.horse.length > 10 ? entry.horse : ""}>
          <Typography
            fontWeight="bold"
            flexGrow={1}
            width={{ xs: "100%", sm: "fit-content" }}
          >
            {entry.horse.slice(0, 10)}
          </Typography>
        </Tooltip>

        <Card sx={{ py: 1.3, px: 0.5 }}>
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
        </Card>

        <Card sx={{ py: 1 }}>
          <Tooltip title="Czy koń będzie miał trening skokowy?">
            <IconButton
              sx={{
                border:
                  entry.training === Training.JUMPING
                    ? "1px solid black"
                    : undefined,
              }}
              size="small"
              onClick={handleJumping}
            >
              <ObstacleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Czy koń będzie miał trening ujeżdzeniowy?">
            <IconButton
              sx={{
                border:
                  entry.training === Training.DRESSAGE
                    ? "1px solid black"
                    : undefined,
              }}
              size="small"
              onClick={handleDressage}
            >
              <PenguinIcon />
            </IconButton>
          </Tooltip>
        </Card>

        <Card sx={{ py: 0.8 }}>
          <Tooltip title="Czy trzeba uważać na tego konia?">
            <Checkbox
              checked={entry.warning}
              onChange={handleWarning}
              checkedIcon={<WarningIcon color="warning" />}
              size="small"
              icon={<WarningOffIcon />}
            />
          </Tooltip>
        </Card>

        <Card sx={{ py: 1 }}>
          <Tooltip title={comment ? "Usuń komentarz" : "Dodaj komentarz"}>
            <IconButton size="small" onClick={toggleComment}>
              {comment ? <CommentsDisabledIcon /> : <InsertCommentIcon />}
            </IconButton>
          </Tooltip>
        </Card>
      </Stack>
      {comment && (
        <TextField
          focused={true}
          placeholder="Wpisz komentarz"
          value={entry.comment || ""}
          onChange={handleComment}
        />
      )}
    </Stack>
  );
}
