import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  LinearProgress,
  Stack,
  Switch,
  Tooltip,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import useHTTP from "../hooks/use-http";
import { addEntry } from "../utils/api";
import { Entry } from "../utils/types";
import TrainingIcon from "../UI/TrainingIcon";
import WarningIcon from "@mui/icons-material/Warning";
import { MobileTimePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

interface Props {
  entry?: Entry;
  onClose: () => void;
  refetch: () => void;
}

export default function EntryFormDialog({
  entry: startEntry,
  onClose,
  refetch,
}: Props) {
  const [entry, setEntry] = useState<Entry | undefined>(startEntry);
  const { sendRequest, state } = useHTTP(addEntry);

  useEffect(() => setEntry(startEntry), [startEntry]);

  useEffect(() => {
    if (state === "success") {
      refetch();
      onClose();
    }
  }, [state]);

  const handleTime = (v: Dayjs | null) =>
    setEntry((prev) => ({ ...prev!, date: v?.toISOString() || prev!.date }));
  const handleTraining = (_: any, v: boolean) =>
    setEntry((prev) => ({ ...prev!, training: v }));
  const handleWarning = (_: any, v: boolean) =>
    setEntry((prev) => ({ ...prev!, warning: v }));
  const handleChange = () => sendRequest(entry);

  return (
    <Dialog open={!!startEntry} maxWidth="xs" fullWidth>
      {state === "loading" && <LinearProgress />}
      {entry && (
        <DialogContent sx={{ mt: 2 }}>
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography fontWeight="bold" flexGrow={1}>
              {entry.horse}
            </Typography>
            <Tooltip title="Wybierz dokładny czas wejścia na halę">
              <span>
                <MobileTimePicker
                  value={dayjs(entry.date)}
                  onChange={handleTime}
                  openTo="minutes"
                  views={["minutes"]}
                  format="mm[ min]"
                />
              </span>
            </Tooltip>
            <Tooltip title="Czy koń będzie miał trening?">
              <FormControlLabel
                control={
                  <Switch checked={entry.training} onChange={handleTraining} />
                }
                label={<TrainingIcon />}
              />
            </Tooltip>
            <Tooltip title="Czy trzeba uważać na tego konia?">
              <FormControlLabel
                control={
                  <Switch checked={entry.warning} onChange={handleWarning} />
                }
                label={<WarningIcon color="warning" />}
              />
            </Tooltip>
          </Stack>
        </DialogContent>
      )}
      <DialogActions>
        <Button onClick={onClose}>Anuluj</Button>
        <Button variant="contained" onClick={handleChange}>
          Zapisz się
        </Button>
      </DialogActions>
    </Dialog>
  );
}
