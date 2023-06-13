import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function FullscreenLoading() {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#1f2a40", // Adjust the opacity as needed
        zIndex: 9999,
      }}
    >
      <CircularProgress color="primary" />
    </Box>
  );
}
