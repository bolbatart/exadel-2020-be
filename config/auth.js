module.exports = {
    jwt: {
        secret: 'bukauskas123',
        tokens: {
            access: {
                type: 'access',
                expiresIn: '15m',
            },
            refresh: {
                type: 'refresh',
                expiresIn: '30m',
            },
        },
    },
};