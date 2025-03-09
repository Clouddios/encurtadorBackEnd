const express = require("express");
const router = express.Router();
const Link = require("../models/Link");
const shortid = require("shortid");

// Rota para criar um link encurtado
router.post("/encurtar", async (req, res) => {
    const { originalUrl } = req.body;

    if(!originalUrl) {
        return res.status(400).json({ error: "URL original não informada" });
    }

    try{
        const shortUrl = shortid.generate();
        const newLink = new Link({ originalUrl, shortUrl });
        await newLink.save();
        res.json({ shortUrl });
    } catch (err) {
        res.status(500).json({ error: "Erro ao criar link encurtado" });
    }
});

// Rota para redirecionar para a URL original
router.get("/:shortUrl", async (req, res) => {
    try{
        const link = await Link.findOne({ shortUrl: req.params.shortUrl });

        if(!link){
            return res.status(404).json({ error: "Link não encontrado" });
        }

        link.clicks++; //Atualiza quantique de cliques
        await link.save();

        res.redirect(link.originalUrl);
    } catch (err) {
        res.status(500).json({error: "Erro ao redirecionar para a URL original" });
    }
});

module.exports = router;