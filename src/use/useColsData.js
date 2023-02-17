import { ref } from "vue";

const tasks = ref([
  {
    id: 1,
    colTitle: "title1",
    color: "#f0ffff",
    cards: [
      {
        id: "card1",
        title: "crad1",
        description: "card1 description",
        assignUsers: ["1", "2"],
        todos: [
          {
            name: "todo 1",
            isDone: false,
          },
        ],
        label: [
          {
            name: "urgent",
            color: "red",
          },
        ],
        deadline: new Date("2023-4-18"),
      },
    ],
  },
  {
    id: 2,
    colTitle: "title2",
    color: "#9bbcbc",
    cards: [
      {
        id: "card2",
        title: "card2",
        description: "card2 description",
        assignUsers: ["3", "4"],
        todos: [
          {
            name: "todo 2",
            isDone: false,
          },
        ],
        label: [
          {
            name: "ASAP",
            color: "maroon",
          },
        ],
        deadline: new Date("2023-2-28"),
      },
    ],
  },
]);

const showAddCard = ref(false);

export function useColsData() {
  const addCol = (title, color) => {
    tasks.value.push({
      id: tasks.value.length + 1,
      colTitle: title,
      color: color,
    });
  };

  // const getCards = (id) => {
  //   const cards = tasks.value.filter((task) => task.id === id);
  // };

  return {
    tasks,
    showAddCard,
    addCol,
    // getCards,
  };
}
