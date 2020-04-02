const devURL = 'http://localhost:10010'
const prodURL = 'http://localhost:10010'

const BASE_URL = process.env.NODE_ENV === "development" ? devURL : prodURL

export default BASE_URL