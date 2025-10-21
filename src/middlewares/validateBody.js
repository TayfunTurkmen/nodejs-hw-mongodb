import createHttpError from "http-errors"


export const validateBody = (schema) => async (req, res, next) => {
    try{
        
        await schema.validateAsync(req.body, {
            abortEarly: false,
        });
        next();

    }catch(err){
        throw createHttpError(400, "Invalid request body", {
            cause: err,
        });
    }
}