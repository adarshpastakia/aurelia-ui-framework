/**
 * @author    : Adarsh Pastakia
 * @version   : 1.0.0
 * @copyright : 2018
 * @license   : MIT
 */

const path = require("path");
const express = require("express");
const bodyParser = require('body-parser');

const app = express();

// add middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, './build')));

// add error handler after all routes
const isDev = true;
app.use((err, req, res, next) => {
  next;
  console.info("app")
  console.warn(err)
  res.status(500).json({
    error: 500,
    message: 'Internal Server Error!',
    stack: isDev
      ? err.stack
      : null
  })
});

// add routes
const router = express.Router();
router.use('/countries', require('./api/countries'));
// return 404 when route not found
router.use('*', (req, res) => res.status(400).text("Unknown API route"));

// add the router
app.use('/api', router);


const DIST_DIR = path.join(__dirname, "build");
const PORT = process.env.PORT || 9000;

//Serving the files on the dist folder
app.use(express.static(DIST_DIR));

//Send index.html when the user access the web
app.get("*", function (req, res) {
  res.sendFile(path.join(DIST_DIR, "index.html"));
});

app.listen(PORT);
