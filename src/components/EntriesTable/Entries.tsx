import { Grid, Typography } from "@mui/material";
import { Entry } from "../../utils/types";
import { getDays, getHours, getWeekday } from "../../utils/utils";
import HourRow from "./HourRow";

interface Props {
  start: string;
  entries: Entry[];
  refetch: () => void;
}

export default function Entries({ start, entries, refetch }: Props) {
  const hours = getHours();
  const days = getDays(start);
  return (
    <Grid container columns={days.length * 2 + 1} spacing={1} minWidth={1000}>
      <Grid item xs={1} />
      {days.map((day) => (
        <Grid item xs={2} key={day}>
          <Typography>
            {getWeekday(day)},{" "}
            {new Date(day).toLocaleDateString(undefined, {
              day: "numeric",
              month: "short",
            })}
          </Typography>
        </Grid>
      ))}
      {hours.map((hour) => (
        <HourRow
          key={hour}
          entries={entries}
          hour={hour}
          days={days}
          refetch={refetch}
        />
      ))}
    </Grid>
  );
}
