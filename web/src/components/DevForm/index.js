import { Box, TextField, Typography, Grid, Button, Paper } from "@mui/material";
import React, { useState, useEffect } from "react";

export default function DevForm({ isDark, onSubmit }) {
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [techs, setTechs] = useState("");
  const [github_username, SetGithubUsername] = useState("");
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      (err) => {
        console.log(err);
      },
      {
        timeout: 30000,
      }
    );
  }, []);
  async function handleSubmit(e) {
    e.preventDefault();
    await onSubmit({
      github_username,
      techs,
      latitude,
      longitude,
    });
    SetGithubUsername("");
    setTechs("");
  }

  useEffect(() => {
    if (isDark) {
      document
        .querySelectorAll("[id=input-block]")
        .forEach((f) => (f.style.color = "white"));
      document.getElementById("techs").style.color = "white";
      document.getElementById("github_username").style.color = "white";
      document.getElementById("button-form").style.background = "#c38fff";
    } else {
      document
        .querySelectorAll("[id=input-block]")
        .forEach((f) => (f.style.color = "#ACACAC"));
      document.getElementById("button-form").style.background = "#7d40e7";
    }
  }, [isDark]);
  return (
    <form onSubmit={handleSubmit}>
      <Box className="input-block">
        <Grid container spacing={0} direction="column">
          <Grid item>
            <Typography
              id="input-block"
              sx={{
                color: "#ACACAC",
                fontSize: "14px",
                fontWeight: "bold",
                display: "block",
              }}
              variant="body2"
            >
              Usuário do Github
            </Typography>
          </Grid>{" "}
          <Grid item>
            <TextField
              variant="standard"
              sx={{
                width: "100%",
                height: "32px",
                fontSize: "14px",
                color: "#666",
                border: 0,
              }}
              onChange={(e) => SetGithubUsername(e.target.value)}
              value={github_username}
              id="github_username"
              name="github_username"
              required
            />
          </Grid>
        </Grid>
      </Box>

      <Box className="input-block">
        <Grid container spacing={0} direction="column">
          <Grid item>
            <Typography
              id="input-block"
              sx={{
                color: "#ACACAC",
                fontSize: "14px",
                fontWeight: "bold",
                display: "block",
              }}
              variant="body2"
            >
              Tecnologias
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              variant="standard"
              sx={{
                width: "100%",
                height: "32px",
                fontSize: "14px",

                border: 0,
              }}
              onChange={(e) => setTechs(e.target.value)}
              value={techs}
              id="techs"
              name="techs"
              required
            />
          </Grid>
        </Grid>
      </Box>

      <Box className="input-group">
        <Box className="input-block">
          <Grid container spacing={0} direction="column">
            <Grid item>
              <Typography
                id="input-block"
                sx={{
                  color: "#ACACAC",
                  fontSize: "14px",
                  fontWeight: "bold",
                  display: "block",
                }}
                variant="body2"
              >
                Latitude
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                variant="standard"
                id="input-block"
                sx={{
                  width: "100%",
                  height: "32px",
                  fontSize: "14px",

                  border: 0,
                }}
                onChange={(e) => setLatitude(e.target.value)}
                type="number"
                name="latitude"
                value={latitude}
                required
              />
            </Grid>
          </Grid>
        </Box>
        <Box className="input-block">
          <Grid container spacing={0} direction="column">
            <Grid item>
              <Typography
                id="input-block"
                sx={{
                  color: "#ACACAC",
                  fontSize: "14px",
                  fontWeight: "bold",
                  display: "block",
                }}
                variant="body2"
              >
                Longitude
              </Typography>
            </Grid>
            <Grid item>
              <TextField
                variant="standard"
                id="input-block"
                sx={{
                  width: "100%",
                  height: "32px",
                  fontSize: "14px",
                  color: "#666",
                  border: 0,
                }}
                onChange={(e) => setLongitude(e.target.value)}
                type="number"
                name="longitude"
                value={longitude}
                required
              />
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Button
        variant="contained"
        id="button-form"
        fullWidth
        sx={{
          border: 0,
          marginTop: "30px",
          background: "#7d40e7",
          borderRadius: "2px",

          fontSize: "14px",
          fontWeight: "bold",
          color: "#fff",
          cursor: "pointer",
          transition: "background 0.5s",
        }}
        type="submit"
      >
        Salvar
      </Button>
    </form>
  );
}
