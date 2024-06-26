'use strict';

const { ReviewImage } = require('../models');

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA;
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {

    await ReviewImage.bulkCreate(
      [
        {
          reviewId: 1,
          url: 'image url 1'
        },
        {
          reviewId: 2,
          url: 'image url 2'
        },
        {
          reviewId: 3,
          url: 'image url 3'
        },
        {
          reviewId: 4,
          url: 'image url 4'
        },
        {
          reviewId: 5,
          url: 'image url 5'
        },
        {
          reviewId: 6,
          url: 'image url 5'
        },
        {
          reviewId: 7,
          url: 'image url 5'
        },
        {
          reviewId: 8,
          url: 'image url 5'
        },
        {
          reviewId: 9,
          url: 'image url 5'
        },
        {
          reviewId: 10,
          url: 'image url 5'
        },
        {
          reviewId: 11,
          url: 'image url 5'
        },
        {
          reviewId: 12,
          url: 'image url 5'
        },
        {
          reviewId: 13,
          url: 'image url 5'
        },
        {
          reviewId: 14,
          url: 'image url 5'
        },
        {
          reviewId: 15,
          url: 'image url 5'
        },
        {
          reviewId: 16,
          url: 'image url 6'
        },
        {
          reviewId: 17,
          url: 'image url 7'
        },
        {
          reviewId: 18,
          url: 'image url 8'
        },
        {
          reviewId: 19,
          url: 'image url 9'
        },
        {
          reviewId: 20,
          url: 'image url 10'
        },
        {
          reviewId: 21,
          url: 'image url 11'
        },
        {
          reviewId: 22,
          url: 'image url 12'
        },
        {
          reviewId: 23,
          url: 'image url 13'
        },
      ]
    )


  },

  async down (queryInterface, Sequelize) {

    options.tableName = 'ReviewImages';
    const Op = Sequelize.Op;

    await queryInterface.bulkDelete(options, {}, {});
  }
};
