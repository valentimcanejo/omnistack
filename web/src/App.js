import React, { useState, useEffect } from "react";
import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";
import api from "./services/api";
import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";
import {
  TextField,
  Typography,
  Box,
  Grid,
  Drawer,
  Paper,
  Button,
  IconButton,
} from "@mui/material";
import { makeStyles } from "@material-ui/styles";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import ModeNightIcon from "@mui/icons-material/ModeNight";
const useStyles = makeStyles(() => ({
  textField: {
    borderColor: "white",
  },
  root: {
    color: "white",
    "& label": {
      color: "white",
    },

    "& .MuiInput-underline:after": {
      borderBottomColor: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  },
}));

function App() {
  const [devs, setDevs] = useState([]);
  const [query, setQuery] = useState("");
  const [night, setNight] = useState(false);
  useEffect(() => {
    async function loadDevs() {
      const res = await api.get("/devs");
      setDevs(res.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const res = await api.post("/devs", data);

    setDevs([...devs, res.data]);
  }

  async function handleDeleteDev(data) {
    await api.delete("/delete", { data: { github_username: data } });

    //setDevs(res.data);
  }

  async function handleUpdateDev(data) {
    await api.put("/update", data);
    console.log(data);
    // await api.put("/update", {
    //   data: {
    //     github_username: data.github_username,
    //     techs: data.techs,
    //     bio: data.bio,
    //   },
    // });

    //setDevs(res.data);
  }

  const changeNight = () => {
    document.body.style.background = "#121212";
    document.getElementById("h6").style.color = "white";

    document.getElementById("aside").style.background = "#404040";
    setNight(true);
  };

  const changeDay = () => {
    setNight(false);
    document.getElementById("aside").style.background = "white";
    document.getElementById("h6").style.color = "#333";
    document.body.style.background = "#E5E6F0";
  };

  const classes = useStyles();
  return (
    <Box id="app">
      <Box
        id="aside"
        className="aside"
        sx={{
          width: "320px",
          background: "white",
          boxShadow: "0 0 14px 0 black",
          borderRadius: "2px",
          padding: "30px 20px",
        }}
      >
        <Typography
          id="h6"
          variant="h6"
          sx={{
            fontSize: "20px",
            textAlign: "center",
            display: "block",
            color: "#333",
          }}
        >
          Cadastrar
        </Typography>
        <DevForm isDark={night} onSubmit={handleAddDev} />
      </Box>

      <Box className="main" sx={{ flex: 1, marginLeft: "30px" }}>
        <Grid container spacing={4}>
          <Grid xs={10} item>
            <TextField
              id="text-field"
              fullWidth
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              variant="outlined"
              label="Search dev"
              sx={{ marginBottom: 4, background: "white" }}
              // inputProps={
              //   night
              //     ? { style: { color: "white" } }
              //     : { style: { color: "black" } }
              // }
            ></TextField>
          </Grid>
          <Grid item>
            <Paper sx={{ borderRadius: "50px", marginBottom: "50px" }}>
              <IconButton onClick={changeDay}>
                <WbSunnyIcon />
              </IconButton>
              <IconButton onClick={changeNight}>
                <ModeNightIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {devs.map((dev, index) =>
            dev.name.toLowerCase().includes(query) ? (
              <Grid key={index} item xs={12} sm={6} md={6}>
                <DevItem
                  isDark={night}
                  dev={dev}
                  del={handleDeleteDev}
                  update={handleUpdateDev}
                />
              </Grid>
            ) : null
          )}
        </Grid>
      </Box>
    </Box>
  );
}

export default App;
