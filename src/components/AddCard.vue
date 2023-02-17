<script setup>
import { ref } from "vue";
import { useColsData } from "../use/useColsData";

const titleInputRef = ref(null);
const descriptionRef = ref(null);
const labelText = ref("");
const labelColor = ref(null);
const labels = ref([]);
const deadlineRef = ref(null);
const todoInput = ref("");
const todosList = ref([]);
const assignList = ref([]);
const showAssignList = ref(false);
const showTodoList = ref(false);

const { members, tasks } = useColsData();

const addTodoHandler = () => {
  if (todoInput.value) {
    todosList.value.push({
      name: todoInput.value,
      isDone: false,
    });
    todoInput.value = null;
  }
};

const assignHandler = (clickedMember) => {
  if (assignList.value.length) {
    let index = assignList.value.findIndex(
      (member) => member.id === clickedMember.id
    );
    if (index === -1) {
      assignList.value.push(clickedMember);
    } else {
      assignList.value = assignList.value.filter(
        (member) => member.id !== clickedMember.id
      );
    }
  } else {
    assignList.value.push(clickedMember);
  }
};

const isAssigned = (id) => {
  if (!assignList.value.length) {
    return "none";
  } else if (assignList.value.findIndex((member) => member.id === id) === -1) {
    return "none";
  } else {
    return "5px solid green";
  }
};

const addLabel = () => {
  if (labelText.value && labelColor.value.value) {
    labels.value.push({
      name: labelText.value,
      color: labelColor.value.value,
    });
    labelText.value = "";
  }
};

const isDeadlineSet = () => {
  if (deadlineRef.value.value) {
    return new Date(deadlineRef.value.value);
  } else {
    return false;
  }
};

const addCard = (id) => {
  if (titleInputRef.value.value && descriptionRef.value.value) {
    const index = tasks.value.findIndex((task) => task.id === id);

    tasks.value[index].cards.push({
      id: tasks.value[index].cards.length + 1,
      title: titleInputRef.value.value,
      description: descriptionRef.value.value,
      assignUsers: assignList.value,
      todos: todosList.value,
      label: labels.value,
      deadline: isDeadlineSet(),
    });
    console.log(tasks.value[index].cards[1]);
  }
};
</script>

<template>
  <div class="addCardTemplate">
    <h1 class="title">Add Card</h1>
    <section class="cardDetailSection">
      <div class="leftSection">
        <h3>Card Title</h3>
        <input
          ref="titleInputRef"
          type="text"
          name="cardTitle"
          id="cardTitle"
        />
        <h3 class="descriptionLabel">Add Description</h3>
        <textarea
          ref="descriptionRef"
          name="description"
          id="description"
          cols="40"
          rows="8"
          class="descriptionInput"
        ></textarea>
        <button
          v-if="!showAssignList"
          @click="showAssignList = !showAssignList"
        >
          Assign
        </button>
        <div v-if="showAssignList" class="assignList">
          <div
            v-for="(member, index) in members"
            :key="index"
            @click="assignHandler(member)"
            class="member"
          >
            <img
              :src="member.imageURL"
              :style="{ outline: isAssigned(member.id) }"
              class="memberImage"
            />
            <p class="name">{{ member.name }}</p>
            <p class="role">{{ member.role }}</p>
          </div>
        </div>
        <button v-if="!showTodoList" @click="showTodoList = true">
          Create ToDo list
        </button>
        <div v-if="showTodoList" class="todosContainer">
          <ul>
            <li v-for="(todo, index) in todosList" :key="index">
              {{ todo.name }}
            </li>
          </ul>
          <div class="addTodo">
            <input v-model="todoInput" type="text" name="todo" id="todo" />
            <p class="addTodoBtn" @click="addTodoHandler">+</p>
          </div>
        </div>
      </div>
      <div class="veritcalLine"></div>
      <div class="rightSection">
        <h3>Select Label</h3>
        <div class="labelInputContainer">
          <input type="text" v-model="labelText" />
          <input
            ref="labelColor"
            type="color"
            name="lableColor"
            id="labelColor"
          />
        </div>
        <button @click="addLabel">Add Label</button>
        <div
          v-for="(label, index) in labels"
          :key="index"
          :style="{ backgroundColor: label.color }"
          class="labels"
        >
          {{ label.name }}
        </div>
        <h4>DeadLine</h4>
        <input ref="deadlineRef" type="date" name="deadline" id="deadline" />
      </div>
    </section>
    <div class="btnContainer">
      <button @click="addCard(1)">Add Card</button>
      <button>cancel</button>
    </div>
  </div>
</template>

<style>
.addCardTemplate {
  position: absolute;
  width: 50%;
  height: 100vh;
  background-color: lemonchiffon;
  top: 0;
  right: 0;
  z-index: 10;
  color: black;
  padding: 20px;
}

.title {
  color: black;
}

.cardDetailSection {
  display: flex;
  height: 80vh;
}

.descriptionInput {
  display: block;
}

.veritcalLine {
  border: 1px solid rgba(0, 0, 0, 0.21);
  width: 1px;
  min-height: 80%;
  margin: 0 25px;
}

.btnContainer {
  direction: rtl;
}

.memberImage {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: cornflowerblue;
}

.labels {
  height: 20px;
}

.addTodo {
  display: flex;
}

.addTodoBtn {
  display: block;
  cursor: pointer;
}

.assignList {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.name,
.role {
  font-size: 12px;
}

.member {
  align-items: center;
  justify-content: center;
  text-align: center;
}
</style>
