import { validationResult } from "express-validator"

const validator = (req, res, next) => {
    const result = validationResult(req);
    if(result.isEmpty())
       return next();
    res.status(400).json({ errors: result.array() });
}

export default validator;