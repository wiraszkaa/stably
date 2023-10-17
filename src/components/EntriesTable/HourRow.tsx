import { Grid, Stack, Typography } from "@mui/material";
import { createDate, getHour, isTheSameDay } from "../../utils/utils";
import HourCell from "./HourCell";
import { Entry } from "../../utils/types";

const filterEntries = (entries: Entry[], date: string, hour: number): Entry[] =>
  entries.filter(
    (entry) => isTheSameDay(entry.date, date) && getHour(entry.date) === hour
  );

interface Props {
  entries: Entry[];
  hour: number;
  days: string[];
  add: (entry: Entry) => void;
  refetch: () => void;
}

export default function HourRow({ entries, hour, days, add, refetch }: Props) {
  return (
    <>
      <Grid item xs={1}>
        <Stack sx={{ borderTop: "1px solid white", p: 1 }}>
          <Typography variant="h5">{hour}</Typography>
        </Stack>
      </Grid>
      {days.map((day) => (
        <Grid item xs={2} key={day}>
          <HourCell
            entries={filterEntries(entries, day, hour)}
            today={isTheSameDay(new Date().toISOString(), day)}
            date={createDate(day, hour)}
            add={add}
            refetch={refetch}
          />
        </Grid>
      ))}
    </>
  );
}
