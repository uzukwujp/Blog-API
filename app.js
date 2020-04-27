const config = require('config');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const blogRoute = require('./routes/blog');
const commentRoute = require('./routes/comment');
const likeRouter = require('./routes/like');
const cors = require('cors');
const path = require('path');
const userRouter = require('./routes/user');


mongoose.connect('mongodb://localhost/tropicalaquaculture')
.then(()=>{
    console.log('connected to database successfully')
})
.catch((error)=>{
    console.log('failed to connect to database '+ error)
})

console.log(config.get('customer.host'));
console.log(config.get('customer.password'));
console.log(process.env.NODE_ENV);


app.use(cors());
app.use(bodyParser.json());
app.use('/api/blogs', blogRoute);
app.use('/api/comments', commentRoute);
app.use('/api/likes',likeRouter);
app.use('/images', express.static(path.join(__dirname,'images')));
app.use('/api/auth', userRouter)





module.exports = app;
