import BaseService from '_services/base'

class GamesService extends BaseService {

    getGames (limit = 10, offset = 0) {
        return this.request('/games/top', {
            limit,
            offset
        })
    }
}

export default new GamesService()
