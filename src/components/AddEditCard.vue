<script setup>
import { onMounted, ref } from "vue";
import { useColsData } from "../use/useColsData";
import moment from "moment";

const descriptionRef = ref(null);
const editMode = ref(false);

const { members, tasks, showAddCard, editingCard } = useColsData();

// eslint-disable-next-line no-unused-vars
const props = defineProps({
  colId: {
    type: String,
  },
});

// On Mounted
onMounted(() => {
  editMode.value = Boolean(Object.keys(editingCard.value).length);
  if (editMode.value) {
    titleInputRef.value.value = editingCard.value.title;
    descriptionRef.value.value = editingCard.value.description;
    assignList.value = editingCard.value.assignUsers;
    todosList.value = editingCard.value.todos;
    labels.value = editingCard.value.label;
    deadlineRef.value.value = moment(editingCard.value.deadline).format(
      "YYYY-MM-DD"
    );
  }
});

//  Title On Mounted

const titleInputRef = ref(null);

onMounted(() => {
  titleInputRef.value.focus();
});

// Todo On Mounted

onMounted(() => {
  if (editMode.value) {
    checkedTodo.value = editingCard.value.todos.filter((todo) => todo.isDone);
    uncheckedTodo.value = editingCard.value.todos.filter(
      (todo) => !todo.isDone
    );
  }
});

//  Assign

const assignList = ref([]);
const showAssignList = ref(false);

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

const editAssign = () => {
  if (editMode.value && assignList.value.length) {
    return false;
  } else {
    return true;
  }
};

//  Todo

const todoInput = ref("");
const todosList = ref([]);
const todoInputRef = ref(null);

const addTodoHandler = () => {
  if (todoInput.value) {
    todosList.value.push({
      name: todoInput.value,
      isDone: false,
    });
    todoInput.value = null;
    todoInputRef.value.focus();
    if (editMode.value) {
      checkedTodo.value = editingCard.value.todos.filter((todo) => todo.isDone);
      uncheckedTodo.value = editingCard.value.todos.filter(
        (todo) => !todo.isDone
      );
    }
  }
};

const editTodo = () => {
  if (editMode.value && todosList.value.length) {
    return false;
  } else {
    return true;
  }
};

const newTodoRef = ref(null);
const newTodo = ref("");
const checkedTodo = ref([]);
const uncheckedTodo = ref([]);
const changetodo = ref();

// const changeTodoHandler = (index) => {
//   console.log(uncheckedTodo.value[index].name);
//   console.log(newTodoRef.value[0].value);
//   uncheckedTodo.value[index].name = newTodoRef.value[0].value;
//   changetodo.value = null;
//   newTodoRef.value = null;
//   const findI = todosList.value.findIndex(
//     (todo) => (todo.name = uncheckedTodo.value[index].name)
//   );
//   console.log(todosList.value);
//   console.log(findI);
//   todosList.value[findI].name = newTodoRef.value[0].value;
// };

const changeTodoHandler = (index) => {
  uncheckedTodo.value[index].name = newTodoRef.value[0].value;
  changetodo.value = null;
  newTodoRef.value = null;
};

const openChangeTodo = (index, name) => {
  changetodo.value = index;
  newTodo.value = name;
};

const showTodoList = ref(false);

const showTodoHandler = () => {
  showTodoList.value = true;
  setTimeout(() => {
    todoInputRef.value.focus();
  }, 10);
};

//  Label

const labelText = ref("");
const labelColor = ref(null);
const labels = ref([]);
const lableInputRef = ref(null);
const editLabel = ref(false);

const addLabel = () => {
  if (labelText.value && labelColor.value.value) {
    labels.value.push({
      name: labelText.value,
      color: labelColor.value.value,
    });
    labelText.value = "";
    setTimeout(() => {
      lableInputRef.value.focus();
    }, 10);
  }
};

const editedLabelIndex = ref();

const editLabelHandler = (name, color, index) => {
  // lableInputRef.value.value = name;
  labelText.value = name;
  labelColor.value.value = color;
  editLabel.value = true;
  editedLabelIndex.value = index;
};

const changeLabel = () => {
  labels.value[editedLabelIndex.value] = {
    name: labelText.value,
    color: labelColor.value.value,
  };
  labelText.value = "";
  labelColor.value.value = "";
};

//  Deadline

const deadlineRef = ref(null);

const isDeadlineSet = () => {
  if (deadlineRef.value.value) {
    return new Date(deadlineRef.value.value).getTime();
  } else {
    return false;
  }
};

const addCard = (colId) => {
  if (titleInputRef.value.value && descriptionRef.value.value) {
    const index = tasks.value.findIndex((task) => task.id === colId);

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

const cancelHandler = () => {
  (showAddCard.value.isShow = false), (editingCard.value = {});
};

const saveChanges = () => {
  if (titleInputRef.value.value && descriptionRef.value.value) {
    const taskIndex = tasks.value.findIndex(
      (task) => task.id === showAddCard.value.id
    );
    const cardIndex = tasks.value[taskIndex].cards.findIndex(
      (card) => (card.id = editingCard.value.id)
    );

    tasks.value[taskIndex].cards[cardIndex] = {
      id: editingCard.value.id,
      title: titleInputRef.value.value,
      description: descriptionRef.value.value,
      assignUsers: assignList.value,
      todos: uncheckedTodo.value.concat(checkedTodo.value),
      label: labels.value,
      deadline: isDeadlineSet(),
    };
    showAddCard.value.isShow = false;
  }

  localStorage.setItem("tasks", JSON.stringify(tasks.value));
};
</script>

<template>
  <div class="addCardTemplate">
    <h1 class="title">{{ editMode ? "Edit Card" : "Add Card" }}</h1>
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
          v-if="!showAssignList && editAssign()"
          @click="showAssignList = !showAssignList"
          class="assignBtn"
        >
          Assign
        </button>
        <div v-if="showAssignList || !editAssign()" class="assignContainer">
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
          v-if="!showTodoList && editTodo()"
          @click="showTodoHandler"
        >
          Create ToDo list
        </button>
        <div v-if="showTodoList || !editTodo()" class="todosContainer">
          <h3 class="todoHeader">Todos</h3>
          <ul v-if="!editMode" class="todoList">
            <li v-for="(todo, index) in todosList" :key="index">
              {{ todo.name }}
            </li>
          </ul>

          <ul v-if="editMode" class="todoList">
            <li
              class="uncheckedTodo"
              v-for="(todo, index) in uncheckedTodo"
              :key="index"
            >
              <div v-if="changetodo !== index" class="innerUncheckedTodo">
                <p>{{ todo.name }}</p>
                <img
                  class="editBtn"
                  src="../assets/edit-button-svgrepo-com.svg"
                  @click="openChangeTodo(index, todo.name)"
                />
              </div>
              <div v-if="changetodo === index" class="cahngeTodoContainer">
                <input
                  class="changeTodoInput"
                  ref="newTodoRef"
                  type="text"
                  :value="newTodo"
                />
                <img
                  class="saveTodoChange"
                  src="../assets/tick-svgrepo-com.svg"
                  @click="changeTodoHandler(index)"
                />
              </div>
            </li>
            <li
              class="checkedTodo"
              v-for="(todo, index) in checkedTodo"
              :key="index"
            >
              {{ todo.name }}
            </li>
          </ul>
          <div class="addTodo">
            <input
              class="todoInput"
              v-model="todoInput"
              ref="todoInputRef"
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
          <input
            class="labelTextInput"
            type="text"
            v-model="labelText"
            ref="lableInputRef"
          />
          <input
            class="labelColorInput"
            ref="labelColor"
            type="color"
            name="lableColor"
            id="labelColor"
          />
        </div>
        <button v-if="!editLabel" @click="addLabel" class="labelBtn">
          Add Label
        </button>
        <button v-if="editLabel" @click="changeLabel" class="labelBtn">
          Save Change
        </button>
        <h3 class="labelsListHeader" v-if="labels.length">Labels :</h3>
        <div v-for="(label, index) in labels" :key="index" class="labels">
          <div class="innerLabels">
            <div
              :style="{ backgroundColor: label.color }"
              class="labelColor"
            ></div>
            <p class="labelText">{{ label.name }}</p>
          </div>
          <div v-if="editMode">
            <img
              class="editBtn"
              src="../assets/edit-button-svgrepo-com.svg"
              @click="editLabelHandler(label.name, label.color, index)"
            />
          </div>
        </div>
        <h3 class="deadlineHeader">DeadLine</h3>
        <input
          ref="deadlineRef"
          type="date"
          name="deadline"
          id="deadline"
          class="dateInput"
          @input="logger"
        />
      </div>
    </section>
    <div class="btnContainer">
      <button v-if="!editMode" class="addCardBtn" @click="addCard(colId)">
        Add Card
      </button>
      <button v-if="editMode" @click="saveChanges" class="addCardBtn">
        Save
      </button>
      <button class="cancelBtn" @click="cancelHandler">cancel</button>
    </div>
  </div>
  <div @click="cancelHandler" class="disableRest" />
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

.disableRest {
  width: 100%;
  z-index: 5;
  background-color: #9e9e9eaf;
  height: 100vh;
  top: 0;
  left: 0;
  position: absolute;
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
  cursor: pointer;
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
  cursor: pointer;
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
  padding: 3px 10px;
}

.todoList {
  list-style: decimal;
  font-family: "Poppins", sans-serif;
  color: #4c4c47;
  margin-bottom: 10px;
  padding-left: 25px;
  font-size: 14px;
}

ul.todoList {
  padding-left: 20px;
}

.checkedTodo {
  text-decoration: line-through;
}

.uncheckedTodo {
  width: 55%;
  gap: 10px;
  padding: 0 5px;
}

.uncheckedTodo:hover {
  background-color: #d6d6d670;
}

.innerUncheckedTodo {
  display: flex;
  justify-content: space-between;
}

.editBtn {
  width: 18px;
  opacity: 0.7;
  cursor: pointer;
}

.cahngeTodoContainer {
  display: flex;
  justify-content: space-between;
}

.changeTodoInput {
  width: 83%;
}

.saveTodoChange {
  width: 15px;
  opacity: 70%;
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
  justify-content: space-between;
  width: 65%;
}

.labels:hover {
  background-color: #a9a9a968;
  border-radius: 10px;
}

.innerLabels {
  display: flex;
  align-items: center;
  gap: 5px;
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
  cursor: pointer;
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

.disableRest {
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
