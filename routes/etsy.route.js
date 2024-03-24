const config = require("../config");
// Import the express and fetch libraries
const express = require("express");
const API = require('../controllers/apiAuthenticate');

// Create a new express application
const etsyRouter = express.Router();

// Send a JSON response to a default get request
etsyRouter.get("/", async (req, res) => {
  // console.log("In etsyRouter");
  if (API.authenticateKey(req))
  {
    const requestOptions = {
    method: "GET",
    headers: {
      "x-api-key": config.etsyKey,
    },
  };
  //console.log(requestOptions);
  //console.log("About to fetch etsy");
  const response = await fetch(
    "https://openapi.etsy.com/v3/application/seller-taxonomy/nodes",
    requestOptions
  );

  if (response.ok) {
    const data = await response.json();
    //console.log(data);
    res.send(data);
  } else {
    // console.log("Error");
    res.send("oops");
  }
}
else
{
objResponse
   .status(403)
   .send({ error: { code: 403, message: "Invalid credentials." } });
}
});

module.exports = etsyRouter;
