const express = require("express");
const app = express();
require("dotenv").config();
const {connect} = require('mongoose');
const userRoute = require('./Routes/userRoutes');
const postRoute = require('./Routes/postRoutes');
const {notFound , errorHandler} = require('./middleware/errorMiddleware');
const cors = require('cors');
const upload = require('express-fileupload');

app.use(express.json({extended: true}));
app.use(express.urlencoded({extended: true}));
app.use(cors({credentials: true, origin: "http://localhost:5173"}));
app.use(upload());
app.use('/uploads', express.static(__dirname + '/uploads'));

app.use('/api/users', userRoute);
app.use('/api/posts', postRoute);

app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000;

connect(process.env.MONGODB_URI)
.then(app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`);
    
})).catch(
    (err) =>{
        console.log(err);
        
    }
)