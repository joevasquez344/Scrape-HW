const express = require('express');
const router = express.Router();
const axios = require('axios')
const cheerio = require('cheerio')
const mongoose = require('mongoose')
const Article = require('../model/Article.model')

router.get('/', (req, res) => {
    
    Article.find({"saved": false}, function(articles){
        console.log(articles)
        res.render('landing', {
            articles: articles
        })
    }) 
        
    
   
})


router.get('/saved', (req, res) => {
    Article.find({"saved": true}, function(articles){
        res.render('saved', {
            articles: articles
        })
        console.log(articles)
    })
})

router.get('/scrape', (req, res) => {
    axios.get("https://ocweekly.com/category/news/").then((data) => {
        const $ = cheerio.load(data.data)

        const articles = [];

       $('article.post .entry-title a').each((i, element) => {
        const article = {};

        article.title = $(element).text();
        article.link = $(element).attr().href;

        articles.push(article);
        
      

       })
        Article.insertMany(articles)
        .then(function(){
            res.render('articles', {
                articles:articles
            })
           
        })
        .catch(err => console.log(err))
        
    })
     
      
       
})
    
       

// router.get('/articles/:id', (req, res) => {
//     Article.findOne({"_id": req.params.id})
//     .exec(function(err, article){
//         if(err){
//             console.log(err)
//         }
//         else{
//             res.json(article)
//         }
//     })
// })

// router.post("/articles/save/:id", function(req, res) {
//     // Use the article id to find and update its saved boolean
//     Article.findOneAndUpdate({ "_id": req.params.id }, { "saved": true})
//     // Execute the above query
//     .exec(function(err, article) {
//       if (err) {
//         console.log(err);
//       }
//       else {
//         res.json(article)
//       }
//     });
// });










module.exports = router;
