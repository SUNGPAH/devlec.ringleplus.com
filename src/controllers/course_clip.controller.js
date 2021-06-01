const db = require("../../models");
const { v4: uuidv4 } = require('uuid');
const jwtHelper = require("../lib/jwtHelper");

const Comment = db.comment 

exports.get = async(req, res) => {
  const courseClipId = req.params.courseClipId
  
  const courseClip = await db.CourseClip.findOne({where: {id: courseClipId}})
  res.send({success: true, courseClip: courseClip })
}

exports.add = async(req, res) => {
  const courseId = req.body.courseId
  const payload = {
    courseId: courseId,
    title: req.body.title,
    description: req.body.description,
    documentUrl: req.body.documentUrl
  }

  const courseClip = await db.CourseClip.create(payload)
  res.send({success: true, courseClip: courseClip })
}

exports.remove = async(req, res) => {
  const courseClipId = req.params.courseClipId 
  const record = await db.CourseClip.findOne({where: {id: courseClipId}})
  if(record){
    await record.destroy();
    res.send({success: true})
  }else{
    res.send({success: false, message: "already deleted"})
  }
}

exports.modify = async(req, res) => {
  const courseClipId = req.params.courseClipId
  
  const courseClip = await db.CourseClip.findOne({where: {id: courseClipId}})

  // const payload = {title: "이거로 수정해보자."}
  const payload = req.body.payload; //이게 뭐 이터레이션이 도는거지뭐

  // const key = "title"
  // courseClip[key] = "asdfasdf"

  Object.keys(payload).forEach((key,index) => {
    courseClip[key] = payload[key]
  })  


  await courseClip.save()

  res.send({success: true, message: "good"})
}