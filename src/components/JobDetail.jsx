import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  IconButton,
  Paper,
  Typography,
  Button,
  Grid,
  Link,
  Box,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ArrowBack } from "@mui/icons-material";
import Form from "./Form";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { application } from "../redux/slice/userSlice.js";
import { useMediaQuery } from "@mui/material";

const JobDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedinUser);
  const queryParams = new URLSearchParams(location.search);

  const jobId = queryParams.get("job");

  const [jobData, setJobData] = useState();

  useEffect(() => {
    if (!user.email) {
      navigate("/");
    }
    getData();
  }, []);

  const getData = async () => {
    try {
      const options = {
        method: "GET",
        url: "https://jsearch.p.rapidapi.com/job-details",
        params: {
          job_id: jobId,
        },
        headers: {
          "X-RapidAPI-Key":
            "96be449d75mshaf6d76dac787890p1fb138jsn49cce366bc6b",
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      if (response) {
        const data = response.data.data[0];
        console.log(data);
        setJobData(data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false); // State for the success modal
  const [formData, setFormData] = useState(null); // State to store form data for preview

  const handleApplyClick = () => {
    setIsFormOpen(true); // Open the modal when "Apply Now" is clicked
  };

  const handleCloseForm = () => {
    setIsFormOpen(false); // Close the modal
  };

  const handleSubmitForm = (data) => {
    dispatch(application(data));
    setIsFormOpen(false);
    navigate("/submitted");
  };

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
      }}
    >
      {jobData?.employer_name ? (
        
          <Paper elevation={3} style={{ padding: "20px", width: "100%" }}>
            <Typography variant="h4">{jobData?.job_title}</Typography>
            <Typography variant="subtitle1" gutterBottom>
              Posted by {jobData?.employer_name}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Job Description:
            </Typography>
            <Typography variant="body1" paragraph>
              {jobData?.job_description}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Job Responsibilities:
            </Typography>
            <Typography variant="body1" paragraph>
              {jobData?.job_highlights?.Responsibilities?.map(
                (responsibility, index) => (
                  <li key={index}>{responsibility}</li>
                )
              )}
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body1">
                  Employment Type: {jobData?.job_employment_type}
                </Typography>
                <Typography variant="body1">
                  Remote: {jobData?.job_is_remote ? "Yes" : "No"}
                </Typography>
                <Typography variant="body1">
                  Location: {jobData.job_country}
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="h6" gutterBottom>
              How to Apply:
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: isMobile ? "space-between" : "space-between",
                alignItems: "center",
                padding: "20px",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                onClick={handleApplyClick} // Show the form when Apply Now is clicked
              >
                Apply Now
              </Button>
              <Link
                href={jobData.job_google_link}
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google
              </Link>
            </Box>

            <Button
              variant="outlined"
              color="primary"
              startIcon={<ArrowBack />}
              onClick={() => window.history.back()}
              mt="5%"
            >
              Back to Home
            </Button>
          </Paper>
       
      ) : (
        <Card sx={{ minWidth: 275 }}>
          <Typography
            variant="h5"
            sx={{ color: "#1976d2", py: 24, textAlign: "center" }}
          >
            <IconButton type="submit" aria-label="search">
              <SearchIcon sx={{ fontSize: "55px" }} />
            </IconButton>
            Loading job Detail, Please wait ...
          </Typography>
        </Card>
      )}
      <Form
        open={isFormOpen}
        onClose={handleCloseForm}
        onSubmit={handleSubmitForm}
      />
    </Box>
  );
};

export default JobDetail;
