import {
  Box,
  Card,
  CardContent,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Entry } from "../../utils/types";
import { useContext } from "react";
import { HorseContext } from "../../store/horse";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import HorseName from "./HorseName";

const compareDates = (f: Entry, s: Entry) => f.date.localeCompare(s.date);
const isTimeMark = (i: number, arr: Entry[]) =>
  i === 0
    ? new Date(arr[i].date).getMinutes() > 0
    : arr[i].date !== arr[i - 1]?.date;
const cellColor = (today: boolean, entries: number) => {
  const alpha = today ? 1 : 0.85;
  if (entries >= 6) return `rgba(255, 210, 210, ${alpha})`;
  if (entries >= 5) return `rgba(220, 255, 220, ${alpha})`;
  return `rgba(255,255,255,${alpha})`;
};

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
  const myEntry = entries.find((entry) => entry.horse === horse);
  const isDate: boolean =
    entries.findIndex((e) => new Date(e.date).getMinutes()) !== -1;

  const handleAdd = () => add({ date, horse });
  const handleModify = () => add(myEntry!);

  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        background: cellColor(today, entries.length),
      }}
    >
      <CardContent sx={{ pl: isDate ? 4 : undefined }}>
        {entries.sort(compareDates).map((e, i, a) => (
          <Box key={e.id} position="relative">
            {isTimeMark(i, a) && (
              <Tooltip title="Dokładny czas wejścia konia na halę">
                <Typography
                  sx={{
                    position: "absolute",
                    left: -25,
                    top: 0,
                  }}
                >
                  {new Date(e.date).getMinutes()}
                </Typography>
              </Tooltip>
            )}
            <HorseName horse={horse} entry={e} refetch={refetch} />
          </Box>
        ))}
        <Stack alignItems="center" ml={isDate ? -2 : 0}>
          {myEntry && (
            <Tooltip title="Modyfikuj zapis">
              <IconButton onClick={handleModify}>
                <EditIcon />
              </IconButton>
            </Tooltip>
          )}
          {!myEntry && (
            <Tooltip title="Dodaj zapis">
              <IconButton onClick={handleAdd}>
                <AddIcon color="success" />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}
