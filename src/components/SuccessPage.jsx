import { ArrowBack } from "@mui/icons-material";
import { Box, Paper, Button, Container, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "@mui/material";

function SuccessPage() {
  const formData = useSelector((state) => state.application);
  const user = useSelector((state) => state.loggedinUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user.email) {
      navigate("/");
    }
  }, []);

  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
        backgroundColor: "#f0f0f0",
      }}
    >

        <Paper elevation={3} sx={{ padding: "20px", width: "90%", overflow: "auto" }} >
          <Typography variant="h4" sx={{ mb: 2, color: "#1976d2" }}>Application Submitted Successfully</Typography>
          <Typography variant="h6" sx={{ mb: 2 }}>Application Preview:</Typography>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>Name:</Typography>
            <Typography variant="body2" sx={{ wordWrap: "break-word" }}>{formData?.name}</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>Email:</Typography>
            <Typography variant="body2" sx={{ wordWrap: "break-word" }}>{formData?.email}</Typography>
          </Box>
          <Box sx={{ mb: 2 }}>
            <Typography variant="body1" sx={{ fontWeight: "bold" }}>Cover Letter:</Typography>
            <Typography variant="body2" sx={{ wordWrap: "break-word" }}>{formData?.coverLetter}</Typography>
          </Box>
          <Button
            variant="contained"
            color="primary"
            startIcon={<ArrowBack />}
            onClick={() => navigate("/home")}
            sx={{ mt: isMobile ? 2 : "2rem" }}
          >
            Back to Home
          </Button>
        </Paper>
      
    </Box>
  );
}

export default SuccessPage;
