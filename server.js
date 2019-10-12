const express = require('express');
const exphbs = require('express-handlebars');

// express init
const app = express();

// body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// handlebars init
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get('/', (req, res) => {
    res.render('landing')
})


app.use('/api/articles', require('./controller/articles.routes'))


const PORT = process.env.PORT || 5000;


app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));