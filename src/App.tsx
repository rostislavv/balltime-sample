import React from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { ActionsList } from "./actions/ActionList";

function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <ActionsList />
      </Box>
    </Container>
  );
}

export default App;
