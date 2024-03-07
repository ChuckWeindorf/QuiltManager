import config from "../config";
// Import the express and fetch libraries
import express from "express";

// Create a new express application
const etsyRouter = express.Router();

// Send a JSON response to a default get request
etsyRouter.get("/", async (req, res) => {
  // console.log("In etsyRouter");
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
});

export default etsyRouter;
