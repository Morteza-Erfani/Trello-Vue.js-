<script setup>
import { useColsData } from "../use/useColsData";
import { ref } from "vue";

const showAdd = ref(false);
const addColBg = ref("");
const colTitle = ref("");

const { addCol } = useColsData();
</script>

<template>
  <div
    @click="showAdd = !showAdd"
    class="addColContainer"
    :style="{ backgroundColor: addColBg }"
  >
    <p v-if="!showAdd" class="colPlus">+</p>
    <div v-if="showAdd" class="addColInput">
      <input
        v-model="colTitle"
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
      />
      <button class="addColBtn" @click="addCol(colTitle, addColBg)">ADD</button>
    </div>
  </div>
</template>

<style scoped>
.addColContainer {
  background-color: #f8fff017;
  color: black;
  padding: 15px;
  border-radius: 10px;
  width: 18em;
  height: 15em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.colPlus {
  font-size: 30px;
  text-align: center;
}

.addColInput {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  width: 100%;
  padding: 45px 0 30px;
}

.colTitleInput {
  border-radius: 10px;
  border: none;
  padding: 5px 10px;
  width: 100%;
  height: 30px;
}

.colColorInput {
  border-radius: 50%;
  padding: 0;
  margin: 0;
  background: none;
  border: none;
}

.addColBtn {
  width: 60%;
  padding: 5px 0;
  border-radius: 10px;
  border: none;
}
</style>
