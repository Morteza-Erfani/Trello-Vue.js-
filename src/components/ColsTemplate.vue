<script setup>
import CardTemplate from "./CardTemplate.vue";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  task: {
    type: Object,
  },
});
</script>

<template>
  <div class="colsContainer" :style="{ backgroundColor: task.color }">
    <div class="title">
      <h3 class="titleText">{{ task.colTitle }}</h3>
    </div>
    <section class="cardsContainer">
      <div>
        <CardTemplate v-for="card in task.cards" :key="card.id" :card="card" />
        <div class="addCard">+</div>
      </div>
    </section>

  </div>
</template>

<style scoped>
.colsContainer {
  color: black;
  padding: 15px;
  border-radius: 10px;
  width: 18em;
  height: 15em;
}

.cardContainer {
  margin-top: 15px;
}

.addCard {
  background-color: #e4fafa;
  border-radius: 10px;
  padding: 3px 8px;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 25px;
}
</style>
