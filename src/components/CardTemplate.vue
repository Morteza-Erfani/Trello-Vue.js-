<script setup>
import { ref } from "vue";

const showDescription = ref(false);

const props = defineProps({
  card: {
    type: Object,
  },
});
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
    <div v-for="user in card.assignUsers" :key="user" class="assigns">
      {{ user }}
    </div>
    <div class="deadline">
      <p>{{ card.deadline }}</p>
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

.assigns {
  position: absolute;
  width: 20px;
  height: 20px;
  background-color: aquamarine;
  bottom: -15px;
  left: 10px;
  border-radius: 50%;
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
