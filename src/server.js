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

require('./routes/auth.routes')(app);
require('./routes/course.routes')(app);
require('./routes/course_clip.routes')(app);
require('./routes/user_course.routes')(app);
require('./routes/comment.routes')(app);

const db = require("../models");

app.get("/", async(req, res) => {
  console.log("---")
  const user = await db.User.findOne({});
  res.json({message: "Welcome", firstUser: user})
})

//Program 관련 
//프로그램은 총 네종류가 있음. Client, Server, DevOps, FullStack -> 이걸 구지 레코드를 만들진 않음.
