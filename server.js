// Install modules
const express = require('express')
const app = express()

// Define seed data
// Your data here
const gallery = require('./gallery.js') // import gallery module

// Dynamic JSON Endpoint
app.get('/api/cars', (req, res) => {
  if (typeof gallery !== 'undefined') {
    // Variable is an array!
    res.send(gallery)
  } else {
    res.status(404)
    res.send({ error: 'File Not Found' })
  }
})

app.get('/api/cars/:id', (req, res) => {
  if (typeof gallery !== 'undefined') {
    const foundCar = gallery.find(car => Number(req.params.id) === car.id);

    if (!foundCar) { // send 404 if car is not found
      res.status(404)
      res.send({ error: 'File Not Found' })
    } else { // else show the array
      res.send(foundCar)
    }

  } else {
    res.status(404)
    res.send({ error: 'File Not Found' })
  }
})

// Handle 404 errors with middleware
app.use((req, res) => {

  // If path starts with `/api`, send JSON 404
  if (req.url.startsWith('/api')) {
    res.status(404)
    res.send({ error: 'File Not Found' })
  } else {
    // else send HTML 404
    res.status(404)
    res.send('<h1>404: File Not Found</h1>')
  }
});

// Start server
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});