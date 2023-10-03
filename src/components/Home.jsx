import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import {
  AppBar,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  InputBase,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { loggedinUser } from "../redux/slice/userSlice.js";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router";
import { useTheme } from "@emotion/react";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import CardMedia from "@mui/material/CardMedia";
import JobCard from "./JobCard.jsx";
import axios from "axios";
import { Javascript } from "@mui/icons-material";

function Home() {
  const [searchResults, setSearchResults] = useState([]); // State to store search results
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.loggedinUser);
  const [value, setValue] = useState("javascript");
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    if (!user.email) {
      navigate("/");
    }
    getData();
  }, [user]);

  const getData = async () => {
    setLoading(true);
    setSearchResults([]);

    try {
      const options = {
        method: "GET",
        url: "https://jsearch.p.rapidapi.com/search",
        params: {
          query: value ? value : "javascript",
        },
        headers: {
          "X-RapidAPI-Key":
            "96be449d75mshaf6d76dac787890p1fb138jsn49cce366bc6b",
          "X-RapidAPI-Host": "jsearch.p.rapidapi.com",
        },
      };

      const response = await axios.request(options);
      if (response) {
        setLoading(false);
        const data = response.data.data;
        console.log("Fetched data:", data);

        // Store the fetched data in state
        setSearchResults(data);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data:", error);
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ bgcolor: "", height: "100vh" }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Jobseeker
            </Typography>
            <Button
              color="inherit"
              onClick={() => {
                dispatch(loggedinUser({}));
              }}
            >
              Logout
            </Button>
          </Toolbar>
        </AppBar>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: isMobile ? "column" : "row", // Adjust direction for mobile
          }}
        >
          <Typography variant="h5" component="h5" sx={{ m: 5 }}>
            Welcome, {user.firstName} {user.lastName}
          </Typography>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mt: isMobile ? 2 : 0, // Add margin-top for mobile
              border: "1px solid blue",
              width: isMobile ? "100%" : "25%", // Adjust width for mobile
              maxWidth: isMobile ? "90%" : "25%", // Add max width for larger screens
            }}
            component="form"
            onSubmit={(e) => {
              e.preventDefault();
              getData();
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search for jobs by programming language"
              inputProps={{ "aria-label": "search jobs" }}
              onChange={(e) => {
                console.log("e,target.vbalue", e.target.value);
                setValue(e.target.value);
              }}
            />
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Box>
        </Box>
        <Grid p={isMobile ? 1.25 : 8}>
          {searchResults.map((s) => (
            <JobCard job={s} />
          ))}
          {searchResults.length == 0 && (
            <Card sx={{ minWidth: 275 }}>
              <Typography
                variant="h5"
                sx={{ color: "#1976d2", py: 24, textAlign: "center" }}
              >
                <IconButton type="submit" aria-label="search">
                  <SearchIcon sx={{ fontSize: "55px" }} />
                </IconButton>
                {!loading
                  ? "No Jobs available"
                  : "Loading jobs, Please wait ..."}
              </Typography>
            </Card>
          )}
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default Home;
