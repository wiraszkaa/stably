import { Card, CardContent, Divider, Stack, Typography } from "@mui/material";
import { Entry } from "../../utils/types";
import useHTTP from "../hooks/use-http";
import { addEntry, removeEntry } from "../../utils/api";
import HTTPButton from "../../UI/HTTPButton";
import { useContext, useEffect } from "react";
import { HorseContext } from "../../store/horse";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

interface Props {
  entries: Entry[];
  today: boolean;
  date: string;
  refetch: () => void;
}

export default function HourCell({ entries, today, date, refetch }: Props) {
  const { sendRequest: add, state: addingState } = useHTTP(addEntry);
  const { sendRequest: remove, state: removingState } = useHTTP(removeEntry);
  const { horse } = useContext(HorseContext);
  const isHorse = entries.findIndex((entry) => entry.horse === horse) !== -1;

  useEffect(() => {
    if (addingState === "success") refetch();
  }, [addingState]);

  useEffect(() => {
    if (removingState === "success") refetch();
  }, [removingState]);

  const handleAdd = () => add({ date, horse });

  return (
    <Card
      sx={{
        height: "100%",
        width: "100%",
        background: `rgba(255,255,255,${today ? 1 : 0.8})`,
      }}
    >
      <CardContent>
        {entries.map((e) => (
          <Stack key={e.id}>
            <Stack direction="row" alignItems="center">
              <Typography variant="body2">{e.horse}</Typography>
              {e.horse === horse && (
                <HTTPButton
                  state={removingState}
                  onClick={() => remove(e.id)}
                  icon={<RemoveIcon color="error" />}
                />
              )}
            </Stack>
            <Divider />
          </Stack>
        ))}
        {!isHorse && (
          <HTTPButton
            state={addingState}
            onClick={handleAdd}
            icon={<AddIcon color="success" />}
          />
        )}
      </CardContent>
    </Card>
  );
}
