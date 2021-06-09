'use strict';

// {
//   title: "",
//   subtitle: "",
//   description: "",
//   totalEstimatedMin: ,
//   courseOrder: ,
//   programType: "",
//   difficulty: "",
//   preparation: "",
//   learning: "",
//   techStacks: [""]
// },
//여기에 맞춰서 자료를 만들자.
//이것보단..다르게 해야 할 것 같긴하다 지금 보면.

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Courses', [

    /*
      과제는 이제 
      1. 간단하게 프로미스로 과제하기 - 필요한 기술 courseId로 연결 시키기
      2. 묵찌빠 게임
      3. 구글 폼 만들기 
      4. 웹알티씨 만들기
      5. 기타 등등..
    */  
  ], {})
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


