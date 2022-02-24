<template>
  <div class="home-body">
    <div class="container">
    <h1>PRINCE GEARY DYMOSCO</h1>
    <h2>TO-DO APP 02/24/2022</h2>
    <button class="button"><router-link class="button" :to="{name: 'InteractiveBoard'}">GO TO APP <label class="glyphicon glyphicon-th-list"></label></router-link></button>
  </div>
  <router-view/>
  </div>
  
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
})
</script>

<style>
.container {
  display: grid;
  justify-items: center;
  position: absolute;
  top:  50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #AA336A;
}

.container button {
  color: #AA336A;
  font-size: 18px; 
  border-radius: 10px;
  background: transparent;
  border-color: #AA336A;
  margin-left: 30px;
  padding: 5px;
}

.button{
  color: #AA336A;
  padding: 5px;
}
.button:hover{
  color: white;
  background: #AA336A;
  text-decoration: none;
  border-color: white
}

</style>
