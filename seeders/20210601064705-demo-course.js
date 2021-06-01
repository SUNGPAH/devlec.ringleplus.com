'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Courses', [{
      title: "Javascript Basics (1~2 hours )",
      description: "기본적인 자바스크립트를 알고 있다면 패스 하셔도 됩니다.",
      imgUrl: "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3a8beac3-10cb-4cdc-a7eb-d366a750cb43%2FWhy-ReactJS-Should-be-a-Perfect-Choice-for-Your-Next-Front-end-Application-Banner.jpeg?table=block&id=403af58c-0591-4157-8c95-76ec3bba5948&spaceId=7a778b56-ea28-42b3-8e99-1b230a60ea73&width=600&userId=b45acfbc-7020-4b03-b43e-bad44ef0d554&cache=v2",
      totalEstimatedMin: 30,
      courseOrder: 5,
      programType: "Client",
    },{
      title: "과제 - Promise를 활용한 간단한 과제",
      description: "기본을 들었다면 도전!",
      imgUrl: "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3a8beac3-10cb-4cdc-a7eb-d366a750cb43%2FWhy-ReactJS-Should-be-a-Perfect-Choice-for-Your-Next-Front-end-Application-Banner.jpeg?table=block&id=403af58c-0591-4157-8c95-76ec3bba5948&spaceId=7a778b56-ea28-42b3-8e99-1b230a60ea73&width=600&userId=b45acfbc-7020-4b03-b43e-bad44ef0d554&cache=v2",
      totalEstimatedMin: 30,
      courseOrder: 5,
      programType: "Client",
    },{
      title: "과제 - Rock Scissors Paper",
      description: "Rock Scissors Paper!!",
      imgUrl: "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3a8beac3-10cb-4cdc-a7eb-d366a750cb43%2FWhy-ReactJS-Should-be-a-Perfect-Choice-for-Your-Next-Front-end-Application-Banner.jpeg?table=block&id=403af58c-0591-4157-8c95-76ec3bba5948&spaceId=7a778b56-ea28-42b3-8e99-1b230a60ea73&width=600&userId=b45acfbc-7020-4b03-b43e-bad44ef0d554&cache=v2",
      totalEstimatedMin: 30,
      courseOrder: 5,
      programType: "Client",
    },{
      title: "MukJiPa",
      description: "MukJiPa",
      imgUrl: "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3a8beac3-10cb-4cdc-a7eb-d366a750cb43%2FWhy-ReactJS-Should-be-a-Perfect-Choice-for-Your-Next-Front-end-Application-Banner.jpeg?table=block&id=403af58c-0591-4157-8c95-76ec3bba5948&spaceId=7a778b56-ea28-42b3-8e99-1b230a60ea73&width=600&userId=b45acfbc-7020-4b03-b43e-bad44ef0d554&cache=v2",
      totalEstimatedMin: 30,
      courseOrder: 5,
      programType: "Client",
    },{
      title: "기초 html 엘리먼트",
      description: "기초 html 엘리먼트",
      imgUrl: "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3a8beac3-10cb-4cdc-a7eb-d366a750cb43%2FWhy-ReactJS-Should-be-a-Perfect-Choice-for-Your-Next-Front-end-Application-Banner.jpeg?table=block&id=403af58c-0591-4157-8c95-76ec3bba5948&spaceId=7a778b56-ea28-42b3-8e99-1b230a60ea73&width=600&userId=b45acfbc-7020-4b03-b43e-bad44ef0d554&cache=v2",
      totalEstimatedMin: 30,
      courseOrder: 5,
      programType: "Client",
    },{
      title: "React 실습 with API (2 hours) with Ringle Landing Page",
      description: "React 실습 with API (2 hours)",
      imgUrl: "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3a8beac3-10cb-4cdc-a7eb-d366a750cb43%2FWhy-ReactJS-Should-be-a-Perfect-Choice-for-Your-Next-Front-end-Application-Banner.jpeg?table=block&id=403af58c-0591-4157-8c95-76ec3bba5948&spaceId=7a778b56-ea28-42b3-8e99-1b230a60ea73&width=600&userId=b45acfbc-7020-4b03-b43e-bad44ef0d554&cache=v2",
      totalEstimatedMin: 30,
      courseOrder: 5,
      programType: "Client",
    },{
      title: "work with array: add, delete, modify",
      description: "work with array: add, delete, modify",
      imgUrl: "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3a8beac3-10cb-4cdc-a7eb-d366a750cb43%2FWhy-ReactJS-Should-be-a-Perfect-Choice-for-Your-Next-Front-end-Application-Banner.jpeg?table=block&id=403af58c-0591-4157-8c95-76ec3bba5948&spaceId=7a778b56-ea28-42b3-8e99-1b230a60ea73&width=600&userId=b45acfbc-7020-4b03-b43e-bad44ef0d554&cache=v2",
      totalEstimatedMin: 30,
      courseOrder: 5,
      programType: "Client",
    },{
      title: "Html advanced",
      description: "Html advanced",
      imgUrl: "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3a8beac3-10cb-4cdc-a7eb-d366a750cb43%2FWhy-ReactJS-Should-be-a-Perfect-Choice-for-Your-Next-Front-end-Application-Banner.jpeg?table=block&id=403af58c-0591-4157-8c95-76ec3bba5948&spaceId=7a778b56-ea28-42b3-8e99-1b230a60ea73&width=600&userId=b45acfbc-7020-4b03-b43e-bad44ef0d554&cache=v2",
      totalEstimatedMin: 30,
      courseOrder: 5,
      programType: "Client",
    },{
      title: "Redux Basics",
      description: "Redux",
      imgUrl: "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3a8beac3-10cb-4cdc-a7eb-d366a750cb43%2FWhy-ReactJS-Should-be-a-Perfect-Choice-for-Your-Next-Front-end-Application-Banner.jpeg?table=block&id=403af58c-0591-4157-8c95-76ec3bba5948&spaceId=7a778b56-ea28-42b3-8e99-1b230a60ea73&width=600&userId=b45acfbc-7020-4b03-b43e-bad44ef0d554&cache=v2",
      totalEstimatedMin: 30,
      courseOrder: 5,
      programType: "Client",
    },{
      title: "Redux Practice with Ringle Landing Page",
      description: "Redux Practice with Ringle Landing Page",
      imgUrl: "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3a8beac3-10cb-4cdc-a7eb-d366a750cb43%2FWhy-ReactJS-Should-be-a-Perfect-Choice-for-Your-Next-Front-end-Application-Banner.jpeg?table=block&id=403af58c-0591-4157-8c95-76ec3bba5948&spaceId=7a778b56-ea28-42b3-8e99-1b230a60ea73&width=600&userId=b45acfbc-7020-4b03-b43e-bad44ef0d554&cache=v2",
      totalEstimatedMin: 30,
      courseOrder: 5,
      programType: "Client",
    },{
      title: "CSS - 1",
      description: "CSS",
      imgUrl: "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3a8beac3-10cb-4cdc-a7eb-d366a750cb43%2FWhy-ReactJS-Should-be-a-Perfect-Choice-for-Your-Next-Front-end-Application-Banner.jpeg?table=block&id=403af58c-0591-4157-8c95-76ec3bba5948&spaceId=7a778b56-ea28-42b3-8e99-1b230a60ea73&width=600&userId=b45acfbc-7020-4b03-b43e-bad44ef0d554&cache=v2",
      totalEstimatedMin: 30,
      courseOrder: 5,
      programType: "Client",
    },{
      title: "CSS - 2",
      description: "CSS - 2",
      imgUrl: "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3a8beac3-10cb-4cdc-a7eb-d366a750cb43%2FWhy-ReactJS-Should-be-a-Perfect-Choice-for-Your-Next-Front-end-Application-Banner.jpeg?table=block&id=403af58c-0591-4157-8c95-76ec3bba5948&spaceId=7a778b56-ea28-42b3-8e99-1b230a60ea73&width=600&userId=b45acfbc-7020-4b03-b43e-bad44ef0d554&cache=v2",
      totalEstimatedMin: 30,
      courseOrder: 5,
      programType: "Client",
    },{
      title: "NExtJS",
      description: "Next JS",
      imgUrl: "https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2F3a8beac3-10cb-4cdc-a7eb-d366a750cb43%2FWhy-ReactJS-Should-be-a-Perfect-Choice-for-Your-Next-Front-end-Application-Banner.jpeg?table=block&id=403af58c-0591-4157-8c95-76ec3bba5948&spaceId=7a778b56-ea28-42b3-8e99-1b230a60ea73&width=600&userId=b45acfbc-7020-4b03-b43e-bad44ef0d554&cache=v2",
      totalEstimatedMin: 30,
      courseOrder: 5,
      programType: "Client",
    }], {})


  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};


