export const errorHandler = (err, req, res, next) => {
    if (err instanceof CustomError) {
        return res.status(err.code).json({ error: err.message });
    }
    
    console.error(err);
    res.status(500).json({ error: "Error interno del servidor" });
};