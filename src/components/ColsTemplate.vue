<script setup>
import CardTemplate from "./CardTemplate.vue";
import { useColsData } from "../use/useColsData";

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  task: {
    type: Object,
  },
});

const { showAddCard } = useColsData();

const showAddCardHandler = (isShow) => {
  showAddCard.value.isShow = isShow;
  showAddCard.value.id = props.task.id;
};
</script>

<template>
  <div class="colsContainer" :style="{ backgroundColor: task.color }">
    <div class="title">
      <h3 class="titleText">{{ task.colTitle }}</h3>
      <p class="topAddCard" @click="showAddCardHandler(true)">+</p>
    </div>
    <section class="cardsContainer">
      <div>
        <CardTemplate
          v-for="card in task.cards"
          :key="card.id"
          :card="card"
          :colColor="task.color"
        />
        <div @click="showAddCardHandler(true)" class="addCard">+</div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.colsContainer {
  overflow: hidden;
  color: black;
  padding: 15px;
  border-radius: 10px;
  width: 18em;
  min-height: 15em;
  max-height: 15em;
  box-shadow: -5px -3px 9px 3px rgba(76, 76, 71, 0.77);
  transition: all 0.5s ease;
}

.colsContainer:hover {
  max-height: 80vh;
  height: 80vh;
  overflow: scroll;
}

.colsContainer::-webkit-scrollbar {
  display: none;
}

.title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-right: 5px;
}

.cardsContainer {
  min-height: 80vh;
  margin-top: 15px;
}

.topAddCard {
  font-size: 18px;
  cursor: pointer;
}

.addCard {
  background-color: #e9e2cf;
  border-radius: 10px;
  padding: 3px 8px;
  justify-content: space-between;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 25px;
  cursor: pointer;
}
</style>
