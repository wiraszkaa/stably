import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  horse: string;
  setHorse: (horse?: string) => void;
  persist?: boolean;
}

export default function ChangeNameDialog({
  open,
  onClose,
  horse,
  setHorse,
  persist,
}: Props) {
  const [name, setName] = useState(horse);

  useEffect(() => setName(horse), [horse]);

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleConfirm = () => {
    setHorse(name.trim());
    onClose();
  };

  return (
    <Dialog open={open} onClose={persist ? undefined : onClose}>
      <DialogTitle>Wybierz imię konia</DialogTitle>
      <DialogContent sx={{ mt: 2 }}>
        <TextField
          placeholder="Imię konia"
          value={name}
          onChange={handleNameChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        {!persist && <Button onClick={onClose}>Anuluj</Button>}
        <Button onClick={handleConfirm} disabled={!name} variant="contained">
          Zmień
        </Button>
      </DialogActions>
    </Dialog>
  );
}
