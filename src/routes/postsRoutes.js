import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ dest: "./uploads" , storage});

const routes = (app) => {
    //Permite o servidor intreprete requisições com corpo em JSON
    app.use(express.json());
    
    //Permite o servidor aceitar requisições de outros domínios
    app.use(cors(corsOptions));

    //Rota para listar todos os posts
    app.get("/posts", listarPosts);

    // app.post("/posts", listarPosts);
    
    //Rota para criar um novo post
    app.post("/posts", postarNovoPost);

    //Rota para envio de imagens
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id", atualizarNovoPost);
};

export default routes;