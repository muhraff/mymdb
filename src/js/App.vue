<template>
    <div class="container">
        <div class="row my-2">
            <div class="col text-center">
                <div class="d-flex justify-content-around my-4">
                    <h1>{{ mode }}</h1>
                    <button class="btn" @click.stop="setMode('wishlist')" v-if="mode == 'movies'">My Wish List</button>
                    <button class=" btn" @click.stop="setMode('movies')" v-if="mode == 'wishlist'">Movies</button>
                </div>

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
            <div class="col-12 col-sm-6 col-md-3" v-for="movie in movies.Search">
                <div class="card">
                    <img :src="movie.Poster" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ movie.Title }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ movie.Year }}, {{ movie.Type}} </h6>
                        <p class="card-text">IMDB ID: {{ movie.imdbID }}</p>
                        <button @click.stop="addToWishList(movie)"  class="btn btn-block btn-primary">Add to Wish List</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="row my-2" v-if="mode == 'wishlist'">
            <div class="col-12 col-sm-6 col-md-3" v-for="movie in wishListMovies">
                <div class="card">
                    <img :src="movie.Poster" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">{{ movie.Title }}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">{{ movie.Year }}, {{ movie.Type}} </h6>
                        <p class="card-text">IMDB ID: {{ movie.imdbID }}</p>
                        <!--<button @click.stop="removeWishList(movie)"  class="btn btn-block btn-primary">remove form wish list</button>-->
                    </div>
                </div>
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
            wishListMovies: null,
            searchQuery: "Iron Man",
            mode: "movies",
            movies: []
        }),
        created() {
            this.getMovies()
        },
        methods:{
            async getMovies() {
                const res = await fetch(API_URL.replace(':query', this.searchQuery))
                const suggestions = await res.json();
                this.movies = suggestions
            },
            setMode: function(mode) {
                this.mode = mode;
                if(mode == 'wishlist') {
                    var wishList = JSON.parse(localStorage.wishList);
                    console.log(wishList);
                    this.wishListMovies = wishList;
                }
            },
            addToWishList: function (movie) {
                if(localStorage.wishList) {
                    var wishList = JSON.parse(localStorage.wishList);

                } else {
                    var wishList = [];

                }
                if(wishList.indexOf(movie) < 0) {
                    wishList.push(movie);
                }
                localStorage.wishList = JSON.stringify(wishList);

                //console.log(localStorage.wishList);

            },
            removeWishList: function (movie) {
                var wishList = JSON.parse(localStorage.wishList);

                if(wishList.indexOf(movie) < 0) {
                    wishList.splice(wishList, 1);

                    console.log(wishList);
                    //wishList.push(id);
                }
            }
        },
    }
</script>
