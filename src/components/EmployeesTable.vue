<template>
  <div class="mx-6 mt-8">
    <div class="overflow-x-auto">
      <table class="dct-table w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700  dark:bg-gray-700 dark:text-gray-400">
        <tr class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
          <th scope="row" class="px-4 py-3 font-bold text-gray-900 whitespace-nowrap dark:text-white">
            <div class="flex items-center mr-3">#</div>
          </th>
          <th scope="row" class="px-4 py-3 font-bold text-gray-900 whitespace-nowrap dark:text-white">
            <div class="flex items-center mr-3">Имя / Специализация</div>
          </th>
          <th scope="row" class="px-4 py-3 font-bolf text-gray-900 whitespace-nowrap dark:text-white">
            <div class="flex items-center mr-3">Ник в телеграмме</div>
          </th>
          <th></th>
        </tr>
        </thead>
        <tbody>
      <tr v-if="employeesStore.employees.length===0">
        <td colspan="4">
          <div class="text-center my-3 text-[16px]">Сотрудников пока нет</div>
        </td>
      </tr>
        <template v-for="(employee,key) in employeesStore.employees" :key="key">
          <tr class="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
            <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <div class="flex items-center mr-3">{{key+1}}</div>
            </th>
            <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <div class="flex items-center mr-3">{{employee.specification}}</div>
            </th>
            <th scope="row" class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              <div class="flex items-center mr-3">@{{employee.username}}</div>
            </th>
            <th class="flex justify-end px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white space-x-4">
              <button type="button" @click="editEmployee(employee.id)"
                      class="dct-button text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20"
                     fill="currentColor" aria-hidden="true">
                  <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z"></path>
                  <path fill-rule="evenodd"
                        d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                        clip-rule="evenodd"></path>
                </svg>
                Настроить
              </button>
              <button type="button" @click="deleteEmployee(employee.id)" data-modal-target="delete-modal" data-modal-toggle="delete-modal"
                      class="dct-button flex items-center text-[#ff6e6e] hover:text-white border border-[#ff6e6e] hover:bg-[#f45050] focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2 -ml-0.5" viewBox="0 0 20 20"
                     fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clip-rule="evenodd"></path>
                </svg>
                Удалить
              </button>
            </th>
          </tr>

        </template>
        </tbody>
      </table>
    </div>
    <div
        class="w-full md:w-auto flex px-4 mt-7 flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
      <button @click="openDrawer" type="button" id="createProductButton" data-modal-toggle="createProductModal"
              class="dct-button dct-google-button flex items-center justify-center text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15"></path></svg>
        Добавить сотрудника
      </button>
    </div>
  </div>
</template>
<script setup>

import {useEmployeesStore} from "../stores/employees.js";
import {useQuestionsStore} from "../stores/questions.js";
const employeesStore=useEmployeesStore()
const questionsStore=useQuestionsStore()



const emits=defineEmits(['openDrawer'])
function openDrawer(){
  emits('openDrawer')
}

function editEmployee(id){
  employeesStore.getEmployee(id)
  questionsStore.getQuestions(id)
  openDrawer();
}

function deleteEmployee(id){
  employeesStore.deleteEmployee(id)
}
</script>