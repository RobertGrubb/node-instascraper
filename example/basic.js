const InstaScraper = require('./../lib');

InstaScraper.getUserByUsername('_mattGrubb')
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
