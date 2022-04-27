import React, { useState, useEffect } from "react";
import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";
import api from "./services/api";
import DevItem from "./components/DevItem";
import DevForm from "./components/DevForm";
import { TextField, Typography } from "@mui/material";

function App() {
  const [devs, setDevs] = useState([]);
  const [query, setQuery] = useState("");
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

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>

      <main>
        <TextField
          fullWidth
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          variant="outlined"
          label="Search dev"
          sx={{ marginBottom: 4 }}
        ></TextField>
        <ul>
          {devs.map((dev, index) =>
            dev.name.toLowerCase().includes(query) ? (
              <DevItem
                key={index}
                dev={dev}
                del={handleDeleteDev}
                update={handleUpdateDev}
              />
            ) : null
          )}
        </ul>
      </main>
    </div>
  );
}

export default App;
