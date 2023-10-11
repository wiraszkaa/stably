import { Box, Stack } from "@mui/material";
import Navigation from "./Navigation";

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <Stack maxWidth="100vw">
      <Navigation />
      <Box minWidth={500} mt={10} width="100%" position="relative">
        {children}
      </Box>
    </Stack>
  );
}
