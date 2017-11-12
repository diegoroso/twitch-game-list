import axios from 'axios'

const HTTP = axios.create({
    baseURL: 'https://api.twitch.tv/kraken',
    headers: {
        Accept: 'application/vnd.twitchtv.v5+json',
        'Client-ID': 'idh7xhqeplycxj9d84wijdgn3n3k87'
    }
})

class BaseService {

    request (url, data = {}) {
        return HTTP(url, { params: data })
            .then(response => response.data)
    }
}

export default BaseService
