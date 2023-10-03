import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router";
import { useMediaQuery } from "@mui/material";

function JobCard({ job }) {
  const navigate = useNavigate();

  const handleApplyClick = () => {
    // Navigate to the job post page when the "Apply" button is clicked
    navigate(`/job-details?job=${job.job_id}`);
  };

  const matches = useMediaQuery('(min-width:600px)');

  return (
    <Card sx={{ mt: 3, width: matches ? 'auto' : '100%' }}>
      <CardContent>
        <Grid container spacing={2}>
          {/* Left column */}
          <Grid item xs={12} sm={8}>
            <Typography variant="h5" gutterBottom>
              {job.job_title ? job.job_title : job.job_job_title}
            </Typography>
          </Grid>

          {/* Right column */}
          <Grid item xs={12} sm={4}>
            <Button
              variant="outlined"
              color="primary"
              size="small"
            >
              {job.job_employment_type}
            </Button>
          </Grid>

          {/* Description */}
          <Grid item xs={12}>
            <Typography variant="body2" paragraph className="line-clamp">
              {job.job_description}
            </Typography>
          </Grid>

          {/* Apply Button and Skills */}
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Button
                variant="contained"
                color="primary"
                sx={{ mr: 2 }}
                onClick={handleApplyClick}
              >
                See Details
              </Button>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default JobCard;
