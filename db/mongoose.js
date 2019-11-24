/* This module will hold our connection to 
   our mongo server through the Mongoose API.
   We will access the connection in our express server. */
   const mongoose = require('mongoose')

   /* Connnect to our database */
   // Get the URI of the local database, or the one specified on deployment.
   // the URI is:
   // mongodb://<firstname>:team42@cluster0-shard-00-00-l2kqs.mongodb.net:27017,cluster0-shard-00-01-l2kqs.mongodb.net:27017,cluster0-shard-00-02-l2kqs.mongodb.net:27017/team42?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority
   
   const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/team42'
   
   mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}).then(
       () => console.log('connect to db'),
       () => console.log('connection to db failed')
   )
   
   module.exports = { mongoose }  // Export the active connection.