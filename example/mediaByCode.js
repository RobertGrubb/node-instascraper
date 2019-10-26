const InstaScraper = require('./../lib');

InstaScraper.getMediaByCode('BotyCz3HbJy')
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
