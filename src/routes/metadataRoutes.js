const express = require('express');
const axios = require("axios");
const cheerio = require("cheerio");

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        "data": "Welcome to metadata api!"
    });
})

router.post('/', async (req, res) => {
    const { url } = req.body;
    const response = await axios
        .get(url)
        .then(async (response) => {

            // HTML içeriğini alın
            const htmlContent = response.data;
            const protocol = response.request.protocol;
            const host = response.request.host;

            let metatags;
            // Cheerio kullanarak HTML içeriğini parse edin
            const $ = cheerio.load(htmlContent);
            const title =
                $('meta[property="og:title"]').attr("content") ||
                $("title").text() ||
                $('meta[name="title"]').attr("content");
            const description =
                $('meta[property="og:description"]').attr("content") ||
                $('meta[name="description"]').attr("content");
            const url = $('meta[property="og:url"]').attr("content");
            const site_name = $('meta[property="og:site_name"]').attr("content");
            const image =
                $('meta[property="og:image"]').attr("content") ||
                $('meta[property="og:image:url"]').attr("content");
            let icon =
                $('link[rel="icon"]').attr("href") ||
                $('link[rel="shortcut icon"]').attr("href");

            if (icon) {
                if (!icon.includes("http")) {
                    icon = protocol + "//" + host + icon;
                }
            }

            const keywords =
                $('meta[property="og:keywords"]').attr("content") ||
                $('meta[name="keywords"]').attr("content");

            // Meta etiketlerini seçin
            metatags = {
                title,
                description,
                url,
                site_name,
                image,
                icon,
                keywords
            };
            return metatags;
        })
        .catch((error) => {
            console.error("Error fetching the page: ", error);
            return null;
        });

    const _data = await response;
    if (response === null) {
        res.json({
            "error": "you have to give url!"
        })
    }
    res.json(_data);
});



module.exports = router;
