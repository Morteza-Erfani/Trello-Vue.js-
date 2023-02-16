<script setup>
import ColTemplate from "../components/ColsTemplate.vue";
import AddCol from "../components/AddCol.vue";
import { useColsData } from "../use/useColsData";

const { tasks, addCol } = useColsData();

// console.log(tasks.value[0].colTitle)
</script>

<template>
  <header class="header">
    <h1 class="headerText">Trello</h1>
  </header>
  <section class="contentSection">
    <div v-for="task in tasks" :key="task.id" class="col">
      <ColTemplate :task="task" />
    </div>
    <div class="col">
      <AddCol />
    </div>
  </section>
</template>

<style scoped>
.header {
  background-color: beige;
  width: 100vw;
  height: 50px;
}

.headerText {
  color: maroon;
  margin-left: 1em;
  font-weight: bold;
}

.contentSection {
  display: flex;
}

.col {
  margin: 25px 15px 15px;
}
</style>
