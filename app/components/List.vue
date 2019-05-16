<template>
    <Page>
        <ActionBar title="My Todo">
            <ActionItem
                @tap="addTodo"
                ios.systemIcon="4"
                ios.position="right"
                android.systemIcon="ic_menu_add"
                android.position="actionBar"></ActionItem>
        </ActionBar>
        <TabView>
            <TabViewItem title="Todo">
                <StackLayout>
                    <ListView for="todo in todos">
                        <v-template>
                            <GridLayout
                                columns="*,50">
                                    <Label
                                        class="todo-label"
                                        :class="todo.status ? 'checked' : ''"
                                        :text="todo.text" 
                                        @tap="toggleTodo($index)"/>
                                    <Button
                                        col="1"
                                        text="X"
                                        class="todo-remove" 
                                        @tap="removeTodo($index)"/>
                            </GridLayout>
                        </v-template>
                    </ListView>
                </StackLayout>
            </TabViewItem>
            <TabViewItem title="Movies">
                <StackLayout>
                    <ListView for="movie in movies">
                        <v-template>
                            <GridLayout
                                columns="90,*"
                                class="movie">
                                    <Image
                                        verticalAlignment="top"
                                        class="movie-image"
                                        :src="'https://image.tmdb.org/t/p/w500' + movie.poster_path" />
                                    <StackLayout
                                        col="1"
                                        class="movie-details">
                                            <GridLayout
                                                columns="*,50">
                                                    <Label
                                                        :text="movie.title"
                                                        class="movie-title"
                                                        textWrap="true" />
                                                    <Label
                                                        col="1"
                                                        :text="movie.vote_average"
                                                        class="movie-score" 
                                                        :class="getScoreClass(movie.vote_average)"/>
                                            </GridLayout>
                                            <Label
                                                :text="movie.overview"
                                                class="movie-overview"
                                                textWrap="true" />
                                            <Button
                                                text="View Movie"
                                                class="view-movie-button"
                                                @tap="viewMovie(movie.id)" />
                                    </StackLayout>  
                            </GridLayout>
                        </v-template>
                    </ListView>
                </StackLayout>
            </TabViewItem>
        </TabView>
    </Page>
</template>

<script>
    import * as applicationSettings from 'tns-core-modules/application-settings'
    import * as http from 'http';
    import * as utils from 'tns-core-modules/utils/utils';

    export default {
        data() {
            return {
                todos: [],
                movies: [],
            }
        },
        watch: {
            todos: function(newTodos,oldTodos) {
                applicationSettings.setString("todos",JSON.stringify(this.todos));
            }
        },
        created() {
            this.todos = JSON.parse(applicationSettings.getString('todos','[]'));
            this.loadMovies();
        },
        methods: {
            addTodo() {
                prompt('Enter your task')
                .then(result => {
                    this.todos.push({
                        text: result.text,
                        status: 0
                    })
                })
            },
            toggleTodo(index) {
                this.todos[index].status  = 1 - this.todos[index].status;
                this.sortTodos();
            },
            sortTodos() {
                this.todos.map((todo,index) => {
                    if(todo.status == 1) {
                        this.todos.push(this.todos.splice(index,1)[0]);
                    }
                })
            },
            removeTodo(index) {
                this.todos.splice(index);
            },
            loadMovies() {
                http.getJSON("https://api.themoviedb.org/3/movie/popular?api_key=ea9385095138c0c18e3aca7590507b54&language=en-US&page=1")
                .then(result => {
                    this.movies = result.results;
                }, error => {
                    console.error(error);
                });
            },
            viewMovie(id) {
                utils.openUrl('https://www.themoviedb.org/movie/'+id);
            },
            getScoreClass(score) {
                return score > 8 ? 'green' : 'red';
            }
        }
    }
</script>

<style scoped>
    .todo-label {
        padding: 5;
        font-size: 24;
    }
    .todo-remove {
        background-color:red;
        color: black;
        font-size:20;
    }
    .checked {
        text-decoration: line-through;
    }
    .movie-image {
        padding: 5;
        width: 80;
        height: 120;
    }
    .movie-title {
        font-weight: bold;
        padding: 5;
    }
    .movie-overview {
        padding: 5;
    }
    .movie-score {
        font-weight:bold;
        padding: 5;
    }
    .view-movie-button {
        background-color: green;
        color: white;
        font-weight: bold;
    }
    .green {
        color:green;
    }
    .red {
        color:red;
    }
</style>