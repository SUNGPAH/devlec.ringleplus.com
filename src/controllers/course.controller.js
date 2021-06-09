const db = require("../../models");
const { v4: uuidv4 } = require('uuid');
const jwtHelper = require("../lib/jwtHelper");

const Comment = db.comment 
const Course = db.Course
const CourseClip = db.CourseClip

const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const { S3Client, GetObjectCommand, PutObjectCommand, PutObjectAclCommand, PutObjectAclRequest} = require('@aws-sdk/client-s3');
const { fromIni } = require('@aws-sdk/credential-provider-ini');

const AccessKeyId = "AKIAYZXZIA3N4X5TSNA2";
const SecretAccessKey = "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";

exports.init = async(req,res) => {
  let payload = {
    title: "Javascript Basics",
    subtitle: "자바스크립트 주로 쓰는 문법들만 빠르게 리뷰",
    description: "Javascript가 아직 익숙치 않거나 다시 한 번 정리하기 원하시는 분들을 위한 자료",
    totalEstimatedMin: 120,
    courseOrder: 1,
    programType: "Client",
    imgUrl: "https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/devlect/devlect_javascript.png",
    difficulty: "basic",
    preparation: "필요한 선수지식은 없습니다",
    learning: "리액트나 바닐라 자바스크립트로 작업을 하기 위한 기초적인 문법들을 배울 수 있게 됩니다.",
    uuid: uuidv4()
  }

  let course = await Course.create(payload)
  
  let courseClip = await CourseClip.create({
    courseId: course.id,
    title: "Javascript Document",
    description: "전체 강의 문서 형태 정리 자료 입니다.",
    imgUrl: null,
    voidUuid: null,
    estimatedMin: 60,
    documentUrl: "https://dev-recruiting.ringleplus.com/5324ade8-2fa7-4c04-bd15-2c0bebac78db"
  })  

  ////////////////////////////////////////////////////////////////////////////////////  

  payload = {
    title: "HTML Basics",
    subtitle: "HTML의 기초에 대한 자료 입니다.",
    description: "HTML에 대한 기초적인 이해를 돕는 자료 입니다.",
    totalEstimatedMin: 90,
    courseOrder: 2,
    programType: "Client",
    imgUrl: "https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/devlect/devlect_html.png",
    difficulty: "basic",
    preparation: "필요한 선수지식은 없습니다.",
    learning: "클라이언트 프로그래밍을 위한 기본적은 HTML element들을 이해할 수 있습니다.",
    uuid: uuidv4()
  } 

  course = await Course.create(payload)
  courseClip = await CourseClip.create({
    courseId: course.id,
    title: "HTML Document",
    description: "전체 강의 문서 형태 정리 자료 입니다.",
    imgUrl: null,
    voidUuid: null,
    estimatedMin: 60,
    documentUrl: "https://www.notion.so/ringle/html-with-React-95131e6513a8446fb82eaee038e0bee9"
  })  

  ////////////////////////////////////////////////////////////////////////////////////
  payload = {
    title: "심플 챗팅 앱 with React in Firebase",
    subtitle: "Firebase를 활용한 간단한 채팅앱 만들기",
    description: "리액트의 기초를 다루며 파이어베이스를 통해 Authentication 그리고 Firestore를 활용하여 간단한 데이터 베이스 활용을 배우게 됩니다.",
    totalEstimatedMin: 120,
    courseOrder: 3,
    imgUrl: "https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/devlect/devlect_firebase.png",
    programType: "Client",
    difficulty: "basic",
    preparation: "Javascript에 대한 기본적인 이해가 필요합니다.",
    learning: "리액트의 기초 (useState, useEffect) 그리고 간단한 서비스 구성에 대한 러닝을 할 수 있습니다",
    uuid: uuidv4()
  }
  course = await Course.create(payload)

  await CourseClip.create({
    courseId: course.id,
    title: "Firebase React Chat App Document",
    description: "전체 강의 문서 형태 정리 자료 입니다.",
    voidUuid: null,
    estimatedMin: 60,
    documentUrl: "https://www.notion.so/ringle/React-Basics-Firebase-Documents-403af58c059141578c9576ec3bba5948"
  })  


  await CourseClip.create({
    courseId: course.id,
    title: "useState, useEffect",
    description: "",
    voidUuid: "something",
    estimatedMin: 60,
  })  

  await CourseClip.create({
    courseId: course.id,
    title: "FireBase, FireStore",
    description: "",
    voidUuid: "something",
    estimatedMin: 60,
  })  

  await CourseClip.create({
    courseId: course.id,
    title: "Auth",
    description: "",
    voidUuid: "something",
    estimatedMin: 60,
  })  
  ////////////////////////////////////////////////////////////////////////////////////
  payload = {
    title: "파이어 베이스로 프로덕션까지",
    subtitle: "나의 파이어 베이스 프로젝트 직접 디플로이까지 해보기 (deploy)",
    description: "나의 리액트 프로젝트를 로컬 환경에서 파이어베이스 클라우드에 디플로이를 하는 과정을 배울 수 있습니다.",
    totalEstimatedMin: 30,
    courseOrder: 4,
    imgUrl: "https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/devlect/devlect_firebase_deploy.png",
    programType: "Client",
    difficulty: "basic",
    preparation: "terminal에 대한 이해가 필요합니다. (powershell or iterm or etc)",
    learning: "실제 프로덕션구성 직전까지 무엇을 이해하고 있어야 하는지 배울 수 있습니다.",
    uuid: uuidv4()
  },

  course = await Course.create(payload)

  await CourseClip.create({
    courseId: course.id,
    title: "Firebase Auth, Store에 대해 조금더 자세히",
    description: "Firebase에 대해 조금더 자세히 기술 되어 있습니다.",
    voidUuid: null,
    estimatedMin: 60,
    documentUrl: "https://www.notion.so/ringle/Firebase-Firestore-NoSql-Auth-779ae1c1cd674e35b3992daa570b64a9"
  })  

  await CourseClip.create({
    courseId: course.id,
    title: "Firebase Deploy",
    description: "파이어베이스에 올리는 과정을 상세히 기술하였습니다.",
    voidUuid: null,
    estimatedMin: 60,
    documentUrl: "https://www.notion.so/ringle/Firebase-Deploy-22db9ee248164d209cf77a5c1afdcdb2"
  })  

  ////////////////////////////////////////////////////////////////////////////////////
  payload = {
    title: "리액트 기초 - Array 활용하기",
    subtitle: "리액트에서 어레이 헷갈리지 않고 잘 활용하기!",
    description: "변수와 스테이트에 대해 다시 한 번 생각할 수 있게 됩니다.",
    totalEstimatedMin: 30,
    courseOrder: 5,
    imgUrl: "https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/devlect/devlect_react_array.png",
    programType: "Client",
    difficulty: "basic",
    preparation: "Javascript에 대한 이해, 그리고 리액트의 기초를 알고 있어야 합니다.",
    learning: "완전 카피, Immutability에 대한 이해를 할 수 있게 됩니다.",
    uuid: uuidv4()
  }

  course = await Course.create(payload)
  await CourseClip.create({
    courseId: course.id,
    title: "리액트 어레이에 대한 설명 Document",
    description: "리액트 어레이에 대한 설명 Document",
    voidUuid: null,
    estimatedMin: 60,
    documentUrl: "https://www.notion.so/ringle/array-52466c8961c64ddeb6c4474594ec1a31"
  })  
  ////////////////////////////////////////////////////////////////////////////////////
  payload = {
    title: "CSS 기초",
    subtitle: "간단하게 CSS 오버뷰를 하는 자료 입니다.",
    description: "css의 전체를 다루지는 않지만, 기본적으로 노션이나, Airbnb를 만들때에 필요한 css등의 기본적인 것들은 다룹니다",
    totalEstimatedMin: 30,
    courseOrder: 6,
    imgUrl: "https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/devlect/devlect_css.png",
    programType: "Client",
    difficulty: "basic",
    preparation: "필요한 선수지식은 없습니다.",
    learning: "",
    uuid: uuidv4()
  }
  course = await Course.create(payload)
  await CourseClip.create({
    courseId: course.id,
    title: "css basics에 대한 document",
    description: "css를 처음 하는 사람을 위한 자료",
    voidUuid: null,
    estimatedMin: 60,
    documentUrl: "https://www.notion.so/ringle/CSS-Basics-8f83e60901bb4aeaabae6d53205b4cc0"
  })  

  await CourseClip.create({
    courseId: course.id,
    title: "css a bit advanced",
    description: "css 심화",
    voidUuid: null,
    estimatedMin: 60,
    documentUrl: "https://www.notion.so/ringle/Custom-CheckBox-eb0708bcedf94ad0b9c977f0a8bc3e0d"
  })  
  ////////////////////////////////////////////////////////////////////////////////////
  payload = {
    title: "리액트 - Redux",
    subtitle: "레덕스에 대한 전체적인 이해를 돕는 자료",
    description: "",
    totalEstimatedMin: 30,
    courseOrder: 7,
    imgUrl: "https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/devlect/devlect_react_redux.png",
    programType: "Client",
    difficulty: "basic",
    preparation: "",
    learning: "레덕스가 왜 필요한지, 그리고 프로덕션에서 필요한 정도의 레덕스의 기본적인 구조를 배울 수 있습니다.",
    uuid: uuidv4()
  }
  course = await Course.create(payload)
  await CourseClip.create({
    courseId: course.id,
    title: "레덕스 basics Document",
    description: "레덕스 basics Document",
    voidUuid: null,
    estimatedMin: 60,
    documentUrl: "https://www.notion.so/ringle/Redux-66a157f5aca14f9eb925eee92351c303"
  })  
  ////////////////////////////////////////////////////////////////////////////////////
  payload={
    title: "리액트 실습 with Ringle API",
    subtitle: "링글 랜딩 페이지중 일부를 redux없이, 그리고 redux를 활용해서 구성해보는 실습입니다",
    description: "API활용과 페이지 구성, 그리고 css를 활용하는 client의 전체적인 내용을 다룹니다.",
    totalEstimatedMin: 30,
    courseOrder: 8,
    imgUrl: "https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/devlect/devlect_ringle.png",
    programType: "Client",
    difficulty: "basic",
    preparation: "javascript에 대한 이해, 리액트에 대한 기초, 리액트 레덕스에 대한 기초를 알고 있어야 합니다.",
    learning: "그동안 학습한 내용을 바탕으로 모두 묶어 내어 이해를 한 층더 높일 수 있는 자료 입니다.",
    uuid: uuidv4()
  }
  
  course = await Course.create(payload)
  await CourseClip.create({
    courseId: course.id,
    title: "링글 랜딩 만들기 without Redux document",
    description: "링글 랜딩 만들기 without Redux",
    voidUuid: null,
    estimatedMin: 60,
    documentUrl: "https://www.notion.so/ringle/Redux-with-19e1786fbc6c4e0dbf7f4999832b4117"
  })  

  await CourseClip.create({
    courseId: course.id,
    title: "링글 랜딩 만들기 with Redux document",
    description: "링글 랜딩 만들기 with Redux",
    voidUuid: null,
    estimatedMin: 60,
    documentUrl: "https://www.notion.so/ringle/Ringle-Landing-With-Redux-50893b2b13ba435ba6e721e9a67f05e8"
  })  
  ////////////////////////////////////////////////////////////////////////////////////
  payload = {
    title: "NextJS 활용하기",
    subtitle: "Serverside rendering을 위한 방법중 하나인 NextJS에 대해서 배울 수 있습니다.",
    description: "로컬 환경에서 nextjs를 구성하고, vercel을 통해 deploy를 하는 간단한 과정을 배웁니다.",
    totalEstimatedMin: 30,
    courseOrder: 9,
    programType: "Client",
    imgUrl: "https://ringleimageassets.s3.ap-northeast-2.amazonaws.com/devlect/devlect_nextjs.png",
    difficulty: "intermediate",
    preparation: "SPA (single page application)으로 간단한 리액트 프로젝트를 구성해본 경험이 필요합니다.",
    learning: "Serverside Rendering을 위한 다른 framework을 배울 수 있습니다.",
    uuid: uuidv4()
  }
  course = await Course.create(payload)
  await CourseClip.create({
    courseId: course.id,
    title: "NextJS startup document",
    description: "NextJS의 시작부터 프로덕션 까지",
    voidUuid: null,
    estimatedMin: 60,
    documentUrl: "https://www.notion.so/ringle/Nextjs-sass-serverside-2bb21e7d480e445ca275e9d6acb9cb76"
  })  

  res.send({success: true})
}

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

exports.removeAll = async(req, res) => {
  await db.Course.destroy({where:{}, truncate:true})
  await db.CourseClip.destroy({where:{}, truncate:true})
  await db.UserCourse.destroy({where:{}, truncate:true})
  await db.UserCourseClip.destroy({where:{}, truncate:true})
  res.send({success: true, message: "already deleted"})
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
    accessKeyId: AccessKeyId, secretAccessKey: SecretAccessKey}});

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
    accessKeyId: AccessKeyId, secretAccessKey: SecretAccessKey}});

  const command = new PutObjectAclCommand({Bucket: "ringle-document-resource", Key: uuid,
    ACL: "public-read"
  }); //uuid public.. -> 

  const data = await client.send(command);

  const course = await db.Course.findOne({where:{id: req.body.courseId}})
  course.imgUrl = `https://ringle-document-resource.s3.ap-northeast-2.amazonaws.com/${uuid}`
  await course.save()

  res.send({success: true, course: course})
}

//client upload first.

