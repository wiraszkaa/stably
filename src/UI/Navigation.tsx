import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import { useContext, useState } from "react";
import { HorseContext } from "../store/horse";
import ChangeNameDialog from "../components/ChangeNameDialog";
import RulesDialog from "../components/RulesDialog";

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const { horses, setHorses } = useContext(HorseContext);

  const toggle = () => setOpen((prev) => !prev);

  return (
    <>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" letterSpacing="1rem" sx={{ flexGrow: 1 }}>
            HALA
          </Typography>
          <RulesDialog />
          <Button variant="contained" onClick={toggle}>
            {horses[0] || "Dodaj Konia"}
          </Button>
        </Toolbar>
      </AppBar>
      <ChangeNameDialog
        open={open}
        onClose={toggle}
        horses={horses}
        setHorses={setHorses}
      />
    </>
  );
}
