export default {
    state: {
        data: {}
    },

    mutations: {
        setGame (state, game) {
            state.data = game
        }
    },

    actions: {
        setGame ({ commit }, game) {
            commit('setGame', game)
        }
    }
}
