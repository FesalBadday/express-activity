// Install modules
const express = require('express')
const app = express()

// Define seed data
// Your data here
const gallery = require('./gallery.js') // import gallery module

// Dynamic JSON Endpoint
app.get('/api/cars', (req, res) => {
  res.send(gallery)
})

app.get('/api/cars/:id', (req, res) => {
  const foundCar = gallery.find(car => Number(req.params.id) === car.id);

  if (!foundCar) { // send 404 if car is not found
    res.send(['404 Not Found'])
  } else { // else show the array
    res.send(foundCar)
  }
})

// Handle 404 errors with middleware
app.use((req, res) => {
  res.status(404)
  res.send('404: File Not Found')
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});