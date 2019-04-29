<template>
    <div class="container">
        <div class="row my-2">
            <div class="col text-center">
                <div class="d-flex justify-content-around my-4">
                    <h1 class="text-capitalize">{{ mode }}</h1>

                    <button class="btn btn-outline-dark d-flex" @click.stop="setMode('watchList')" v-if="mode == 'movies'">
                        <i class="material-icons mr-2">
                            favorite_border
                        </i>
                        Watch List <span class="ml-3">{{ watchListCount }}</span>
                    </button>
                    <button class="btn btn-outline-dark d-flex" @click.stop="setMode('movies')" v-if="mode == 'watchList'">
                        <i class="material-icons">
                            local_movies
                        </i>
                        Movies
                    </button>
                </div>
                <hr class="my-5">
                <div class="form-row justify-content-center" v-if="mode == 'movies'">
                    <div class="form-group col-8">
                        <input type="text" class="form-control" @keyup.stop="getMovies()" v-model="searchQuery" placeholder="Search With movie title..">
                    </div>
                   <!-- <div class="col-auto">
                        <button type="submit" class="btn btn-primary" @click.stop="getMovies()">Search</button>
                    </div>-->

                </div>
            </div>
        </div>

        <div class="row my-2" v-if="mode == 'movies'">
            <div class="col-12 col-sm-6 col-md-3 mb-4" v-for="movie in movies.Search">
                <div class="card shadow">
                    <img :src="movie.Poster" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ movie.Title }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ movie.Year }}, {{ movie.Type}} </h6>
                        <p class="card-text">IMDB ID: {{ movie.imdbID }}</p>

                    </div>
                    <div class="card-footer p-1">
                        <div class="btn-group d-flex" role="group">
                            <button type="button" class="btn btn-outline-dark" v-bind:class="{ active: isActive }" @click.stop="addTowatchList(movie)">
                                <i class="material-icons">
                                    favorite_border
                                </i>
                            </button>
                            <button type="button" class="btn btn-outline-dark" @click.stop="share(movie.imdbID)">
                                <i class="material-icons">
                                    share
                                </i>
                            </button>

                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="row my-2" v-if="mode == 'watchList'">
            <div class="col-12 mb-4 text-center">
                <h3>{{ watchListCount }} Movies in your watch List </h3>

            </div>
            <div class="col-12 col-sm-6 col-md-3" v-for="movie in watchListMovies">
                <div class="card">
                    <img :src="movie.Poster" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ movie.Title }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ movie.Year }}, {{ movie.Type}} </h6>
                        <p class="card-text">IMDB ID: {{ movie.imdbID }}</p>
                        <button @click.stop="removeWatchList(movie)"  class="btn btn-block btn-danger">
                            <i class="material-icons">
                                close
                            </i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-12 text-center" v-if="watchListMovies.length === 0">
                <p class="text-warning">You don't have any watch last</p>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>


</style>

<script>
    //const API_URL = 'https://api-url-here.com?query=:query';
    const API_URL = 'https://www.omdbapi.com/?apikey=1e815dc3&s=:query';

    export default {
        data: () => ({
            selectedMovie: null,
            watchListMovies: null,
            searchQuery: "Iron Man",
            mode: "movies",
            isActive: false,
            watchListCount: 0,
            movies: []
        }),
        created() {
            this.getMovies();

        },
        methods:{
            async getMovies() {
                const res = await fetch(API_URL.replace(':query', this.searchQuery))
                const suggestions = await res.json();
                this.movies = suggestions
            },
            setMode: function(mode) {
                this.mode = mode;
                if(mode === 'watchList') {
                    var watchList = JSON.parse(localStorage.watchList);
                    //console.log(watchList);
                    this.watchListMovies = watchList;
                    this.watchListCount = watchList.length;
                }
            },
            share: function(id){
                window.open("http://www.facebook.com/sharer.php?u=https://www.imdb.com/title/"+id, '_blank');
            },
            addTowatchList: function (movie) {
                console.log(this);
                var isMatch = false;
                if(localStorage.watchList) {
                    var watchList = JSON.parse(localStorage.watchList);

                } else {
                    var watchList = [];

                }

                for (var i=0; i < watchList.length; i++) {
                    if (watchList[i].imdbID === movie.imdbID) {
                        return  isMatch = true;
                    }
                }
                if(!isMatch){
                    watchList.push(movie);
                    this.watchListCount = watchList.length;
                }
                localStorage.watchList = JSON.stringify(watchList);

            },
            removeWatchList: function (movie) {
                var watchList = JSON.parse(localStorage.watchList);
                var getIndex = '';
                console.log(watchList);

                for (var i=0; i < watchList.length; i++) {
                    console.log(watchList[i]);
                    if (watchList[i].imdbID === movie.imdbID) {
                        getIndex = i;
                    }
                }
                watchList.splice(getIndex);
                localStorage.watchList = JSON.stringify(watchList);

                var watchList = JSON.parse(localStorage.watchList);
                //console.log(watchList.length);

                this.watchListMovies = watchList;
                this.watchListCount = watchList.length;
                //console.log(watchList);
            }
        },
    }
</script>
