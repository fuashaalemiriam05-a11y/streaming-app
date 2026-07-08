export function validateRequest(schema) {
    return (req, _res, next) => {
        schema.parse(req.body);
        next();
    };
}
