import { Box, Divider, Stack, Tooltip, Typography } from "@mui/material";
import { Entry, Training } from "../../utils/types";
import HTTPButton from "../../UI/HTTPButton";
import useHTTP from "../../hooks/use-http";
import { removeEntry } from "../../utils/api";
import { useEffect } from "react";
import RemoveIcon from "@mui/icons-material/Remove";
import WarningIcon from "@mui/icons-material/Warning";
import ObstacleIcon from "../../UI/ObstacleIcon";
import PenguinIcon from "../../UI/PenguinIcon";

interface Props {
  entry: Entry;
  horse: string;
  refetch: () => void;
}

export default function HorseName({ entry, horse, refetch }: Props) {
  const { sendRequest: remove, state: removingState } = useHTTP(removeEntry);

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
            {entry.comment && ` (${entry.comment})`}
          </Typography>
          {entry.training && (
            <Tooltip
              title={`Trening ${
                entry.training === Training.DRESSAGE
                  ? "Ujeżdzeniowy"
                  : "Skokowy"
              }`}
            >
              <span style={{ height: "24px" }}>
                {entry.training === Training.DRESSAGE ? (
                  <PenguinIcon />
                ) : (
                  <ObstacleIcon />
                )}
              </span>
            </Tooltip>
          )}
          {entry.warning && (
            <Tooltip title="Proszę uważać na tego konia!">
              <span style={{ height: "24px" }}>
                <WarningIcon color="warning" />
              </span>
            </Tooltip>
          )}
        </Stack>
        {entry.horse === horse && (
          <Tooltip title="Usuń zapis">
            <HTTPButton
              sx={{ p: 0 }}
              state={removingState}
              onClick={() => remove(entry.id)}
              icon={<RemoveIcon color="error" />}
            />
          </Tooltip>
        )}
      </Stack>
      <Divider />
    </Box>
  );
}
