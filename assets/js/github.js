const env = process.env.NODE_ENV === "production"
module.exports = {
    client_id: env ? '26bc05886ab7acf7753a' : 'cc6571de853ab8c8f717',
    client_secret: env ? '362a7336c5181fd58a4923a8d70706f39d68a196' : '4108ebda0ab1944b81217719a275e54d052f4e27',
}