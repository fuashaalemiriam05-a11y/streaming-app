export function roleGuard(allowedRoles) {
    return (_req, _res, next) => {
        next();
    };
}
