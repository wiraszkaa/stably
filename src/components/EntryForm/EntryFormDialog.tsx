import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  LinearProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import useHTTP from "../../hooks/use-http";
import { addEntry } from "../../utils/api";
import { Entry } from "../../utils/types";
import HorseOptions from "./HorseOptions";

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

  const handleChange = () => sendRequest(entry);

  return (
    <Dialog open={!!startEntry}>
      {state === "loading" && <LinearProgress />}
      <DialogContent sx={{ mt: 2 }}>
        <HorseOptions entry={entry} setEntry={setEntry} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Anuluj</Button>
        <Button variant="contained" onClick={handleChange}>
          Zapisz się
        </Button>
      </DialogActions>
    </Dialog>
  );
}
