import express from "express";
import { NODE_ENV, PORT } from "./config/config";

const app =  express();

app.listen(PORT, () => {
    console.log(`api corriendo en el modo: ${NODE_ENV} por el puerto: ${PORT}`, process.env.NODE_ENV);
    
})