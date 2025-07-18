export class CustomError extends Error {
    constructor(message, code = 500) {
        super(message);
        this.code = code;
    }
}

export const errorDictionary = {
    USER_NOT_FOUND: {
        message: "Usuario no encontrado",
        code: 404
    },
    PET_NOT_FOUND: {
        message: "Mascota no encontrada",
        code: 404
    },
    INVALID_CREDENTIALS: {
        message: "Credenciales inválidas",
        code: 401
    },
    UNAUTHORIZED: {
        message: "No autorizado",
        code: 401
    },
    ADOPTION_ERROR: {
        message: "Error en el proceso de adopción",
        code: 400
    }
};