import BaseService from '_services/base'
import { deviceLimit } from '_utils/index'

class GamesService extends BaseService {

    get (offset = 0) {
        return this.request('/games/top', {
            limit: deviceLimit(),
            offset
        }).then(response => response.top.map(item => {
            const game = item.game
            game.viewers = item.viewers
            game.channels = item.channels
            return game
        }))
    }
}

export default new GamesService()
