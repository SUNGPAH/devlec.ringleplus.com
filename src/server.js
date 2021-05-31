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

const db = require("../models");

app.get("/", async(req, res) => {
  console.log("---")
  const user = await db.User.findOne({});
  res.json({message: "Welcome", firstUser: user})
})

//3. get course with currentClipId
app.get('/getCourseWithCurrentClipId', async(req, res) => {
  const userId = 1
  const courseId = req.params.courseId
  const userCourse = await UserCourse.findOne({where: userId, courseId: courseId})
  
  //course정보 -> clip까지 모두다...
  const courseClips = await CourseClip.findAll({where: {courseId: courseId}})
  const userCourseClips = await UserCourseClip.findAll({where: {
    courseClipId: courseClips.map(courseClip => courseClip.id),
    userId: userId
  }})
  
  const _courseClips = courseClips.map(courseClip => {

    const userCourseClip = userCourseClips.findOne({where: {courseClipId: courseClip.id}})
    const values = courseClip.dataValues
    values.userCourseClip = userCourseClip
    return values
  })

  res.send({success: true, courseClips: _courseClips })
}); 

//8.
app.get('/mark', async (req, res) => {
});

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
app.get('/getCourseClip/:id', async(req, res) => {
  const courseClipId = req.params.id
  
  const courseClip = await db.CourseClip.findOne({where: {id: courseClipId}})
  res.send({success: true, courseClip: courseClip })
}); 

//add course clip to course
app.get('/addCourseClipToCourse', async(req, res) => {
  const courseId = 1
  const payload = {
    courseId: courseId,
    title: "brbrbnr",
    documentUrl: "brbrbr",
  }

  const courseClip = await db.CourseClip.create(payload)
  res.send({success: true, courseClip: courseClip })
}); 

//remove course clip from course
app.get('/removeCourseClipFromCourse/:id', async(req, res) => {
  const courseClipId = req.params.id 
  const record = await db.CourseClip.findOne({where: {id: courseClipId}})
  if(record){
    await record.destroy();
    res.send({success: true})
  }else{
    res.send({success: true, message: "already deleted"})
  }
}); 

//modify course clip
app.get("/modifyCourseClip/:courseClipId", async(req, res) => {
  const courseClipId = req.params.courseClipId
  
  const courseClip = await db.CourseClip.findOne({where: {id: courseClipId}})
  const payload = {title: "이거로 수정해보자."}

  const key = "title"
  courseClip[key] = "asdfasdf"


  await courseClip.save()

  res.send({success: true, message: "good"})
})

//modify Program
