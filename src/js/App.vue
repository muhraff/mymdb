<template>
    <div>
        <b-navbar type="dark" variant="info" class="mb-5">
            <b-container>
                <b-navbar-brand href="#">My movies book</b-navbar-brand>
                <b-nav-form>
                    <vue-bootstrap-typeahead
                            :data="movies"
                            v-model="movies"
                            size="lg"
                            :serializer="s => s.text"
                            placeholder="Search move..."
                    />
                </b-nav-form>
            </b-container>

        </b-navbar>
        <b-container>
            <b-row>
                <b-col sm="6" md="4" v-for="movie in movies.Search">
                    <!--{{ movie }}-->
                    <b-card
                            :title="movie.Title"
                            :img-src="movie.Poster"
                            img-alt="Image"
                            class="mb-3"
                    >
                        <b-card-text>
                            {{ movie.Type }}
                        </b-card-text>

                        <b-button href="#" variant="primary">
                            <i class="material-icons">
                            favorite
                            </i>
                            Add to Wish list</b-button>
                    </b-card>

                </b-col>
            </b-row>
        </b-container>
    </div>
</template>

<style lang="scss" scoped>

</style>

<script>
    import _ from 'underscore';
    //const API_URL = 'https://api-url-here.com?query=:query';
    const API_URL = 'http://www.omdbapi.com/?apikey=1e815dc3&s=:query';

    export default {
        data: () => ({
            selectedMovie: null,
            movies: []
        }),
        methods:{
            async getAddresses(query) {
                const res = await fetch(API_URL.replace(':query', query))
                const suggestions = await res.json();
                this.movies = suggestions
            }
        },
        watch: {
            movies: _.debounce(function(addr) { this.getAddresses(addr) }, 500)
        }
    }
</script>
