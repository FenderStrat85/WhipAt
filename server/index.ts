const express = require('express');
const cors = require('cors');
const session = require('express-session');
const router = require('./router');
const db = require('./models/db');
require('dotenv').config()

const SERVER_PORT = process.env.SERVER_PORT || 3001;
const SECRET = process.env.SECRET || 'catnip crazy';

const corsConfig = {
  // specify front-end server is the only allowed to make requests
  origin: 'http://localhost:3000',
  // allows to process cookies
  credentials: true,
};

const app = express();
app.use(cors(corsConfig));
app.use(express.json());
app.use(
  session({
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60, // 1hr
      sameSite: true,
      httpOnly: false,
      secure: false, // make this true in production
    },
  }),
);

app.use(router);
// return 404 for unspecified routes
app.get('*', (req: any, res: any) => {
  res.status(404);
});

try {
  (async () => {
    app.listen(SERVER_PORT);
    console.log(`Server up 🚀 on port ${SERVER_PORT}!`);
    await db.sequelize.sync();
    // await db.sequelize.sync({ force: true }); //reset db
    console.log('Database connection has been established successfully.');
  })();
} catch (err) {
  console.log(`Server start failed ${err}`);
}

module.exports = app;
