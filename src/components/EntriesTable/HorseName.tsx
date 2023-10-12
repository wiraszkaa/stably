import { Box, Divider, Stack, Tooltip, Typography } from "@mui/material";
import { Entry } from "../../utils/types";
import HTTPButton from "../../UI/HTTPButton";
import useHTTP from "../../hooks/use-http";
import { removeEntry } from "../../utils/api";
import { useEffect } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import WarningIcon from "@mui/icons-material/Warning";
import TrainingIcon from "../../UI/TrainingIcon";

interface Props {
  entry: Entry;
  horse: string;
  refetch: () => void;
}

export default function HorseName({ entry, horse, refetch }: Props) {
  const { sendRequest: remove, state: removingState } = useHTTP(removeEntry);
  const minutes = new Date(entry.date).getMinutes();

  useEffect(() => {
    if (removingState === "success") refetch();
  }, [removingState]);

  return (
    <Box>
      <Stack direction="row" justifyContent="space-between">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          flexGrow={1}
          flexWrap="wrap"
          gap={{ xs: 0, xl: 1 }}
        >
          <Typography variant="body1" flexGrow={1}>
            {entry.horse}
          </Typography>
          {minutes !== 0 && (
            <Typography variant="body2">
              {String(minutes).padStart(2, "0")}
            </Typography>
          )}
          {entry.training && (
            <Tooltip title="Trening">
              <span>
                <TrainingIcon />
              </span>
            </Tooltip>
          )}
          {entry.warning && (
            <Tooltip title="Proszę uważać na tego konia!">
              <span>
                <WarningIcon color="warning" />
              </span>
            </Tooltip>
          )}
        </Stack>
        {entry.horse === horse && (
          <HTTPButton
            state={removingState}
            onClick={() => remove(entry.id)}
            icon={<RemoveIcon color="error" />}
          />
        )}
      </Stack>
      <Divider />
    </Box>
  );
}
