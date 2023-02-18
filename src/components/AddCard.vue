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

const { members, tasks, showAddCard } = useColsData();

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  id: {
    type: String,
  },
});

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
    return "5px solid #4aa4e8";
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
    // console.log(new Date(deadlineRef.value.value));
    // console.log(new Date(deadlineRef.value.value).getTime());
    return new Date(deadlineRef.value.value).getTime();
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
    showAddCard.value.isShow = false;
  }

  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};
</script>

<template>
  <div class="addCardTemplate">
    <h1 class="title">Add Card</h1>
    <section class="cardDetailSection">
      <div class="leftSection">
        <h3 class="cardTitle">Card Title</h3>
        <input
          class="titleInput"
          ref="titleInputRef"
          type="text"
          name="cardTitle"
          id="cardTitle"
          placeholder="Card Title"
        />
        <h3 class="descriptionLabel">Add Description</h3>
        <textarea
          ref="descriptionRef"
          name="description"
          id="description"
          cols="40"
          rows="8"
          class="descriptionInput"
          placeholder="Add Description ..."
        ></textarea>
        <button
          v-if="!showAssignList"
          @click="showAssignList = !showAssignList"
          class="assignBtn"
        >
          Assign
        </button>
        <div v-if="showAssignList" class="assignContainer">
          <h3 class="assignHeader">Assign</h3>
          <div class="assignList">
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
        </div>
        <button
          class="todoBtn"
          v-if="!showTodoList"
          @click="showTodoList = true"
        >
          Create ToDo list
        </button>
        <div v-if="showTodoList" class="todosContainer">
          <h3 class="todoHeader">Todos</h3>
          <ul class="todoList">
            <li v-for="(todo, index) in todosList" :key="index">
              {{ todo.name }}
            </li>
          </ul>
          <div class="addTodo">
            <input
              class="todoInput"
              v-model="todoInput"
              type="text"
              name="todo"
              id="todo"
            />
            <p class="addTodoBtn" @click="addTodoHandler">+</p>
          </div>
        </div>
      </div>
      <div class="veritcalLine"></div>
      <div class="rightSection">
        <h3 class="labelHeader">Select Label</h3>
        <div class="labelInputContainer">
          <input class="labelTextInput" type="text" v-model="labelText" />
          <input
            class="labelColorInput"
            ref="labelColor"
            type="color"
            name="lableColor"
            id="labelColor"
          />
        </div>
        <button @click="addLabel" class="labelBtn">Add Label</button>
        <h3 class="labelsListHeader" v-if="labels.length">Labels :</h3>
        <div v-for="(label, index) in labels" :key="index" class="labels">
          <div
            :style="{ backgroundColor: label.color }"
            class="labelColor"
          ></div>
          <p class="labelText">{{ label.name }}</p>
        </div>
        <h3 class="deadlineHeader">DeadLine</h3>
        <input
          ref="deadlineRef"
          type="date"
          name="deadline"
          id="deadline"
          class="dateInput"
        />
      </div>
    </section>
    <div class="btnContainer">
      <button class="addCardBtn" @click="addCard(id)">Add Card</button>
      <button class="cancelBtn" @click="showAddCard = false">cancel</button>
    </div>
  </div>
</template>

<style scoped>
.addCardTemplate {
  position: absolute;
  width: 65%;
  height: 100vh;
  background-color: #e9e2cf;
  top: 0;
  right: 0;
  z-index: 10;
  color: #4c4c47;
  padding: 20px;
  border-top-left-radius: 15px;
  border-bottom-left-radius: 15px;
  animation: addCard 0.3s;
}

.title {
  color: #2d2d2a;
  margin-bottom: 25px;
}

.cardDetailSection {
  display: flex;
  height: 80vh;
}

.leftSection {
  width: 50%;
}

.cardTitle {
  font-size: 18px;
  margin-bottom: 5px;
}

.titleInput {
  border: none;
  border-radius: 8px;
  height: 25px;
  width: 331px;
  padding: 3px 10px;
}

.titleInput::placeholder {
  color: #4c4c476b;
  font-family: "Poppins", sans-serif;
}

.descriptionLabel {
  font-size: 18px;
  margin-top: 20px;
  margin-bottom: 5px;
}

.descriptionInput {
  display: block;
  padding: 3px 10px;
  margin-bottom: 20px;
  width: 331px;
}

.descriptionInput::placeholder {
  color: #4c4c476b;
  font-family: "Poppins", sans-serif;
}

.assignBtn,
.todoBtn,
.labelBtn {
  border: none;
  border-radius: 10px;
  padding: 8px 20px;
  display: block;
  background-color: #b7b9ba;
  margin-bottom: 15px;
}

.labelsListHeader {
  margin-bottom: 2px;
}

.assignContainer {
  animation: assignList 0.3s;
  margin-bottom: 20px;
}

.assignHeader {
  display: block;
  margin-bottom: 15px;
}

.assignList {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  flex-wrap: wrap;
  gap: 10px;
}

.member {
  align-items: center;
  justify-content: center;
  text-align: center;
}

.memberImage {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all 0.05s ease-out;
}

.name,
.role {
  font-size: 10px;
  font-weight: 400;
}

.veritcalLine {
  border: 1px solid rgba(0, 0, 0, 0.21);
  width: 1px;
  min-height: 80%;
  margin: 0 25px;
}

.todoHeader {
  margin-bottom: 5px;
}

input:focus,
textarea:focus {
  outline: none;
}

input,
textarea {
  font-family: "Poppins", sans-serif;
  color: #4c4c47;
  border: none;
  border-radius: 8px;
}

.todoList {
  list-style: decimal;
  font-family: "Poppins", sans-serif;
  color: #4c4c47;
  margin-bottom: 10px;
  padding-left: 25px;
  font-size: 14px;
}

.addTodo {
  display: flex;
  gap: 8px;
}

.todoInput {
  width: 200px;
}

.addTodoBtn {
  display: block;
  cursor: pointer;
  font-size: 18px;
  font-weight: 600;
  background-color: #b7b9ba;
  border-radius: 50%;
  width: 26px;
  height: 26px;
  text-align: center;
  justify-content: center;
  align-items: center;
}

.rightSection {
  padding-left: 10px;
}

.labelInputContainer {
  display: flex;
  align-items: center;
}

.labelTextInput {
  width: 200px;
  margin-right: 10px;
}

.labelColorInput {
  border-radius: 50%;
  padding: 0;
  margin: 0;
  background: none;
  border: none;
}

.labelBtn {
  margin-top: 10px;
}

.labels {
  height: 20px;
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 3px;
}

.labelColor {
  width: 15px;
  height: 15px;
  border-radius: 50%;
}

.deadlineHeader {
  margin-top: 15px;
}

.dateInput {
  padding: 0 15px;
}

.btnContainer {
  direction: rtl;
}

.addCardBtn,
.cancelBtn {
  border: none;
  border-radius: 10px;
  padding: 15px 36px;
}

.addCardBtn {
  background-color: #429ee5;
  margin-left: 25px;
  color: #f4f1ea;
}

.cancelBtn {
  background-color: #c14953;
  color: #e9e2cf;
}

@keyframes assignList {
  from {
    scale: 0;
  }
  to {
    scale: 100%;
  }
}

@keyframes addCard {
  from {
    right: -65vw;
  }
  to {
    right: 0;
  }
}
</style>
