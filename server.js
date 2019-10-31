const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const ArticleCollection = require('./model/Article.model')

// express init
const app = express();

// body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// handlebars init
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

const dbConnection = mongoose.connect(MONGODB_URI);
if(dbConnection){
    console.log('Mongoose Database Connected')
}




const routes = require('./controller/articles.routes');
app.use(routes)


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server running on PORT ${PORT}`);
});