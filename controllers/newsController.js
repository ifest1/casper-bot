const { getNews, createNews, removeNews, updateNews, getNewsByCategories } = require('../queries');

  async function index(req, res) {
    let news = await getNews();
    res.json(news);
  }
  
  async function store(req, res) {
    let news = await createNews(req.body);
    res.json(news);
  }
  
  async function remove(req, res) {
    let id = req.params.id;
    if (await removeNews(id)) {
      return res.status(204);
    }
    return res.status(400);
  }
  
  async function update(req, res) {
    let id = req.params.id;
    console.log(id, req.body);
    
    let result = await updateNews(id, req.body);
    res.json(result);
  }

module.exports = {
  index,
  store,
  remove,
  update
}