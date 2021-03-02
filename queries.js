const mongoose = require('./db');
const News = require('./schemas/news');

async function getNews() {
  let news = await News.find();
  return news;
}

async function removeNews(id) {
  let result = await News.deleteOne({_id: id});
  return result;
}

async function updateNews(id, update) {
  let document = await News.findOneAndUpdate({_id: id}, update);
  return document;
}

async function createNews(data) {
  let result = await News.create(data);
  return result;
}

async function getNewsByCategory(category) {
  let news = await News.find({category: category});
  return news;
}

module.exports = {
  getNews,
  removeNews,
  updateNews,
  createNews,
  getNewsByCategory,
}