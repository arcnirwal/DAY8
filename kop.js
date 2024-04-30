// console.log('hello');
const fs = require("fs");
const http = require("http");
const url = require("url");

const port = 3000;
const data = fs.readFileSync("./data.json","utf8");
const dataObj = JSON.parse(data).products;

const cardTemplate = `
<div class='product-card' style="background-color:aqua;">
<img src="$link$">
<h3>$Title$</h3>
<p>$description$</p>
<a href="$hlink$">read more..</a>
</div>`

let result = [];
for(let i=0;i<dataObj.length;i++){
        let temp = cardTemplate;
        temp = temp.replace('$Title$',dataObj[i].title);
        // result.push(temp)
        temp =temp.replace('$description$',dataObj[i].description)
        temp =temp.replace('$hlink$',`./product?id${i}`)
        temp = temp.replace('$link$',dataObj[i].images[0]);
        result.push(temp)
    }
    result = result.join(' ');
    // console.log(result)

const app = http.createServer((req,res)=>{
    // console.log('hi')
    //  const path = url.parse(req.url);
    // let id = path.query;
    // id = id.slice(2,id.length)
    // console.log(id);
    
    // const pathname = path.pathname;
    const {pathname} =url.parse(req.url);
    // console.log(pathname)
    if(pathname=='/')
    res.end(result)
else if(pathname =='/product'){
        const path = url.parse(req.url);
        // console.log(path);
        let id = path.query;
        id = id.slice(2,id.length)
        console.log(id);
        // res.end('product')
        let cTemplate = cardTemplate;
        let result = [];

                cTemplate = cTem    plate.replace('$Title$',dataObj[id].title);
                cTemplate =cTemplate.replace('$hlink$',`/product?id${id}`)
                
                cTemplate = cTemplate.replace('$description$',dataObj[id].description);
                cTemplate = cTemplate.replace('$link$',dataObj[id].images[0]);
                result.push(cTemplate)
            result = result.join(' ');
            res.end(cTemplate)

    }
  
    else{
        res.end('page not found')
    }
    // console.log(pathname)
   // res.end(result);
})
app.listen(port,()=>{
    console.log(`server is running on ${port}`)
})