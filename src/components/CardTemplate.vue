<script setup>
import { nextTick, ref } from "vue";
import { useColsData } from "../use/useColsData";

const showDescription = ref(false);

const props = defineProps({
  card: {
    type: Object,
  },
  colColor: {
    type: String,
  },
});

const currentDate = new Date();

const timeLeft = () => {
  if (props.card.deadline) {
    const difference = props.card.deadline - currentDate.getTime();
    const totalDays = Math.ceil(difference / (1000 * 3600 * 24));
    return totalDays;
  }
};

const { saveToStorage } = useColsData();

const todoHandler = () => {
  saveToStorage();
  console.log(props.card.todos);
};
</script>

<template>
  <div class="cardContainer">
    <div @click="showDescription = !showDescription" class="summeryCard">
      <div>{{ card.title }}</div>
      <div v-if="card.label.length" class="labelContainer">
        <div
          v-for="(label, index) in card.label"
          :key="index"
          class="cardLabel"
          :style="{ backgroundColor: label.color }"
        ></div>
      </div>
    </div>
    <div class="assignsContainer">
      <div v-for="user in card.assignUsers" :key="user.id" class="assigns">
        <img :src="user.imageURL" />
      </div>
    </div>
    <div v-if="card.deadline" class="deadline">
      <p>{{ timeLeft() }} days left</p>
    </div>
    <div class="descriptionContainer" v-if="showDescription">
      <div class="description">{{ card.description }}</div>
      <ul class="todos">
        <li v-for="todo in card.todos" :key="todo" class="todo">
          <input
            type="checkbox"
            name="checkbox"
            :id="todo.name"
            v-model="todo.isDone"
            @click="todoHandler"
          />
          <label @click="todoHandler" :for="todo.name">{{ todo.name }}</label>
        </li>
      </ul>
      <div class="fulllabelContainer">
        <div
          v-for="(label, index) in card.label"
          :key="index"
          :style="{ backgroundColor: colColor }"
          class="label"
        >
          <div
            class="fullLabelColor"
            :style="{ backgroundColor: label.color }"
          ></div>
          <p class="labelText">{{ label.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cardContainer {
  background-color: #d9e6ee;
  border-radius: 10px;
  padding: 3px 8px;
  justify-content: space-between;
  align-items: center;
  position: relative;
  margin-bottom: 25px;
  transition: all 0.5s;
}

.labelContainer {
  display: flex;
  max-width: 30%;
  flex-wrap: wrap;
}

.cardLabel {
  width: 15px;
  height: 15px;
  border-radius: 10px;
  margin-left: -5px;
}

.assignsContainer {
  position: absolute;
  bottom: -15px;
  left: 10px;
  display: flex;
  gap: 3px;
  max-width: 30%;
  flex-wrap: wrap;
}

.assigns {
  width: 20px;
  height: 20px;
  background-color: #b7b9ba;
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
  cursor: pointer;
}

.deadline {
  position: absolute;
  width: 80px;
  height: 20px;
  background-color: #b7b9ba;
  bottom: -15px;
  right: 20px;
  border-radius: 5px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.deadline p {
  font-size: 12px;
  font-weight: 400;
  color: #2d2d2ae1;
}

.descriptionContainer {
  animation: cardDetail 0.5s;
}

.description {
  border-top: 1px solid #b9b7ba;
  margin-top: 8px;
  padding-top: 5px;
}

.todos {
  padding-left: 10px;
  margin: 2px 5px 5px;
}

.todo {
  display: flex;
  gap: 5px;
}

.todo,
.todo input,
.todo label {
  cursor: pointer;
}

.todo input {
  border-radius: 50%;
  border: 1px solid black;
}

.fulllabelContainer {
  display: flex;
  margin-bottom: 10px;
  flex-wrap: wrap;
  gap: 5px;
}

.label {
  display: flex;
  align-items: center;
  gap: 5px;
  border-radius: 7px;
  padding: 2px 5px;
}

.fullLabelColor {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

@keyframes cardDetail {
  from {
    scale: 0;
  }
  to {
    scale: 100%;
  }
}
</style>
