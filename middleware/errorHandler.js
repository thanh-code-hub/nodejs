import AppError from "../utils/AppError.js";

export default function errorHandler(err, req, res, next) {
    console.error("💥 Error:", err);

    if (err instanceof AppError) {
        res.status(err.statusCode || 400).json({ error: err.message });
    } else {
        console.error("Unexpected error:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}