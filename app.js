const express = require('express');
const app = express();
const port = 5501;
const host = '127.0.0.1';

//Данные
const keywordsToUrls = {
  'audi': ['https://www.autostat.ru/application/includes/blocks/big_photo/images/cache/000/116/597/494654e1-670-0.jpg', 'https://motor.ru/thumb/1500x0/filters:quality(75):no_upscale()/imgs/2023/07/22/06/6015915/066266249b0e5b4779200f9033da33ff79057807.jpg'],
  'bmw': ['https://cdn.kodixauto.ru/media//media/resized_image/webp/664a02178a0342ad02705fed/1200/0', 'https://cdn.kodixauto.ru/media//media/resized_image/webp/6601f50c33b584ec452e8671/1200/0'],
  'mercedes': ['https://sales.mercedes-olimp-neva.ru/images/models/image_mini/crop_cla_cupe270.jpg', 'https://sales.mercedes-olimp-neva.ru/images/models/image_mini/crop_crop_glc_coupe_min.jpg']

};

app.use(express.static('public'));

app.get('/search/:keyword', (req, res) => {
  const keyword = req.params.keyword;
  const urls = keywordsToUrls[keyword];
  if (urls) {
    res.json(urls);
  } else {
    res.status(404).send('Ключевое слово не найдено');
  }
});

app.listen(port, host, () => {
  console.log(`Сервер запущен по адресу: http://${host}:${port}`);
});

app.get('/download/:url', async (req, res) => {
  const url = req.params.url;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const content = await response.text();
      res.send(content);
    } else {
      res.status(response.status).send(response.statusText);
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});