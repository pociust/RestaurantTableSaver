const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const path = require("path");

//sets up the experss app to handle data parsing
app.use(express.urlencoded({ extend: true }));
app.use(express.json());

//DATA
const rsvp = [
  {
    customerName: "Tom",
    customerEmail: "todgo2020@sbcglobal.com",
    customerPhone: "312-202-3020",
    customerID: "2919"
  },
  {
    customerName: "mike",
    customerEmail: "mypotions@msn.com",
    customerPhone: "312-999-8888",
    customerID: "1"
  }
];

const waitlist = [];

app.get("/", (req, res) => {
  res.sendfile(path.join(__dirname, "index.html"));
});

app.get("/table", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});
app.get("/api/reservations", (req, res) => {
  return res.json(rsvp);
});
app.get("/api/table", (req, res) => {
  return res.json(waitlist);
});

app.get("/reservations", function(req, res) {
  res.sendFile(path.join(__dirname, "reservations.html"));
});

app.post("/api/table", (req, res) => {
  if (rsvp.length < 4) {
    rsvp.push(req.body);
    res.json(true);
  } else {
    waitlist.push(req.body);
    res.json(false);
  }
  console.log(false);
});
app.post("/api/clear", (req, res) => {
  rsvp.length = 0;
  waitlist.length = 0;
  res.json(true);
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
