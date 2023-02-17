<script setup>
import { ref } from "vue";

const showDescription = ref(false);

const props = defineProps({
  card: {
    type: Object,
  },
});

const currentDate = new Date();

const timeLeft = () => {
  const difference = props.card.deadline.getTime() - currentDate.getTime();
  const totalDays = Math.ceil(difference / (1000 * 3600 * 24));
  return totalDays;
};
</script>

<template>
  <div class="cardContainer" @click="showDescription = !showDescription">
    <div class="summeryCard">
      <div>{{ card.title }}</div>
      <div
        class="cardLabel"
        :style="{ backgroundColor: card.label[0].color }"
      ></div>
    </div>
    <div class="assignsContainer">
      <div v-for="user in card.assignUsers" :key="user" class="assigns">
        {{ user }}
      </div>
    </div>
    <div class="deadline">
      <p>{{ timeLeft() }} days</p>
    </div>
    <div v-if="showDescription">
      <div class="description">{{ card.description }}</div>
      <ul class="todos">
        <li v-for="todo in card.todos" :key="todo" class="todo">
          <input type="checkbox" name="" :checked="todo.isDone" />
          <p>{{ todo.name }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.cardContainer {
  background-color: #d7eaea;
  border-radius: 10px;
  padding: 3px 8px;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 25px;
}

.cardLabel {
  /* background-color: black; */
  width: 15px;
  height: 15px;
  border-radius: 10px;
}

.assignsContainer {
  position: absolute;
  bottom: -15px;
  left: 10px;
  display: flex;
  gap: 3px;
}

.assigns {
  width: 20px;
  height: 20px;
  background-color: aquamarine;
  border-radius: 50%;
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
}

.summeryCard {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.deadline {
  position: absolute;
  width: 80px;
  height: 20px;
  background-color: aquamarine;
  bottom: -15px;
  right: 20px;
  border-radius: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
