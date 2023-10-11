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
  refetch: () => void;
}

export default function HourRow({ entries, hour, days, refetch }: Props) {
  return (
    <>
      <Grid
        item
        xs={1}
        component={Stack}
        justifyContent="center"
        alignItems="center"
      >
        <Typography>
          {hour} - {hour + 1}
        </Typography>
      </Grid>
      {days.map((day) => (
        <Grid item xs={2} key={day}>
          <HourCell
            entries={filterEntries(entries, day, hour)}
            today={isTheSameDay(new Date().toISOString(), day)}
            date={createDate(day, hour)}
            refetch={refetch}
          />
        </Grid>
      ))}
    </>
  );
}
