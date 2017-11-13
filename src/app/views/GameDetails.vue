<template>
    <div class="game-details" v-if="game.name">
        <nav class="game-details__navbar navbar justify-content-start">
            <div @click="back" class="game-details__navbar__back"></div>
            <h1 v-text="game.name"></h1>
        </nav>
        <div class="game-details__container container">
            <!-- <div class=""> -->
                <div class="row align-items-start justify-content-center">
                    <img class="col-xs-12 col-sm-6 col-lg-4" :src="game.box.large" :alt="game.name">
                    <div class="game-details__container__informations col-xs-12 col-sm-6 col-lg-4">
                        <h1 v-text="game.name"></h1>
                        <p v-text="`${viewers} visualizações`"></p>
                        <p v-text="`${channels} canais ao vivo`"></p>
                        <p v-text="`${popularity} popularidade`"></p>
                    </div>
                </div>
            <!-- </div> -->
        </div>
    </div>
</template>

<script>
    import { numberPattern } from '_utils/index'

    export default {
        name: 'GameDetails',

        computed: {
            game () {
                return this.$store.state.game.data
            },
            viewers () {
                return numberPattern(this.$store.state.game.data.viewers)
            },
            channels () {
                return numberPattern(this.$store.state.game.data.channels)
            },
            popularity () {
                return numberPattern(this.$store.state.game.data.popularity)
            }
        },

        methods: {
            back () {
                this.$router.push('/')
            }
        },

        created () {
            if (this.game.name === undefined) {
                this.$router.push('/')
            }
        }
    }
</script>

<style lang="scss" scoped>
    @import '~_npm/bootstrap/scss/bootstrap-grid';
    .game-details {
        background-image: url(~_img/twitch-bg.jpg);

        &__navbar {
            width: 100%;
            color: #fff;
            height: 65px;
            z-index: 1;
            position: fixed;
            background-color: #6441a5;
            box-shadow: 1px 1px 10px #000;

            &__back {
                width: 25px;
                height: 25px;
                cursor: pointer;
                background-size: cover;
                background-image: url('~_img/arrow-back.png');
                background-repeat: no-repeat;
                background-position: center;
            }

            h1 {
                margin: 0;
                font-size: 18px;
                margin-left: 15px;
            }
        }

        &__container {
            padding: 95px 0 30px 0;
            min-height: 100vh;

            img {
                max-width: 300px;
            }

            .row {
                position: relative;
            }

            &__informations {
                padding: 15px;
                max-width: 100%;
                margin-top: 18px;
                text-align: center;
                background-color: rgba(0, 0, 0, 0.5);

                @include media-breakpoint-down(xs) {
                    bottom: 0;
                    position: absolute;
                    max-width: 270px;
                }

                h1 {
                    color: #FFF;
                    font-size: 24px;
                    text-shadow: 0px 0px 5px #fff;
                }

                p {
                    color: #FFF;
                    margin: 0;
                    font-size: 20px;
                    text-shadow: 0px 0px 5px #fff;
                }
            }
        }
    }
</style>
