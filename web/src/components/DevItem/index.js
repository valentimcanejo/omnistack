import React, { useState, useEffect } from "react";
import "./styles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  IconButton,
  Button,
  TextField,
  Typography,
  Box,
  Grid,
  Paper,
  Link,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export default function DevItem({ isDark, dev, del, update }) {
  //const [github_username, SetGithubUsername] = useState("");
  const [open, setOpen] = useState(false);
  const [techs, setTechs] = useState("");
  const [bio, setBio] = useState("");
  async function deleteDev(e) {
    e.preventDefault();
    await del(dev.github_username);
    document.location.reload(true);
  }
  async function updateDev(e) {
    e.preventDefault();
    await update({
      github_username: dev.github_username,
      bio: bio,
      techs: techs,
    });
  }

  useEffect(() => {
    if (isDark) {
      document
        .querySelectorAll("[id=dev-item]")
        .forEach((f) => (f.style.background = "#404040"));
      document
        .querySelectorAll("[id=dev-item]")
        .forEach((f) => (f.style.color = "white"));
      document
        .querySelectorAll("[id=link-item]")
        .forEach((f) => (f.style.color = "#c38fff"));
    } else {
      document
        .querySelectorAll("[id=link-item]")
        .forEach((f) => (f.style.color = "#8e4dff"));
      document
        .querySelectorAll("[id=dev-item]")
        .forEach((f) => (f.style.background = "white"));
      document
        .querySelectorAll("[id=dev-item]")
        .forEach((f) => (f.style.color = "#333"));
    }
  }, [isDark]);

  return (
    <Paper id="dev-item" className="dev-item">
      <Box className="bio-icon">
        <Box className="icon-button">
          <Grid container spacing={0}>
            <Grid item>
              <Box
                component="img"
                sx={{
                  width: "54px",
                  height: "54px",
                  borderRadius: "50%",
                }}
                alt={dev.name}
                src={dev.avatar_url}
              />
            </Grid>
            <Grid item>
              <Box className="user-info">
                <Grid container spacing={0} direction="column">
                  <Grid item>
                    <Typography
                      id="dev-item"
                      sx={{
                        fontWeight: "bold",
                        display: "block",
                        fontSize: "16px",
                        color: "#333",
                      }}
                      variant="body2"
                    >
                      {dev.name}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography
                      id="dev-item"
                      variant="body2"
                      sx={{ fontSize: "13px", color: "#999", marginTop: "2px" }}
                    >
                      {dev.techs.join(", ")}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box>
          <IconButton
            id="dev-item"
            onClick={() => {
              if (open) {
                setOpen(false);
              } else {
                setOpen(true);
              }
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton onClick={deleteDev}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      </Box>
      <Typography
        id="dev-item"
        variant="body2"
        sx={{
          color: "#666",
          fontSize: "14px",

          lineHeight: "20px",
          margin: "10px 0",
        }}
      >
        {dev.bio}
      </Typography>
      <Link
        id="link-item"
        sx={{
          color: "#8e4dff",
          fontSize: "14px",

          textDecoration: "none",
        }}
        href={`https://github.com/${dev.github_username}`}
      >
        Acessar perfil no github
      </Link>

      <Dialog className="dialog-screen" open={open}>
        <DialogContent
          sx={{
            backgroundColor: isDark ? "#282828" : "white",
            color: isDark ? "white" : "black",
          }}
        >
          <DialogTitle>Update</DialogTitle>
          <form onSubmit={updateDev}>
            <Box className="input-form-techs">
              <Box>
                <Typography variant="body2">Update the dev's techs:</Typography>
                <TextField
                  variant="standard"
                  size="small"
                  value={techs}
                  id="techs"
                  name="techs"
                  onChange={(e) => setTechs(e.target.value)}
                  sx={{
                    color: isDark ? "white" : "black",
                    marginTop: "15px",
                  }}
                ></TextField>
              </Box>
              <Box>
                <Typography variant="body2">Update the dev's bio:</Typography>
                <TextField
                  id="bio"
                  variant="standard"
                  size="small"
                  name="bio"
                  value={bio}
                  sx={{ marginTop: "15px" }}
                  onChange={(e) => setBio(e.target.value)}
                ></TextField>
              </Box>
            </Box>
            <Box className="buttons">
              <Button
                size="small"
                onClick={() => document.location.reload(true)}
                type="submit"
                variant="contained"
                color="success"
              >
                Update
              </Button>
              <Button
                size="small"
                onClick={() => setOpen(false)}
                color="error"
                variant="contained"
              >
                Close
              </Button>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </Paper>
  );
}
