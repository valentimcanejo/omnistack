const axios = require("axios");

const Dev = require("../models/Dev");
const parseStringAsArray = require("../utils/parseStringAsArray");
const { findConnections, sendMessage } = require("../websocket");

module.exports = {
  async index(req, res) {
    const devs = await Dev.find();
    return res.json(devs);
  },
  async store(req, res) {
    const { github_username, techs, latitude, longitude } = req.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      const apiResponse = await axios.get(
        `https://api.github.com/users/${github_username}`
      );

      const { name, avatar_url, bio } = apiResponse.data;

      const techsArray = parseStringAsArray(techs);

      const location = {
        type: "Point",
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        github_username: github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      });
      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray
      );
      sendMessage(sendSocketMessageTo, "new-dev", dev);
    }

    return res.json(dev);
  },
  async update(req, res) {
    const { github_username, bio, techs } = req.body;
    const update = { bio: bio, techs: techs };
    const filter = {
      github_username: github_username,
    };
    let dev = await Dev.findOneAndUpdate(filter, update);
    // dev = await Dev.updateOne({
    //   techs: techs,
    //   bio: bio,
    // });

    return res.json(dev);
  },
  async delete(req, res) {
    const { github_username } = req.body;
    const dev = await Dev.deleteOne({ github_username });
    return res.json(dev);
  },
};
