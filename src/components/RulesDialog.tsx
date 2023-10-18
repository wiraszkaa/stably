import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";

const rules = [
  "Jak ktoś ma  jakąś awarię i musi wejść na szóstego to trzeba koniecznie zapytać osoby jeżdżące czy nie mają z tym problemu.",
  "Jeśli będzie problem z dostępnością hali to proszę za każdym razem o informację do Ani",
  "BEZWZGLĘDNY ZAKAZ lążowania koni na hali",
  "Używamy tylko zaznaczonych świateł, górny rząd pierwsze, trzecie i ostatnie",
  "Ostatni gasi światlo i zamyka drzwi i jest za to odpowiedzialny ( w razie nocnej wichury lub burzy) oraz sprawdza czy jest czysto. Jeśli są kupy to dzwoni do Ani.",
  "Kupy sprzatajcie na bieżąco, nie na koniec jazdy żeby się nie porozjeżdżały, jak ktoś siedzi na ławce to zawsze można poprosić.",
  "Przy zauważeniu że poprzednik pozostawił kupy, proszę zdjęcie i na grupę, zawsze się znajdzie zapominalski 🤔",
  "Jak ktoś ma młodego albo wariata to proszę o zaznaczenie ostrzeżenia w tabeli żeby inni widzieli na co się piszą.",
  "Nie wolno zmieniać ustawionego parkuru, jest to bardzo niebezpieczne."
];

export default function RulesDialog() {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  return (
    <>
      <Button onClick={toggle} sx={{color: "white"}}>
        Regulamin
      </Button>
      <Dialog open={open} onClose={toggle}>
        <DialogTitle>Regulamin Hali</DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {rules.map((rule, index) => (
            <Typography key={index}>🐎 {rule}</Typography>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={toggle}>Zamknij</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
