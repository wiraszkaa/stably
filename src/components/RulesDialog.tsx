import {
  BottomNavigation,
  BottomNavigationAction,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useState } from "react";
import RuleIcon from "@mui/icons-material/Rule";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";

const appRules = [
  "Przy zapisie młodego lub niebezpiecznego konia - zaznacza się ikonkę zagrożenia.",
  "Przy zapisie na trening skokowy - zaznacza się ikonę przeszkody.",
  "Przy zapisie na trening ujeżdzeniowy - zaznacza się ikonę pingwina.",
  "Przy zapisie można dodać komentarz klikając w ikonę komentarza.",
  "Zielony kolor - nie ma miejsc wolnych.",
  "Czerwony kolor - nadmiarowe konie",
];

const rules = [
  "Zapis szóstego konia na halę jest możliwy tylko po uzgodnieniu z resztą zapisanych osób.",
  "Jeśli wyniknie problem z dostępnością hali, należy kontaktować się z Anią.",
  "BEZWZGLĘDNY ZAKAZ lonżowania koni na hali.",
  "Dozwolone jest używanie tylko zaznaczonych świateł, górny rząd pierwsze, trzecie i ostatnie.",
  "Ostatnia osoba na hali jest odpowiedzialna za zgaszenie światła, zamknięcie drzwi ( w razie nocnej wichury lub burzy) oraz sprawdzenie czy jest czysto. Jeśli są kupy to należy zadzwonić do Ani.",
  "Kupy powinno sprzątać się na bieżąco, nie na koniec jazdy żeby się nie porozjeżdżały. Jeśli ktoś siedzi na ławce to zawsze można poprosić.",
  "Przy zauważeniu że poprzednik pozostawił kupy, powinno wysłać się zdjęcie na grupę. Zawsze się znajdzie osoba, która mogła zapomnieć.",
  "Nie wolno zmieniać ustawionego parkuru, jest to bardzo niebezpieczne.",
];

export default function RulesDialog() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(0);

  const toggle = () => setOpen((prev) => !prev);

  return (
    <>
      <Button onClick={toggle} sx={{ color: "white" }}>
        Regulamin
      </Button>
      <Dialog open={open} onClose={toggle}>
        <DialogTitle>
          <BottomNavigation
            showLabels
            value={value}
            onChange={(_, newValue) => {
              setValue(newValue);
            }}
          >
            <BottomNavigationAction
              label="Regulamin Hali"
              icon={<RuleIcon />}
            />
            <BottomNavigationAction
              label="Zasady Aplikacji"
              icon={<LaptopMacIcon />}
            />
          </BottomNavigation>
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {!value &&
            rules.map((rule, index) => (
              <Typography key={index}>🐎 {rule}</Typography>
            ))}
            {value &&
            appRules.map((rule, index) => (
              <Typography key={index}>○ {rule}</Typography>
            ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={toggle}>Zamknij</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
