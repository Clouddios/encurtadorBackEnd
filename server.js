require("dotenv").config();
console.log("MonmgoDB URI", process.env.MONGO_URI)
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

const linkRoutes = require("./routes/linkRoutes");
app.use("/api", linkRoutes);

const PORT = process.env.PORT || 5000;

// Conectar ao MongoDB
mongoose
    .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Conectado ao MongoDB"))
    .catch((err) => console.error("Erro ao conectar ao MongoDB: ", err));

app.get("/", (req, res) => {
    res.send("Api do Encurtador de URL esta rodando!");
});


app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));