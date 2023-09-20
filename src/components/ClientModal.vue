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
          <Input name="specification" label="Имя" v-model="clientStore.client.name"/>
        </div>
        <div class="mt-2">
          <Input name="username" label="Номер телефона" v-model="clientStore.client.phone"/>
        </div>
        <div class="mt-2">
          <Input name="username" label="amoCRM Id (Если есть)" v-model="clientStore.client.amocrm_id"/>
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
import {useClientsStore} from "../stores/clients.js";

const clientStore=useClientsStore()



async function handleSave(){

  await clientStore.saveClient()
  closeDrawer()
  clientStore.$reset()
  await clientStore.getClients()

}

const emits=defineEmits(['closeDrawer'])

function closeDrawer(){
  emits('closeDrawer')
  clientStore.$reset()
}

</script>