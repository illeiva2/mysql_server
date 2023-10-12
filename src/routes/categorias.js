const express = require("express")
const router = express.Router()

const Categoria = require("../models/categorias.js")

router.get("/", async (req, res) => {
    try {
        const categorias = await Categoria.findAll()
    
        res.status(200).send(categorias);
    } catch (err) {
        res.status(500)
        next(err)
    }
})

module.exports = router;
