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
    </Page>
</template>

<script>
    import * as applicationSettings from 'tns-core-modules/application-settings'

    export default {
        data() {
            return {
                todos: [] //Todos Array
            }
        },
        watch: {
            todos: function(newTodos,oldTodos) {
                applicationSettings.setString("todos",JSON.stringify(this.todos));
            }
        },
        created() {
            this.todos = JSON.parse(applicationSettings.getString('todos','[]'));
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
</style>