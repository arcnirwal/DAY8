// // console.log('hello');
// // const fs = require ('fs');
// // const data=fs.readFileSync('./data.json',"utf8");
// // const dataObject=json.parse(data);
// // console.log(data)
// // const cardtemplate = `
// // <div class='product-card>
// // <h3>$title</h3>
// // </div>
// // `;
// // const resut=[];
// // FocusEvent(leti=0; i<dataObject,lenth;i++){
// //     resourceLimits.push(card.tempate);
// // }
// // console.log(result);
// // const server=http.creatServer((req,res)=>{
// //     res.end(cardtemplate);
// // })

// // http.createServer((req,res)=>{

// //     res.end('hello');

// // });
// // server.listen(1400).json
// // Titles array
// // var titles = ["Title 1", "Title 2", "Title 3,Title4,Title5,Title6,Title7"];

// // // Printing titles to the console
// // titles.forEach(function(title) {
// //     console.log(title);
// // });
// // console.log('hello');

// // npm init to create package.json
// // npm i nodemon for nodemon dependencies-----> node module folder will create 
// //goto dummy.json website 
// //create fs require
// //read file sync


// const fs = require("fs");
// const http = require("http");
// const data = fs.readFileSync("./data.json", "utf8");
// const dataObj = JSON.parse(data);
// // console.log(dataObj)
// const cardTemplate = `
// <div class='product-card'>
// <h3>$TITLE$<h3>
// <img src="$img_src$" alt='product-image' />
// </div>
// `;

// let result = [];
// for (let i = 0; i < dataObj.length; i++) {
//     let temp=cardTemplate;
//     temp=temp.replace("$TITLE$",dataObj[i].title);
//     temp=temp.replace("$img_src$",dataObj[i].images[0]);

//     result.push(temp);
// }
// result=result.join(' ')
// // console.log(result);
// const server = http.createServer((req, res) => {
//     // res.end(cardTemplate);
//     res.end(result);

// });
// server.listen(1400);




// console.log('hello');

// npm init to create package.json
// npm i nodemon for nodemon dependencies-----> node module folder will create 
//goto dummy.json website 
//create fs require
//read file sync


// const fs = require("fs");
// const http = require("http");
// const data = fs.readFileSync("./data.json", "utf8");
// const dataObj = JSON.parse(data).products;
// // console.log(dataObj)
// const cardTemplate = `
// <div class='product-card'>
// <h3>$TITLE$<h3>
// <img src="$img_src$" alt='product-image' />
// </div>
// `;

// let result = [];
// for (let i = 0; i < dataObj.length; i++) {
//     let temp=cardTemplate;
//     temp=temp.replace("$TITLE$",dataObj[i].title);
//     temp=temp.replace("$img_src$",dataObj[i].images[0]);

//     result.push(temp);
// }
// result=result.join(' ')
// // console.log(result);
// const server = http.createServer((req, res) => {
//     // res.end(cardTemplate);
//     res.end(result);

// });
// server.listen(1400);
// import required items/packages
const http = require('http');
const fs = require('fs');
// const data = fs.readFileSync('data.json');
// const dataObject = JSON.parse(data).products;
const url = require('node:url');

// create a card template or html to SSR
const cardTemplate = `
<div class="card">
  <h1>Card Title</h1>
  <p>Card Description</p>
  <img src="image_path" alt="IMG ALT" style="width:500px">
  <button><a href="id">Read More</a></button>
</div>`


// create a server and send response
http.createServer((req, res) => {
  res.write('<html><head><title>SSR</title></head><body>');
  dataObject.forEach(item => { 
        // console.log(item.title, item.description);
        let a = cardTemplate.replace('Card Title', item.title);
        let b = cardTemplate.replace('Card Description', item.description);
        let pic = cardTemplate.replace('image_path', item.images[0]);
        let ids = cardTemplate.replace('id', item.id);
        res.write(a+b+pic+ids);        
      });

      const {pathname} = url.parse(req.url);
      console.log(pathname);
      if(pathname === '/about'){
        res.write('<h1>About Us</h1>');
      } 
      else if(pathname === '/contact'){
        res.write('<h1>Contact Us</h1>');
        
      }
      else if(pathname === '/home'){
        res.write('<h1>home</h1>');
      }
      else{
        res.write('<h1>404 not found</h1>');
      
      }
    res.write('</body></html>');
    res.end();
  }).listen(3000, () => {
    console.log('Server is running on port 3000');
}
);
