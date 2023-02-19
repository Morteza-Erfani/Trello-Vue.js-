<script setup>
import ColTemplate from "../components/ColsTemplate.vue";
import AddCol from "../components/AddCol.vue";
import { useColsData } from "../use/useColsData";
import AddEditCard from "../components/AddEditCard.vue";
import { onMounted } from "vue";

const { tasks, showAddCard, getFromStorage } = useColsData();

onMounted(() => {
  getFromStorage();
});
</script>

<template>
  <div class="container">
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
    <AddEditCard v-if="showAddCard.isShow" :colId="showAddCard.id" />
  </div>
</template>

<style scoped>
.container {
  position: relative;
}

.header {
  background-image: linear-gradient(to bottom, #4c4c47, rgba(45, 45, 42, 0));
  width: 100vw;
  height: 50px;
}

.headerText {
  color: #e9e2cf;
  margin-left: 1em;
  font-weight: bold;
  text-shadow: -1px -1px 0 #2d2d2a;
  cursor: default;
  font-family: "Poppins", sans-serif;
}

.contentSection {
  display: flex;
  overflow: scroll;
  flex-wrap: wrap;
  justify-content: center;
}

.contentSection::-webkit-scrollbar {
  display: none;
}

.col {
  margin: 25px 15px 15px;
}
</style>
