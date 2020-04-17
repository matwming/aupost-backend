process.env["NODE_CONFIG_DIR"] =
  "/Users/mingwu/Projects/devconnector/dist/config";
import { Request, Response } from "express";
import axios, { AxiosError } from "axios";
import config from "config";

const getRepos = (req: Request, res: Response) => {
  try {
    let githubusername = req.params.username;
    let clientId = config.get("githubClientId");
    let secret = config.get("githubSecret");
    let url = `https://api.github.com/users/${githubusername}/repos?per_page=5&sort=created:asc&client_id=${clientId}&client_secret=${secret}`;

    axios
      .get(url)
      .then((resfromAxios) => {
        console.log("github_repo", resfromAxios.data);
        return res.json(resfromAxios.data);
      })
      .catch((e: AxiosError) => {
        console.log(e);
        return res.json(e);
      });
  } catch (e) {
    console.error(e.message);
  }
};

export default getRepos;
