import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";
import { Entry } from "../../utils/types";
import { useContext } from "react";
import { HorseContext } from "../../store/horse";
import AddIcon from "@mui/icons-material/Add";
import HorseName from "./HorseName";

const compareDates = (f: Entry, s: Entry) => f.date.localeCompare(s.date);
const isTimeMark = (i: number, arr: Entry[]) =>
  i === 0
    ? new Date(arr[i].date).getMinutes() > 0
    : arr[i].date !== arr[i - 1]?.date;

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
  const isDate: boolean =
    entries.findIndex((e) => new Date(e.date).getMinutes()) !== -1;

  const handleAdd = () => add({ date, horse });

  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        background: `rgba(255,255,255,${today ? 1 : 0.9})`,
      }}
    >
      <CardContent sx={{ pl: isDate ? 4 : undefined }}>
        {entries.sort(compareDates).map((e, i, a) => (
          <Box key={e.id} position="relative">
            {isTimeMark(i, a) && (
              <Typography
                sx={{
                  position: "absolute",
                  left: -25,
                  top: 0,
                }}
              >
                {new Date(e.date).getMinutes()}
              </Typography>
            )}
            <HorseName horse={horse} entry={e} refetch={refetch} />
          </Box>
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
