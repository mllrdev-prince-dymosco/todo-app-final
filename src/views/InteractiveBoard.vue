<template>
    <div class="header">
        <router-link class="logo" :to="{name: 'Home'}">TO-DO APP</router-link>
        <div class="header-right">
            <button><router-link class="buttonlink" :to="{name: 'Home'}"><label class="glyphicon glyphicon-home"></label> HOME</router-link></button>
            <button @click="addTodo"><label class="glyphicon glyphicon-plus"></label> TO-DO</button>
        </div>
    </div>
    <div class="todo">
        <div v-for="(todo, index) in todos" :key="todo.id">
            <TodoList
            :todos="todos[index]"
            :todoIndex="index"
            :title="todos[index].title" 
            :mode="todos[index].mode"
            :todoId="todos[index].id"
            :list="todos[index].list" 
            @removeTodo="removeTodo"
            @removeTask="removeTask"
            @addTask="addTask"
            @saveTodo="saveTodo"
            @switchMode="switchMode"></TodoList>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import TodoList from '../components/TodoList.vue'
import Todo from '../types/Todo'
import List from '../types/List'

export default defineComponent({
    components: {TodoList},
    setup(){

        const todos = ref<Todo[]>([
            { id: Date.now(), title: 'To-Do #1', mode: true, list: [{task: 'First Task', status: false, id: Date.now()}] },
            { id: Date.now(), title: 'To-Do #2', mode: true, list: [{task: 'First Task', status: false, id: Date.now()}, {task: 'Second Task', status: true, id: Date.now()}] }
        ])
        
        const removeTodo = (todoIndex: number) => {
            todos.value.splice(todoIndex, 1);
        }

        const removeTask = (listIndex: number, todoIndex: number) => {
            todos.value[todoIndex].list.splice(listIndex, 1)
        }

        const addTask = (newTask: string, todoIndex: number) => {
            todos.value[todoIndex].list.push({task: newTask, status: false, id: Date.now()})
        }

        const switchMode = (todoIndex: number) => {
            todos.value[todoIndex].mode = !todos.value[todoIndex].mode
        }

        const saveTodo = (newtitle: string, todoIndex: number, newlist: List[]) => {
            todos.value[todoIndex].title = newtitle
            todos.value[todoIndex].mode = true
            todos.value[todoIndex].list = newlist
        }
        
        const addTodo = () => {
            const todo = {
                id: Date.now(),
                title: 'New To-Do',
                mode: true, 
                list:[]
            }
            todos.value.push(todo)
        }

        return {todos, removeTodo, removeTask, addTask, switchMode, saveTodo, addTodo}
    },
})
</script>

<style>
    .todo{
    display: flex;
    flex-wrap: wrap;
    align-items:  flex-start;
    justify-content: center;
    }

    .header {
        overflow: hidden;
        background-color: #AA336A;
        padding: 20px 40px;
    }

    .header button {
        color: white;
        font-size: 18px; 
        border-radius: 4px;
        background: transparent;
        border-color: white;
        margin-left: 30px;
        padding: 5px;
    }

    .header .logo {
        font-size: 25px;
        font-weight: bold;
        text-decoration: none;
        color: white;
    }

    .header-right {
        float: right;
    }

    .buttonlink{
        color: white;
    }

    .buttonlink:hover{
        text-decoration: none;
        color: white;
    }
</style>