const superagent = require('superagent');
const cheerio = require('cheerio');
const sqlService = require('../store')
const qs = require('querystring')

module.exports = function () {
  superagent.get('https://list.mi.com').end((err, resp) => {
    if (err) {
      console.log(`小米列表抓取失败 - ${err}`)
    } else {
      let $ = cheerio.load(resp.text);
      const list = []
      $('.category-list .box-bd li').each(function (index, domEle) {
        const title = $(domEle).find('.category-list-title').text()
        const link = $(domEle).find('.category-list-img').attr('href')
        const image = $(domEle).find('img').attr('src')
        const category = $(domEle).parents('.category-list').find('h2').text().slice(1)
        const cid = qs.parse(link.split('?')[1]).selected || ''
        list.push(`('${title}', 0, '${link}', '${image}', '${cid}', '${category}')`)
      })
      let sql = 'INSERT INTO xiaomi (title, price, link, image, cid, category) VALUES '+list.join(',')
      sqlService.query(sql).then(row => {
        console.log(row)
      }).catch(e=>{
        console.log(e)
      })
    }
  });
}