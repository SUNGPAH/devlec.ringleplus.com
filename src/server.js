const express = require('express');
const cors = require('cors');

const port = 8000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}))
app.use(cors());
app.use('/static', express.static('public'));

app.listen(port, () => console.log(`server running up on port ${port}`));

require('./routes/course.routes')(app);
require('./routes/course_clip.routes')(app);

const db = require("../models");

app.get("/", async(req, res) => {
  console.log("---")
  const user = await db.User.findOne({});
  res.json({message: "Welcome", firstUser: user})
})

/*
1. get all courses under of "client" or "server" or "dev-ops" or "full-stack"
  - with user's records
  - done..

2. landing API 
  - upcoming study, past study

4. get comments with courseClipId 

5. submit comment 
6. submit reply
7. delete comment
------
*/
  
//get specific course clip about course clip about course clip about course clip about course clip about course clip about course clip 


//modify Program
