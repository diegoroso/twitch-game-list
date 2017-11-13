<template>
    <div class="home-page">
        <nav class="home-page__navbar d-flex flex-lg-column navbar">
            <input
                v-model="search"
                class="home-page__navbar__search form-control"
                type="search"
                placeholder="Search"
                aria-label="Search" />
            <div class="home-page__navbar__btns d-flex align-items-center flex-row-reverse">
                <button
                    type="button"
                    @click="sort('popularity')"
                    :class="['btn btn-outline-info btn-sm', { 'active': (filter === 'popularity' || search !== '') }]"
                >Popularidade</button>
                <button
                    type="button"
                    @click="sort('viewers')"
                    :disabled="search !== ''"
                    :class="['btn btn-outline-info btn-sm', { 'active': filter === 'viewers' }]"
                >Visualizações</button>
                <p>Filtrar por:</p>
            </div>
        </nav>

        <div class="container home-page__container">
            <div class="row">
                <div class="home-page__container__gamer col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center" v-for="(item, index) in games" :key="index">
                    <div @click="gameDetails(item)" class="link">
                        <img :src="item.box.large" alt="game.game.name">
                        <div class="home-page__container__gamer__title d-flex justify-content-center align-items-center" v-text="item.name"></div>
                    </div>
                </div>
            </div>
        </div>

        <div
            v-if="loading"
            class="home-page__loading"
            :style="`background-image: url(${require('_img/loading.gif')}`"
        ></div>

        <div
            class="home-page__gameover"
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
            },

            gameDetails (game) {
                this.$store.dispatch('setGame', game)
                this.$router.push('/details')
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
                            setTimeout(() => {
                                document.documentElement.scrollTop = elementSize
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
    .home-page {

        &__navbar {
            width: 100%;
            z-index: 1;
            position: fixed;
            box-shadow: 1px 1px 10px #000;
            background-color: #6441a5;

            &___search {
                width: 100%;
            }

            &__btns {
                width: 100%;
                margin-top: 8px;

                p {
                    color: #fff;
                    margin: 0;
                    font-size: 14px;
                    text-align: right;
                    line-height: 14px;
                    margin-right: 10px;
                }

                button {
                    margin: 0 5px;
                    cursor: pointer;
                }
            }
        }

        &__container {
            padding-top: 120px;

            &__gamer {
                position: relative;
                margin-bottom: 15px;

                .link {
                    cursor: pointer;
                    position: relative;
                    max-width: 300px;
                }

                img {
                    width: 100%;
                }

                &__title {
                    left: 0;
                    color: #fff;
                    width: 100%;
                    bottom: 0;
                    height: 20%;
                    margin: 0;
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
            margin-top: -60px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }

        &__gameover {
            width: 100%;
            height: 150px;
            margin-top: -50px;
            background-size: contain;
            background-repeat: no-repeat;
            background-position: center;
        }
    }
</style>
