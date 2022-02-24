<template>
  <div v-if="mode" class="todo-list">
    <div class="todo-list-title">{{title}}</div>
    <ul>
      <li v-for="(list,index) in list" :key="list.id">
        <table>
          <tr style="border-bottom-style: dashed; border-width: 1px">
            <td style="width: 30px"><input type="checkbox" v-model="list.status" /></td>
            <td style="width: 200px" v-bind:class="{done: list.status}">{{list.task}}</td>
            <td>
              <button class="remove" @click="removeTask(index, todoIndex)">
                <label class="glyphicon glyphicon-remove pull-right remove"></label>
              </button>
            </td>
          </tr>
        </table>
      </li>
      <li><input class="todo-input" v-model="newTask" @keyup.enter="addTask(todoIndex)" placeholder="Enter a task"  maxlength="20"/></li>
    </ul>
    <div style="padding: 20px; padding-bottom: 40px">
      <button @click="switchMode(todoIndex)" class="pull-left editmode">
        <label class="glyphicon glyphicon-pencil"></label>
         EDIT
      </button>
      <button @click="removeTodo(todoIndex)" class="pull-right editmode">
        <label class="glyphicon glyphicon-trash "></label>
         DELETE
      </button>
    </div>
  </div>

  <div v-else class="todo-list editmodebg">
    <div class="todo-list-title">
      <input type="text" v-model="editMode.newtitle"
      style="background: #AA336A; width: 93%; text-align: center; 
      border-style: none;
      border-bottom-width: 1px;
      border-bottom-style: dashed;
      border-color: white" maxlength="20"/>
    </div>
    <div>
      <ul>
        <li v-for="list in editMode.newArray" :key="list.id">
          <input type="text" v-model="list.task" 
          style="width: 100%; text-align: center; 
            border-style: none;
            border-bottom-width: 1px;
            border-bottom-style: dashed;
            border-color: #AA336A"
            v-bind:class="{done: list.status}" maxlength="20"/>
        </li>
        <li><input class="todo-input" v-model="newTask" @keyup.enter="addTask(todoIndex)" placeholder="Enter a task"  maxlength="20"/></li>
      </ul>
    </div>
    <div style="padding: 20px; padding-bottom: 40px">
      <button @click="saveChanges(todoIndex)" class="pull-left editmode">
        <label class="glyphicon glyphicon-save"></label>
         SAVE</button>
      <button @click="switchMode(todoIndex)" class="pull-right editmode">
        <label class="glyphicon glyphicon-log-out"></label>
         CANCEL
      </button>
    </div>
  </div>
</template>


<script lang="ts">
import { computed, defineComponent, PropType, ref} from 'vue'
import List from '../types/List'

export default defineComponent({
  name: 'TodoList',
  props: {
    title: {
      required: true,
      type: String
    },
    list:{
      required: true,
      type: Array as PropType<List[]>
    },
    mode: {
      required: true,
      type: Boolean
    },
    todoIndex: {
      required: true,
      type: Number
    },
    todoId:{
      required: true,
      type: Number
    }
  },
  setup(props,{emit}){

    const newTask = ref('')

    const addTask = (todoIndex: number) => {
      emit('addTask', newTask.value, todoIndex)
      newTask.value = ''
    }

    const removeTask = (listIndex: number, todoIndex: number) => {
      emit('removeTask', listIndex, todoIndex)
    }

    const editMode = computed(() => {
      let newtitle = props.title
      let newArray = props.list
      return {newArray, newtitle}
    })

    const saveChanges = (todoIndex: number) => {
      let newtitle = editMode.value.newtitle
      let newlist= editMode.value.newArray
      emit('saveTodo', newtitle, todoIndex, newlist)
    }

    const switchMode = (todoIndex: number) => {
      emit('switchMode', todoIndex)
    }

    const removeTodo = (todoIndex:number) => {
      emit('removeTodo', todoIndex)
    }

    return {removeTask, addTask, newTask, editMode, saveChanges, switchMode, removeTodo}
  }
})
</script>

<style>

.todo-list{
  width: 300px;
  border: 2px solid #AA336A;
  border-radius: 5px;
  margin: 20px;
}

.editmodebg{
  background: #E4E4E4;
}

.todo-list-title{
  margin: 0;
  padding: 12px;
  text-align: center;
  background: #AA336A;
  color: white
}

.todo-list li{
    list-style: none;
    margin-top: 10px;
    margin-bottom: 10px;
}
.todo-list ul{
    margin: 0;
    padding-left: 20px;
    padding-right: 20px;
    width: 100%;
}

.todo-list table{
    margin: 0;
    padding: 0;
    width: 100%;
}

.todo-list-item {
    justify-content: center;
    
}

.todo-input{
  border-style: none;
  border-bottom-style: dashed;
  border-bottom-width: 1px;
  outline: none;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
  font-family: 'Comic Neue', 'Kalam';
  text-align: center;
}

.done{
  text-decoration: line-through;
}

.pull-left{
  position: absolute;
  left: auto;
}

.remove{
  cursor: pointer;
  border: 1px solid transparent;
  background: transparent;
  border-radius: 3px;
  color: #AA336A;
}

.remove:hover{
  cursor: pointer;
  border: 1px solid #AA336A;
  background: #AA336A;
  border-radius: 3px;
  color: white;
}

.editmode{
  cursor: pointer;
  border: 3px solid #AA336A;
  background: #AA336A;
  border-radius: 5px;
  color: white
}

</style>
