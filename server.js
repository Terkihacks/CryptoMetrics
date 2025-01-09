const express = require('express')
const dotenv = require('dotenv')
const app = express()
dotenv.config()
//Swagger package 
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');

const userPortfolioRoutes = require('./routes/userPortfolioRoutes')

//This middleware is used to parse incoming requests with URL-encoded payloads 
app.use(express.urlencoded({ extended: true }));
//This middleware is used to parse incoming requests with JSON payloads (typically in application/json format).
app.use(express.json());

//import our APIs
app.use('/portfolio',userPortfolioRoutes)

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(process.env.PORT || 5500,() =>{
    console.log(`Server running on port ${process.env.PORT || 5500}`)
    console.log('Swagger docs available at http://localhost:3000/api-docs');
})