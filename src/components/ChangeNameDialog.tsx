import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  horses: string[];
  setHorses: (horses?: string[]) => void;
  persist?: boolean;
}

export default function ChangeNameDialog({
  open,
  onClose,
  horses,
  setHorses,
  persist,
}: Props) {
  const [names, setNames] = useState(horses || [""]);

  useEffect(() => setNames([...horses, ""]), [horses, open]);

  const handleNameChange = (value: string, index: number) => {
    setNames((prev) => {
      const result = [...prev];
      result[index] = value.trim();
      return [...result.filter((x) => !!x), ""];
    });
  };

  const handleConfirm = () => {
    setHorses(names.filter((x) => !!x));
    onClose();
  };

  return (
    <Dialog open={open} onClose={persist ? undefined : onClose}>
      <DialogTitle>Wybierz imię konia</DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <Stack gap={1}>
          {names.map((name, index) => (
            <TextField
              key={index}
              placeholder="Imię konia"
              value={name}
              onChange={(event) => handleNameChange(event.target.value, index)}
              fullWidth
            />
          ))}
        </Stack>
      </DialogContent>
      <DialogActions>
        {!persist && <Button onClick={onClose}>Anuluj</Button>}
        <Button
          onClick={handleConfirm}
          disabled={!names[0]}
          variant="contained"
        >
          Zmień
        </Button>
      </DialogActions>
    </Dialog>
  );
}
