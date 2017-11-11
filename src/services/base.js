import axios from 'axios'

const HTTP = axios.create({
    baseURL: 'https://api.twitch.tv/kraken',
    headers: {
        'Client-ID': 'idh7xhqeplycxj9d84wijdgn3n3k87'
    }
})

class BaseService {

    request (url, data = {}) {
        return HTTP(url, { params: data })
    }
}

export default BaseService
