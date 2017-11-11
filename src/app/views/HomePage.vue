<template>
    <div class="homepage">
        <div v-for="(item, index) in games" :key="index">
            <img :src="item.game.box.large" alt="game.game.name">
            <p v-text="item.game.name">Home Page</p>
        </div>
    </div>
</template>

<script>
    import GamesService from '_services/games'

    export default {
        name: 'HomePage',

        data () {
            return {
                games: []
            }
        },

        mounted () {
            GamesService.getGames()
                .then(response => {
                    this.games = response.data.top
                })
        }
    }
</script>

<style lang="scss" scoped>
</style>
