import { Box, CircularProgress, Stack } from "@mui/material";
import Layout from "./UI/Layout";
import Entries from "./components/EntriesTable/Entries";
import { useEffect, useState } from "react";
import useHTTP from "./components/hooks/use-http";
import { getEntries } from "./utils/api";
import { MobileDatePicker } from "@mui/x-date-pickers";
import dayjs, { Dayjs } from "dayjs";

function App() {
  const [start, setStart] = useState(new Date().toISOString());
  const { sendRequest, state, data } = useHTTP(getEntries);

  useEffect(() => {
    sendRequest();
  }, []);

  const handleChange = (newValue: Dayjs | null) =>
    setStart(newValue?.toISOString() || new Date().toISOString());

  return (
    <Layout>
      {state === "loading" && (
        <Stack
          width="100%"
          height="100%"
          position="absolute"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress size={100} />
        </Stack>
      )}
      <Stack alignItems="center" gap={3} mx={{ xs: 2, md: 10 }} mt={2}>
        {data && (
          <MobileDatePicker
            value={dayjs(start)}
            onChange={handleChange}
            label="Wybierz datę"
            format="DD.MM.YYYY"
          />
        )}
        {data && (
          <Box width="100%" overflow="auto">
            <Entries start={start} entries={data} refetch={sendRequest} />
          </Box>
        )}
      </Stack>
    </Layout>
  );
}

export default App;
