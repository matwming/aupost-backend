"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env["NODE_CONFIG_DIR"] =
    "/Users/mingwu/Projects/devconnector/dist/config";
const axios_1 = __importDefault(require("axios"));
const config_1 = __importDefault(require("config"));
const getRepos = (req, res) => {
    try {
        let githubusername = req.params.username;
        let clientId = config_1.default.get("githubClientId");
        let secret = config_1.default.get("githubSecret");
        let url = `https://api.github.com/users/${githubusername}/repos?per_page=5&sort=created:asc&client_id=${clientId}&client_secret=${secret}`;
        axios_1.default
            .get(url)
            .then((resfromAxios) => {
            console.log("github_repo", resfromAxios.data);
            return res.json(resfromAxios.data);
        })
            .catch((e) => {
            console.log(e);
            return res.json(e);
        });
    }
    catch (e) {
        console.error(e.message);
    }
};
exports.default = getRepos;
