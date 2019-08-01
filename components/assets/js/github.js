const env = process.env.NODE_ENV === "production"
module.exports = {
    client_id: env ? '26bc05886ab7acf7753a' : 'cc6571de853ab8c8f717',
    client_secret: env ? '362a7336c5181fd58a4923a8d70706f39d68a196' : '954a51ad022cea5f2db05823390893adf65083da'
}