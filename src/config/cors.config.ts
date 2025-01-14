import { ORIGIN } from "./config";

export const corsConfig = {
    allowedHeaders: "*",
    methods: "GET, HEAD, PUD, PATCH, POST, DELETE",
    preflightContinue: false,
    origin: ORIGIN
};

export default corsConfig;