import { ref } from "vue";

const tasks = ref([
  // {
  //   id: 1,
  //   colTitle: "title1",
  //   color: "#f0ffff",
  //   cards: [
  //     {
  //       id: "card1",
  //       title: "crad1",
  //       description: "card1 description",
  //       assignUsers: ["1", "2"],
  //       todos: [
  //         {
  //           name: "todo 1",
  //           isDone: false,
  //         },
  //       ],
  //       label: [
  //         {
  //           name: "urgent",
  //           color: "red",
  //         },
  //       ],
  //       deadline: new Date("2023-4-18").getTime(),
  //     },
  //   ],
  // },
  // {
  //   id: 2,
  //   colTitle: "title2",
  //   color: "#9bbcbc",
  //   cards: [
  //     {
  //       id: "card2",
  //       title: "card2",
  //       description: "card2 description",
  //       assignUsers: ["3", "4"],
  //       todos: [
  //         {
  //           name: "todo 2",
  //           isDone: false,
  //         },
  //       ],
  //       label: [
  //         {
  //           name: "ASAP",
  //           color: "maroon",
  //         },
  //       ],
  //       deadline: new Date("2023-2-28").getTime(),
  //     },
  //   ],
  // },
]);

const members = ref([
  {
    id: 1,
    name: "Yousef Mohammadiani",
    role: "Backend Developer",
    imageURL: "/src/assets/profilePlaceholder.svg",
  },
  {
    id: 2,
    name: "Mahdi Toosi",
    role: "Frontend Developer",
    imageURL: "/src/assets/profilePlaceholder.svg",
  },
  {
    id: 3,
    name: "Morteza Erfani",
    role: "Frontend Developer",
    imageURL: "/src/assets/profilePlaceholder.svg",
  },
]);

const showAddCard = ref({
  isShow: false,
  id: Number,
});

const editingCard = ref({});

export function useColsData() {
  const addCol = (title, color) => {
    tasks.value.push({
      id: tasks.value.length + 1,
      colTitle: title,
      color: color,
      cards: [],
    });
    saveToStorage();
  };

  const saveToStorage = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks.value));
  };

  const getFromStorage = () => {
    const previousData = JSON.parse(localStorage.getItem("tasks"));

    if (previousData) {
      tasks.value = previousData;
    }
  };

  return {
    tasks,
    showAddCard,
    members,
    editingCard,
    addCol,
    saveToStorage,
    getFromStorage,
  };
}
