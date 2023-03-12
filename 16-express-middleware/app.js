const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const morgan = require("morgan");
const app = express();
const port = 3000;

app.set("view engine", "ejs");

// Third-party middleware
app.use(expressLayouts);
app.use(morgan("dev"));

// Built-in middleware
app.use(express.static("public"));

// Application level middleware
app.use((req, res, next) => {
  console.log("time: ", Date.now());
  next();
});

app.get("/", (req, res) => {
  const mahasiswa = [
    { nama: "Alfin Budiyanto", email: "alfinbudiyanto@gmail.com" },
    { nama: "Erik", email: "erik@gmail.com" },
    { nama: "Doddy Ferdiansyah", email: "doddy@gmail.com" },
  ];
  res.render("index", {
    nama: "Alfin Budiyanto",
    title: "Halaman Home",
    mahasiswa,
    layout: "layouts/main-layouts",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    layout: "layouts/main-layouts",
    title: "Halaman About",
  });
});

app.get("/contact", (req, res) => {
  res.render("contact", {
    layout: "layouts/main-layouts",
    title: "Halaman Contact",
  });
});

app.get("/product/:id", (req, res) => {
  res.send(
    `Product ID : ${req.params.id} <br> Category : ${req.query.category}`
  );
});

app.use((req, res) => {
  res.status(404);
  res.send("<h1>404</h1>");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
