import BaseService from '_services/base'

class SearchService extends BaseService {

    get (query = '') {
        return this.request('/search/games', {
            query
        }).then(response => response.games)
    }
}

export default new SearchService()
