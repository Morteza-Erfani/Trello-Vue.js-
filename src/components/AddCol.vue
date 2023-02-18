<script setup>
import { useColsData } from "../use/useColsData";
import { ref } from "vue";

const showAdd = ref(false);
const addColBg = ref("");
const colTitleRef = ref(null);
const colorInputRef = ref(null);

const { addCol } = useColsData();

const addColHandler = () => {
  addCol(colTitleRef.value.value, colorInputRef.value.value);
  showAdd.value = false;
};
</script>

<template>
  <div class="addColContainer" :style="{ backgroundColor: addColBg }">
    <div @click="showAdd = true" v-if="!showAdd" class="addTransparent"></div>
    <p @click="showAdd = true" v-if="!showAdd" class="colPlus">+</p>
    <div v-if="showAdd" class="addColInput">
      <input
        ref="colTitleRef"
        class="colTitleInput"
        placeholder="Add Title"
        type="text"
      />
      <input
        v-model="addColBg"
        class="colColorInput"
        type="color"
        name="colColor"
        id="colColor"
        ref="colorInputRef"
      />
      <div class="buttons">
        <button class="ColBtn cancelColBtn" @click="showAdd = flase">
          Cancel
        </button>
        <button class="ColBtn addColBtn" @click="addColHandler">ADD</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.addColContainer {
  background-image: radial-gradient(#78786f, #4c4c47);
  color: black;
  padding: 15px;
  border-radius: 10px;
  width: 18em;
  height: 15em;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  box-shadow: -5px -3px 9px 3px rgba(76, 76, 71, 0.77);
}

.addTransparent {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.colPlus {
  font-size: 30px;
  text-align: center;
  cursor: pointer;
}

.addColInput {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 45px 0 30px;
  animation: colInput 0.3s;
}

.colTitleInput {
  border-radius: 10px;
  border: none;
  padding: 5px 10px;
  width: 100%;
  height: 30px;
}

.colTitleInput:focus {
  outline: none;
}

.colColorInput {
  border-radius: 50%;
  padding: 0;
  margin: 0;
  background: none;
  border: none;
}

.ColBtn {
  width: 60%;
  padding: 5px 0;
  border-radius: 10px;
  border: none;
  color: #e5dcc5;
}

.cancelColBtn {
  background-color: #c14953;
}

.addColBtn {
  background-color: #848fa5;
}

.buttons {
  display: flex;
  width: 100%;
  gap: 15px;
}

@keyframes colInput {
  from {
    scale: 0;
  }
  to {
    scale: 100%;
  }
}
</style>
