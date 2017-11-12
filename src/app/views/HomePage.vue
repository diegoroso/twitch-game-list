<template>
    <div class="homepage">
        <nav class="navbar navbar-expand-lg navbar-light bg-dark">
            <form class="form-inline my-2 my-lg-0">
                <input v-model="search" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">
            </form>
        </nav>
        <div class="container" ref="gamescontent">
            <div class="row">
                <div class="col-sm-6 col-md-4 col-lg-3" v-for="(item, index) in games" :key="index">
                    <img :src="item.box.large" alt="game.game.name">
                    <p v-text="item.name"></p>
                </div>
            </div>
        </div>
        <div v-if="loading" class="loading" :style="`background-image: url(${require('_img/loading.gif')}`"></div>
        <div v-if="!loading && games === null" class="gameover" :style="`background-image: url(${require('_img/gameover.gif')}`"></div>
    </div>
</template>

<script>
    import GamesService from '_services/games'
    import SearchService from '_services/search'

    export default {
        name: 'HomePage',

        data () {
            return {
                games: [],
                search: '',
                loading: true
            }
        },

        watch: {
            search () {
                this.games = []
                this.requestGames()
            }
        },

        methods: {
            requestGames () {
                this.loading = true
                const offset = this.games.length

                if (this.search === '') {
                    GamesService.get(offset)
                        .then(response => {
                            if (offset === 0) {
                                this.games = response
                            } else {
                                this.games = this.games.concat(response)
                            }
                            this.loading = false
                        })
                        .catch(() => {
                            this.games = []
                            this.loading = false
                        })
                } else {
                    setTimeout(() => {
                        SearchService.get(this.search)
                            .then(response => {
                                this.games = response
                                this.loading = false
                            })
                            .catch(() => {
                                this.games = []
                                this.loading = false
                            })
                    }, 500)
                }
            }
        },

        mounted () {
            let scroll = 0
            let elementSize = 0

            window.addEventListener('scroll', () => {
                if (this.search === '') {
                    scroll = document.documentElement.scrollTop
                    elementSize = document.body.offsetHeight - window.innerHeight
                    if (scroll >= elementSize) {
                        if (!this.loading) {
                            this.loading = true
                            setTimeout(() => {
                                document.documentElement.scrollTop = elementSize
                                this.requestGames()
                            }, 100)
                        }
                    }
                }
            })

            this.requestGames()
        }
    }
</script>

<style lang="scss" scoped>
    .homepage {
        .container {
            padding-top: 25px;
        }

        .loading {
            width: 100%;
            height: 150px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }

        .gameover {
            width: 100%;
            height: 150px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
    }
</style>
