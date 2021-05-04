const express = require('express');
const { sequelize } = require('./models/Product');
const routes = require('./routes');
// import sequelize connection

const app = express();
const PORT = process.env.PORT || 3009;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

// sync sequelize models to the database, then turn on the server
//add {force:true} yo dump db and start anew
sequelize.sync().then(() => {
  console.log('sequelize is running');
  app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`)})});


/*
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
*/
