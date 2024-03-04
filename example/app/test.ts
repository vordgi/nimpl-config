const {search} = require('ommy/notion');

const test = async () => {
    const s = await search('What is vercel?', 'v02%3Auser_token_or_cookies%3ADRM26BNprUD_5xawO6ADQuFSlWyaZH03zqRSnTgXjZ0Rcxq8D0hsFdV6-RGdABL7wGH4eyOcJwNEw8oDaRR8fvl8JKEG0g4QioNT5cdXmMpwAHch93NdxpVvUsbDijga5mWV');
    console.log(s);
}

test();
