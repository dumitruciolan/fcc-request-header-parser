// init project & enable CORS so the API is remotely testable
const express = require("express"),
  cors = require("cors"),
  app = express();

// some legacy browsers choke on port 204
app.use(cors({ optionSuccessStatus: 200 }));
app.use(express.static("public"));

// route to main HTML page
app.get("/", (_, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// define the API route
app.get("/api/whoami", (req, res) => {
  // retrieve only the external/WAN IP address
  const ipaddress = req.headers["x-forwarded-for"].split(",").shift(),
    // we can obtain the info like this too
    language = req.header("Accept-Language"),
    // it works with a classic get also
    software = req.get("User-Agent");

  // return all the information in JSON format
  res.json({ ipaddress, language, software });
});

// listen for requests :)
const listener = app.listen(process.env.PORT || 4100, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});
