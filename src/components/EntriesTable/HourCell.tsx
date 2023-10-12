import { Card, CardContent, IconButton } from "@mui/material";
import { Entry } from "../../utils/types";
import { useContext } from "react";
import { HorseContext } from "../../store/horse";
import AddIcon from "@mui/icons-material/Add";
import HorseName from "./HorseName";

interface Props {
  entries: Entry[];
  today: boolean;
  date: string;
  add: (entry: Entry) => void;
  refetch: () => void;
}

export default function HourCell({
  entries,
  today,
  date,
  add,
  refetch,
}: Props) {
  const { horse } = useContext(HorseContext);
  const isHorse = entries.findIndex((entry) => entry.horse === horse) !== -1;

  const handleAdd = () => add({ date, horse });

  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        background: `rgba(255,255,255,${today ? 1 : 0.9})`,
      }}
    >
      <CardContent>
        {entries.map((e) => (
          <HorseName key={e.id} horse={horse} entry={e} refetch={refetch} />
        ))}
        {!isHorse && (
          <IconButton onClick={handleAdd}>
            <AddIcon color="success" />
          </IconButton>
        )}
      </CardContent>
    </Card>
  );
}
