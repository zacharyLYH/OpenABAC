function validateJWT(): boolean {
    if (process.env.USING_INTERNAL_AUTH === 'false') {
        return true;
    }
    return false;
}
