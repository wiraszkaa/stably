import { Box, CircularProgress, Stack } from "@mui/material";
import Layout from "./UI/Layout";
import Entries from "./components/EntriesTable/Entries";
import { useEffect, useState } from "react";
import useHTTP from "./hooks/use-http";
import { getEntries } from "./utils/api";
import { Dayjs } from "dayjs";
import DateSelector from "./components/DateSelector";
import { DAYS } from "./utils/constants";

function App() {
  const [start, setStart] = useState(new Date().toISOString());
  const { sendRequest, state, data } = useHTTP(getEntries);
  const days = parseInt(import.meta.env.VITE_DAYS || DAYS);

  useEffect(() => {
    sendRequest();
  }, []);

  const handleChange = (newValue: Dayjs | null) =>
    setStart(newValue?.toISOString() || new Date().toISOString());

  return (
    <Layout>
      {state === "loading" && (
        <Stack
          width="100vw"
          height="100vh"
          position="fixed"
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress size={100} />
        </Stack>
      )}
      <Stack alignItems="center" gap={3} mx={{ xs: 2, md: 10 }} mt={2}>
        <DateSelector date={start} onChange={handleChange} days={days} />
        <Box width="100%" overflow="auto">
          <Entries
            start={start}
            entries={data || []}
            refetch={sendRequest}
            days={days}
          />
        </Box>
      </Stack>
    </Layout>
  );
}

export default App;
