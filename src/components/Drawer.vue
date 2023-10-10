<template>
  <div class="max-w-2xl p-4 mx-auto">
    <div
      id="drawer-example"
      class="dct-drawer dct-drawer-fixed z-40 h-screen p-4 overflow-y-auto bg-slate-50 w-2/5 dct-modal transition-transform right-0 top-0 transform-none"
      tabindex="-1"
      aria-labelledby="drawer-label"
    >
      <button
        @click="closeDrawer"
        id="drawer-hide-button"
        type="button"
        aria-controls="drawer-example"
        class="dct-button text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 absolute top-2.5 right-2.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
      >
        <svg
          aria-hidden="true"
          class="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>
      <div class="mt-6">
        <div>
          <Input
            name="specification"
            label="Имя / Специализация"
            v-model="employeeStore.employee.specification"
          />
        </div>
        <div class="mt-2 mb-2">
          <div class="flex gap-64 justify-start">
            <label
              class="dct-label mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              Вопросы
            </label>
            <label
              class="dct-label mb-1 text-sm font-medium text-gray-900 dark:text-white"
            >
              План
            </label>
          </div>
          <div>
            <template
              v-for="(question, key) in questionStore.questions"
              :key="key"
            >
              <div class="mt-2">
                <div class="flex gap-2">
                  <Input
                    name="question[]"
                    v-model="questionStore.questions[key].question"
                  />
                  <Input
                    name="question[plan]"
                    v-model="questionStore.questions[key].plan"
                    placeholder="План"
                  />
                  <div>
                    <button
                      type="button"
                      @click="deleteQuestion(key)"
                      data-modal-target="delete-modal"
                      data-modal-toggle="delete-modal"
                      class="dct-button h-[42px] flex items-center text-[#ff6e6e] hover:text-white border border-[#ff6e6e] hover:bg-[#f45050] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-4 w-4 mr-2 -ml-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            </template>
          </div>
          <div class="mt-2 flex justify-end">
            <button
              @click="addQuestion"
              class="dct-button text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 flex justify-center items-center gap-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M12 4.5v15m7.5-7.5h-15"
                ></path>
              </svg>
              Добавить
            </button>
          </div>
        </div>
      </div>
      <div class="flex justify-between w-full mt-4 sm:py-2">
        <button
          @click="closeDrawer"
          type="button"
          class="dct-button text-gray-500 bg-white focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:focus:ring-gray-600"
        >
          Закрыть
        </button>
        <button
          @click="handleSave"
          type="button"
          class="dct-button text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Сохранить
        </button>
      </div>
    </div>
  </div>
</template>
<script setup>
import Input from "./Input.vue";
import { useEmployeesStore } from "../stores/employees.js";
import { useQuestionsStore } from "../stores/questions.js";

const employeeStore = useEmployeesStore();
const questionStore = useQuestionsStore();

async function handleSave() {
  await employeeStore.saveEmployee();
  await questionStore.saveQuestion(employeeStore.employee.id);
  closeDrawer();
  await employeeStore.getEmployees();
  employeeStore.$reset();
  questionStore.$reset();
}

function addQuestion() {
  questionStore.questions.push({
    id: "",
    question: "",
    plan: "",
  });
}

function deleteQuestion(index) {
  if (questionStore.questions[index].id) {
    questionStore.deleteQuestion(
      employeeStore.employee.id,
      questionStore.questions[index].id
    );
  }
  questionStore.questions.splice(index, 1);
}

const emits = defineEmits(["closeDrawer"]);

function closeDrawer() {
  emits("closeDrawer");
  employeeStore.$reset();
  questionStore.$reset();
}
</script>
