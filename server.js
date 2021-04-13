// init project & enable CORS so the API is remotely testable
const express = require("express"),
  cors = require("cors"),
  app = express();

// some legacy browsers choke on port 204
app.use(cors({ optionSuccessStatus: 200 }));
app.use(express.static("public"));

// route to main HTML page
app.get("/", (_, res) => res.sendFile(`${__dirname}/views/index.html`));

// define the API route
app.get("/api/whoami", (req, res) => {
  // retrieve only the external/WAN IP address
  const ipaddress = req.headers["x-forwarded-for"].split(",").shift(),
    // access one individual header’s value
    language = req.header("Accept-Language"),
    // fetching with a classic get works too
    software = req.get("User-Agent");

  // return the required info in JSON format
  res.json({ ipaddress, language, software });
});

// respond to inexistent routes
app.use((_, res) =>
  res
    .status(404)
    .type("txt")
    .send("Not found")
);

// listening for requests
const listener = app.listen(process.env.PORT || 4100, err => {
  if (err) throw err;
  console.log(`Your app is listening on port ${listener.address().port}`);
});
