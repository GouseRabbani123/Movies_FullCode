// const express = require('express');
// //step1 after creating the API
// require('./database/config');
// const User = require('./database/User')
// const app = express();
// app.use(express.json())
// app.get('/',(req,res)=>{
//     res.send("API is working fine")
// });
// app.post('/signup',async (req,res)=>{
//     let user = new User(req.body)
//     let result = await user.save();
//     res.send(result)
// })
// app.listen(4000)

//Main

const express = require('express');
const app = express();
const cors = require('cors')
require('./db/config');
const User = require('./db/User')
app.use(express.json());
app.use(cors(   ))
//signup API
app.post('/signup',async (req,res)=>{
let user = new User(req.body);
let result = await user.save();
   result = result.toObject();
    delete result.password;
    res.send(result);
})
//Login API
app.post('/login', async (req,res)=>{
    if(req.body.email&& req.body.password){
    let user = await  User.findOne(req.body).select("-password");
      
    if(user){
        res.send(user);
    }
    else{
        res.send({result:"No User Found"})
    }
}
else{
    res.send({result:"No User Found"})
}
})

app.listen(6500);


