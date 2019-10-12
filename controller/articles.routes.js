const express = require('express');
const router = express.Router();
const axios = require('axios')
const cheerio = require('cheerio')
const request = require('request')
// renders saved articles page
router.get('/saved', (req, res) => {
    res.render('saved');
})

function scraper() {
    axios.get("https://ocweekly.com/category/news/").then((data) => {
        const $ = cheerio.load(data.data)

       $('article.post .entry-title a').each((i, element) => {
        const result = {};

        result.title = $(element).text();
        result.url = $(element).attr().href;
        
        console.log(result);
       })

       

      
       
         
        
           
            
        
        
       
//          $('.site-main article').each(() => {
//             const title = $('.title-container h3 a').text();
//             const newTitle = `${title}, \n\n`
//             console.log(newTitle);


//             let url = $('.title-container a').attr().href;


//             // const article = {
//             //     name:newTitle,
//             //     url: url
//             // }
//             // console.log(article)
//             // const header = {
//             //     name: title
//             // }
//             // console.log(header)
          
//             // $('.title-container h3 a').each((element) => {
//             //     const title = 
//             //     console.log(title)
                
//             // })
            
            
      
         
            
//             // let article = {
//             //     title: title,
//             //     url: url

//             // }
            
//             // console.log(article)})
        
           
         
//             // for(var i = 0; i < results.length; i++) {
                
//             // }
            
//             // for(var i = 0; i < result.length; i++){
//             //     console.log(result[i])
//             // }
           
//          })
        
    })
 }         
        
    
scraper();


// requests and scrapes 20 articles from an api of my choosing
router.get('/scrape', (req, res) => {
    res.render('articles')
    
    

})


module.exports = router;
