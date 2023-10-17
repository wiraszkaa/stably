import { Box, Stack } from "@mui/material";
import Navigation from "./Navigation";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Stack maxWidth="100vw" minWidth={500}>
      <Navigation />
      <Box mt={10} width="100%" position="relative">
        {children}
      </Box>
    </Stack>
  );
}
