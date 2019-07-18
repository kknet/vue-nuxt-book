module.exports = async (ctx, next) => {
    try {
        await next()
    } catch (error) {
        ctx.status = 500
    }
}