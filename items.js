// import required items/packages
const http = require('http');
const fs = require('fs');
const data = fs.readFileSync('data.json');
const dataObject = JSON.parse(data).products;
const url = require('node:url');

// create a card template or html to SSR
const cardTemplate = `
<div class="card">
  <h1>Card Title</h1>
  <p>Card Description</p>
  <img src="image_path" alt="IMG ALT" style="width:500px">
  <button><a href="/product">Read More</a></button>
</div>`


// create a server and send response
http.createServer((req, res) => {
  res.write('<html><head><title>SSR</title></head><body>');
  
  const {pathname,query} = url.parse(req.url, true);
  console.log(pathname, query);
  if(pathname === '/about'){
    res.write('<h1>About Us</h1>');
  } 
  else if(pathname === '/contact'){
    res.write('<h1>Contact Us</h1>');
  }
  else if(pathname === '/'){
        dataObject.forEach(item => {
              // console.log(item.title, item.description);
              let a = cardTemplate.replace('Card Title', item.title);
              let b = cardTemplate.replace('Card Description', item.description);
              let pic = cardTemplate.replace('image_path', item.images[0]);
              let ids = cardTemplate.replace('id', item.id);
              res.write(a+b+pic+ids);        
            });
        res.write('<h1>home11</h1>');
      }
      else if(pathname === '/product'){
        let id = query.id;
        let product = dataObject.find(item => item.id == id);
        res.write(`<h1>product page ${query.id}</h1>`);
        res.write(`<h1>title: ${product.title}</h1>`);
        res.write(`<img src=${product.images[0]}></img>`);
        res.write(`<h1>description: ${product.description}</h1>`);
        res.write(`<h1>price: ${product.price}</h1>`);
        res.write(`<h1>Brand: ${product.brand}</h1>`);
      }
      else if(pathname === '/home'){
        res.write('<h1>home</h1>');
      }
      else{
        res.write('<h1>404 not found</h1>');
      
      }
    res.write('</body></html>');
    res.end();
  }).listen(3001, () => {
    console.log('Server is running on port 3000');
}
);