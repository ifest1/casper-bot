const { createCarousel, createCard } = require('../templates/generic');
const News = require('../schemas/news');
const { getNewsByCategory } = require('../queries');

async function dialogController(req, res) {
  let category = req.body.queryResult.queryText;
  let news = await getNewsByCategory(category);
  console.log(news);
  let cards = [];
  news.forEach((item) => {
    cards.push(createCard
               (item.title,
                item.description,
                item.img_url,
                item.news_url
                )
            );
      })
  res.json({"fulfillmentMessages": [{"payload": createCarousel(cards)}]});
}

module.exports = dialogController;