import config from '_config'
import axios from 'axios'

class Example {
    getUrl () {
        return 'http://localhost'
    }

    getExamples () {
        return axios({
            method: 'get',
            url: this.getUrl()
        })
    }
}

export default new Example()
