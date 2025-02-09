import React from "react";
import Link from "next/link";
import { Box, Typography, Button } from "@mui/material";

export default function Custom404() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" component="h1" sx={{ fontSize: "4rem", mb: 2 }}>
        404
      </Typography>
      <Typography variant="h6" sx={{ mb: 4 }}>
        More to come (or you're in the wrong place)
      </Typography>
      <Link href="/" passHref>
        <Button variant="contained" color="primary">
          Go Back Home
        </Button>
      </Link>
    </Box>
  );
}