"use strict";

const { getProjects } = require("../../lib/db.js");

module.exports = (req, res) => {
  if (req.headers.authorization !== process.env.ANDAGA_AUTH) {
    res.writeHead(401, { "Content-Type": "text/plain" });
    res.end("Authentication required");
  } else {
    try {
      getProjects().then((projects) => {
        console.info("Successfully retrieved projects");
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(projects));
      });
    } catch (err) {
      console.error(err.message);
      res.writeHead(400, { "Content-Type": "text/plain" });
      res.end(err.message);
    }
  }
};
