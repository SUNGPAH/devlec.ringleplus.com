const db = require("../../models");
const { v4: uuidv4 } = require('uuid');
const jwtHelper = require("../lib/jwtHelper");

const Comment = db.comment 


const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { S3Client, GetObjectCommand, PutObjectCommand, PutObjectAclCommand, PutObjectAclRequest} = require('@aws-sdk/client-s3');
const { fromIni } = require('@aws-sdk/credential-provider-ini');

/*
  const client = new S3Client({ region: "ap-northeast-2", credentials: {
      accessKeyId: "AKIAYZXZIA3N4X5TSNA2", secretAccessKey: "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"}
  });
*/

exports.list = async(req, res) => {

  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;
  
  const programType = "Client"
  // const programType = req.params.programType;
  const courses = await db.Course.findAll({raw:true, where: {programType: programType}, order: [['courseOrder', 'ASC']]})

  if (courses.length === 0){
    res.json({success: false})
    return
  }

  console.log('1o298319280391820938');
  console.log(courses);

  if(userId){
    const userCourses = await db.UserCourse.findAll({where: {userId: userId, courseId: courses.map(course => course.id)}})
    const _courses = courses.map(course => {
      userCourse = userCourses.find(userCourse => userCourse.courseId === course.id)    
      course.userCourse = userCourse
  
      return course
    })  

    res.json({ message: "Welcome to our application.", courses: _courses});
  }else{
    res.json({ message: "Welcome to our application.", courses: courses});
  }
}

exports.get = async(req,res) => {
  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;
  const courseId = parseInt(req.params.courseId)
  const courseClips = await db.CourseClip.findAll({raw: true, where: {courseId: courseId}})
  const course = await db.Course.findOne({raw: true, where: {id: courseId}})
  
  if(!course){
    res.send({success: false, message: "not found"})
    return
  }

  if(userId) {
    const userCourse = await db.UserCourse.findOne({where: {userId: userId, courseId: courseId}})

    const userCourseClips = await db.UserCourseClip.findAll({where: {
      courseClipId: courseClips.map(courseClip => courseClip.id),
      userId: userId
    }})
    
    const _courseClips = courseClips.map(courseClip => {
      const userCourseClip = userCourseClips.find(ucc => ucc.courseClipId === courseClip.id)
      courseClip.userCourseClip = userCourseClip
      
      return courseClip
    })  

    course.userCourse = userCourse

    res.send({success: true, courseClips: _courseClips, course: course })

  }else{
    res.send({success: true, courseClips: courseClips, course: course })
  }
  
}

exports.add = async(req,res) => {
  const payload = req.body.payload
  const course = await db.Course.create(payload)
  res.send({success: true, course: course })  
}

exports.modify = async(req,res) => {
  const payload = req.body
  const course = await db.Course.findOne({where: {id: req.params.courseId}})
  if(!course){
    res.send({success: false, message: 'no course'})  
    return
  }

  console.log(payload);

  Object.keys(payload).forEach((key,index) => {
    course[key] = payload[key]
  })  

  await course.save();

  res.send({success: true, course: course})
}

exports.remove = async(req,res) => {

  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;
  
  if(!userId){
    res.send({success: false})
    return
  }

  const course = await db.Course.findOne({where: {id: req.params.courseId}})

  if(course){
    await course.destroy();
    res.send({success: true})
  }else{
    res.send({success: true, message: "already deleted"})
  }
}

//api/course/drop/5
exports.drop = async(req, res) => {
  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;
  const courseId = req.params.courseId

  if(!userId){
    res.send({success: false, message: "not logged in"})
    return
  }

  await db.UserCourse.destroy({where: {userId: userId, courseId: courseId}});

  res.send({success: true, message: "deleted"})
}

exports.apply = async(req, res) => {
  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;

  if(!userId){
    res.send({success: false, message: "not logged in"})
    return
  }

  const courseId = req.params.courseId

  let userCourse = await db.UserCourse.findOne({where: {
    userId: userId,
    courseId: courseId
  }})

  if (!userCourse){
    userCourse = await db.UserCourse.create({
      userId: userId,
      courseId: courseId, 
      progress: 0,
    })
  }

  res.send({success: true, userCourse: userCourse})
}

exports.qnas = async(req,res) => {
  res.send({success: true, qnas: []})
}

exports.mycourses = async(req,res) => {
  const decoded = await jwtHelper.decodeHelper(req);
  const userId = decoded.userId;

  if(!userId){
    res.send({success: false, message: "not logged in"})
    return
  }

  const userCourses = await db.UserCourse.findAll({raw: true,where: {userId: userId}})
  const courseIds = userCourses.map(x => x.courseId)
  const courses = await db.Course.findAll({raw: true, where: {id: courseIds}})
  const userReviews = await db.UserReview.findAll({where: {userId: userId}})

  const mycourses = userCourses.map(userCourse => {
    const course = courses.find(course => course.id === userCourse.courseId)
    const userReview = userReviews.find(userReview => userReview.courseId === userCourse.courseId)
    return {...course, userCourse: userCourse, userReview: userReview}
  })

  res.send({success: true, mycourses: mycourses})
}

exports.getUploadableImgUrl = async(req,res) => {
  const client = new S3Client({ region: "ap-northeast-2", credentials: {
    accessKeyId: "AKIAYZXZIA3N4X5TSNA2", secretAccessKey: "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"}});

  const uuid = uuidv4();
  const command = new PutObjectCommand({Bucket: "ringle-document-resource", Key: uuid});

  const url = await getSignedUrl(client, command, {expiresIn: 300}); //300초 인가...?이미지는 삭제할 것인가?
  res.send({
    success: true,
    url: url,
    uuid: uuid, 
  });
}

exports.grantImgPermission = async(req,res) => {
  const uuid = req.body.uuid;
  const client = new S3Client({ region: "ap-northeast-2", credentials: {
    accessKeyId: "AKIAYZXZIA3N4X5TSNA2", secretAccessKey: "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"}});

  const command = new PutObjectAclCommand({Bucket: "ringle-document-resource", Key: uuid,
    ACL: "public-read"
  }); //uuid public.. -> 

  const data = await client.send(command);
  res.send({success: true})
}

//client upload first.

