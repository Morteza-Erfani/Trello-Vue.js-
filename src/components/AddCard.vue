<template>
  <div class="addCardTemplate">
    <h1 class="title">Add Card</h1>
    <section class="cardDetailSection">
      <div class="leftSection">
        <h3>Card Title</h3>
        <input type="text" name="cardTitle" id="cardTitle">
        <h3 class="descriptionLabel">Add Description</h3>
        <textarea
          name="description"
          id="description"
          cols="40"
          rows="8"
          class="descriptionInput"
        ></textarea>
        <button>Assign</button>
        <button>Create ToDo list</button>
      </div>
      <div class="veritcalLine"></div>
      <div class="rightSection">
        <h3>Select Label</h3>
        <div class="labelInputContainer">
          <input type="text" />
          <input type="color" name="lableColor" id="labelColor" />
        </div>
        <button>Add Label</button>
        <h4>DeadLine</h4>
        <input type="date" name="" id="" />
      </div>
    </section>
    <div class="btnContainer">
      <button>save</button>
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
</style>
