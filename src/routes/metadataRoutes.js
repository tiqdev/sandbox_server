const express = require('express');
const axios = require("axios");
const cheerio = require("cheerio");

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        "data": "Welcome to metadata api!"
    });
})

const headers = {
    "Content-Type": "text/html; charset=utf-8",
};

router.post('/', async (req, res) => {
    const { url } = req.body;
    const response = await axios
        .get(url, headers)
        .then(async (response) => {
            console.log(response, "-----> response")

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

            let image;
            if (title?.toLocaleLowerCase().includes("amazon.com")) {
                image = $('img[id="landingImage"]').attr("src")
            } else {
                if ($('meta[property="og:image:secure_url"]').attr("content") === undefined) {
                    image = $('meta[property="og:image"]').attr("content") ||
                        $('meta[property="og:image:url"]').attr("content");
                } else {
                    image = $('meta[property="og:image:secure_url"]').attr("content");
                }

                if (image) {
                    if (image.startsWith("//")) {
                        image = "https:" + image;
                    }
                    if (!image.includes("http")) {
                        image = protocol + "//" + host + image;
                    }
                }
            }

            let icon =
                $('link[rel="icon"]').attr("href") ||
                $('link[rel="shortcut icon"]').attr("href");

            if (icon) {
                if (icon.startsWith("//")) {
                    icon = "https:" + icon
                }
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
            console.log(error.message, "error")
            console.error("Error fetching the page: ", error.message);
            return null;
        });


    if (response === null) {
        console.log(response, "response")
        res.json({
            "error": "you have to give url!"
        })
    }
    res.json(response);
});



module.exports = router;
