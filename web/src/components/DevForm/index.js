import React, { useState, useEffect } from "react";

export default function DevForm({ onSubmit }) {
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
  return (
    <form onSubmit={handleSubmit}>
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input
          onChange={(e) => SetGithubUsername(e.target.value)}
          value={github_username}
          id="github_username"
          name="github_username"
          required
        />
      </div>
      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          onChange={(e) => setTechs(e.target.value)}
          value={techs}
          id="techs"
          name="techs"
          required
        />
      </div>

      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            onChange={(e) => setLatitude(e.target.value)}
            type="number"
            name="latitude"
            value={latitude}
            required
          />
        </div>
        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            onChange={(e) => setLongitude(e.target.value)}
            type="number"
            name="longitude"
            value={longitude}
            required
          />
        </div>
      </div>
      <button type="submit">Salvar</button>
    </form>
  );
}
