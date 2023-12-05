import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  LinearProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import useHTTP from "../../hooks/use-http";
import { addEntries } from "../../utils/api";
import { Entry } from "../../utils/types";
import HorseOptions from "./HorseOptions";

interface Props {
  entries: Entry[];
  onClose: () => void;
  refetch: () => void;
}

export default function EntryFormDialog({
  entries: startEntries,
  onClose,
  refetch,
}: Props) {
  const [entries, setEntries] = useState<Entry[]>(startEntries);
  const { sendRequest, state } = useHTTP(addEntries);

  useEffect(() => setEntries(startEntries), [startEntries]);

  useEffect(() => {
    if (state === "success") {
      refetch();
      onClose();
    }
  }, [state]);

  const handleEntryChange = (index: number, fn: (prev: Entry) => Entry) =>
    setEntries((prev) => [
      ...prev.map((entry, i) => (i === index ? fn(entry) : entry)),
    ]);

  const handleChange = () =>
    sendRequest(entries.filter((entry) => entry.checked));

  return (
    <Dialog open={!!startEntries.length}>
      {state === "loading" && <LinearProgress />}
      <DialogContent sx={{ mt: 2 }}>
        {entries.map((entry, index) => (
          <HorseOptions
            key={index}
            entry={entry}
            setEntry={(fn) => handleEntryChange(index, fn)}
          />
        ))}
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
