<template>
    <div class="homepage">
        <nav class="homepage__navbar d-flex flex-lg-column navbar navbar-expand-lg navbar-light bg-dark">
            <input
                v-model="search"
                class="homepage__navbar__search form-control"
                type="search"
                placeholder="Search"
                aria-label="Search" />
            <div class="homepage__navbar__btns d-flex flex-row-reverse">
                <button
                    type="button"
                    @click="sort('popularity')"
                    :class="['btn btn-primary btn-sm', { 'active': (filter === 'popularity' || search !== '') }]"
                >Popularidade</button>
                <button
                    type="button"
                    @click="sort('viewers')"
                    :disabled="search !== ''"
                    :class="['btn btn-primary btn-sm', { 'active': filter === 'viewers' }]"
                >Visualizações</button>
            </div>
        </nav>

        <div class="container homepage__container">
            <div class="row">
                <div class="homepage__container__gamer col-sm-6 col-md-4 col-lg-3" v-for="(item, index) in games" :key="index">
                    <div>
                        <img :src="item.box.large" alt="game.game.name">
                        <div class="homepage__container__gamer__title d-flex justify-content-center align-items-center" v-text="item.name"></div>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="loading"
            class="homepage__loading"
            :style="`background-image: url(${require('_img/loading.gif')}`"
        ></div>

        <div
            class="homepage__gameover"
            v-if="!loading && (games === null || games.length === 0)"
            :style="`background-image: url(${require('_img/gameover.gif')}`"
        ></div>
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
                filter: 'popularity',
                loading: true
            }
        },

        watch: {
            search () {
                this.games = []
                this.filter = 'popularity'
                this.loading = true

                setTimeout(() => {
                    this.requestGames()
                }, 500)
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
                                this.sort(this.filter)
                            } else {
                                this.games = this.games.concat(response)
                                this.sort(this.filter)
                            }
                            this.loading = false
                        })
                        .catch(() => {
                            this.games = []
                            this.loading = false
                        })
                } else {
                    this.games = []
                    SearchService.get(this.search)
                        .then(response => {
                            this.games = response
                            this.loading = false
                            this.sort('popularity')
                        })
                        .catch(() => {
                            this.games = []
                            this.loading = false
                        })
                }
            },

            sort (filter) {
                this.games.sort((a, b) => b[filter] - a[filter])
                this.filter = filter
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
                            this.requestGames()
                            document.documentElement.scrollTop = elementSize
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

        &__navbar {
            width: 100%;
            z-index: 1;
            position: fixed;

            &___search {
                width: 100%;
            }

            &__btns {
                width: 100%;
                margin-top: 8px;


                button {
                    margin: 0 5px;
                    cursor: pointer;
                }
            }
        }

        &__container {
            padding-top: 100px;

            &__gamer {
                position: relative;
                margin-bottom: 15px;

                > div {
                    cursor: pointer;
                }

                img {
                    width: 100%;
                }

                &__title {
                    left: 0;
                    color: #fff;
                    width: calc(100% - 30px);
                    bottom: 0;
                    height: 20%;
                    margin: 0 15px;
                    padding: 0 15px;
                    position: absolute;
                    font-size: 18px;
                    text-align: center;
                    background: rgba(0, 0, 0, 0.7);
                    line-height: 18px;
                }
            }
        }

        &__loading {
            width: 100%;
            height: 150px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }

        &__gameover {
            width: 100%;
            height: 150px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
    }
</style>
