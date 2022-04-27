import React, { useState } from "react";
import "./styles.css";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Button, TextField, Typography, Box } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
export default function DevItem({ dev, del, update }) {
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

  return (
    <li className="dev-item">
      <header className="bio-icon">
        <div className="icon-button">
          <img src={dev.avatar_url} alt={dev.name} />
          <div className="user-info">
            <strong>{dev.name}</strong>

            <span>{dev.techs.join(", ")}</span>
          </div>
        </div>
        <div>
          <IconButton
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
        </div>
      </header>
      <p>{dev.bio}</p>
      <a href={`https://github.com/${dev.github_username}`}>
        Acessar perfil no github
      </a>

      <Dialog className="dialog-screen" open={open}>
        <DialogTitle>Update</DialogTitle>
        <DialogContent>
          <form onSubmit={updateDev}>
            <div className="input-form-techs">
              <Box>
                <Typography variant="body2">Update the dev's techs:</Typography>
                <TextField
                  variant="outlined"
                  size="small"
                  value={techs}
                  id="techs"
                  name="techs"
                  onChange={(e) => setTechs(e.target.value)}
                ></TextField>
              </Box>
              <Box>
                <Typography variant="body2">Update the dev's bio:</Typography>
                <TextField
                  id="bio"
                  variant="outlined"
                  size="small"
                  name="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></TextField>
              </Box>
            </div>
            <div className="buttons">
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
            </div>
          </form>
        </DialogContent>
      </Dialog>
      {/* {open ? (
        <form onSubmit={updateDev}>
          <input
            value={techs}
            id="techs"
            name="techs"
            onChange={(e) => setTechs(e.target.value)}
          ></input>
          <input
            id="bio"
            name="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
          ></input>
          <button type="submit">Change</button>
        </form>
      ) : null} */}
    </li>
  );
}
