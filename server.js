const Express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const PostModel = require("./Model.js")
const app = Express()
app.use(Express.json({limit:"30mb",extended:true}))
app.use(cors())
const DATABASE=process.env.DATABASE

app.listen(process.env.PORT || 4000,(err)=>{
  if(!err){
    console.log('server is connected')
  }else{
    console.log(err);
  }
});
// mongoose.connect("mongodb://localhost/instacopy",()=>{
//   console.log('connected to db');
// },(err)=>{
//   console.log(err);
// })
mongoose.connect(`${DATABASE}`,()=>{
  console.log('connected to db');
},(err)=>{
  console.log(err);
})

 app.get("/",(req,res)=>{
    PostModel.find().then((posts)=>{
        res.status(200).json(posts)
    }).catch((err)=>{
        res.status(400).send("Request Failed")
    })
 })

app.post("/",(req,res)=>{
    const date = new Date
    let finalDate = date + "" //converting object to str
    finalDate = finalDate.split(" ");//string to array
    finalDate = finalDate.splice(1, 3).join(" "); //
  PostModel.create({
    Author : req.body.Author,
    Location : req.body.Location,
    image : req.body.image,
    likes : 15,
    date : finalDate,
    Description : req.body.Description
  }).then((post)=>{
    res.status(200).send("Post Uploaded SucessFully")
  }).catch((err)=>{
    res.status(400).send("Request Failed")
  })
})

