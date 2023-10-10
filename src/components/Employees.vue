<template>
  <div class="h-screen relative p-6">
    <div class="flex justify-start mb-4">
      <button
          @click="prevPage"
          type="button"
          class="dct-button flex justify-center items-center gap-1 text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" viewBox="0 0 24 24" fill="none">
          <path d="M5 12H19M5 12L11 6M5 12L11 18" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
         Назад
      </button>
    </div>
    <div>
      <div class="dct-card">
        <div class="mx-6">
          <div class="border-gray-200 rounded-lg dark:border-gray-700">
            <div class="justify-center rounded dark:bg-gray-800">
              <section class="dark:bg-gray-900 antialiased">
                <div class="mx-auto">
                  <div>
                    <div class="overflow-x-auto text-center flex justify-start items-center">
                      <p class="">Авторизоваться в Telegram</p>
                      <div class="min-w-[420px] mx-4">
                        <Input name="token" :label="false" v-model="tokenStore.token"/>
                      </div>
                      <button type="button" @click="handleSave"
                              class="h-[40px] dtc-button px-[2%] text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                        <p class="w-max">{{ tokenStore.isExist ?'Изменить':'Авторизоваться' }}</p></button>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
        <Table @openDrawer="openDrawer"/>
      </div>
      <div class="dct-card my-6" :class="!tokenStore.isExist?'opacity-50 pointer-events-none':''">
        <GoogleAuth/>
      </div>
    </div>
    <Drawer v-if="showDrawer" @closeDrawer="closeDrawer"/>
  </div>
  <div v-if="loader" class="absolute w-full h-full top-0 left-0 bg-[#f5f5f5f5] flex justify-center items-center ">
    <div role="status">
      <svg
          aria-hidden="true"
          class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
          viewBox="0 0 100 101"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
      >
        <path
            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
            fill="currentColor"
        />
        <path
            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
            fill="currentFill"
        />
      </svg>
      <span class="sr-only">Loading...</span>
    </div>
  </div>
  <notifications position="top right" width="400px" :duration="5000" />

</template>
<script setup>
import Table from "./EmployeesTable.vue";
import GoogleAuth from "./GoogleAuth.vue";
import {onMounted, ref, watchEffect} from "vue";
import Drawer from "./Drawer.vue";
import router from "../routes/index.js";
import { useRoute, useRouter } from "vue-router";
import {useClientsStore} from "../stores/clients.js";
import {useEmployeesStore} from "../stores/employees.js";
import Input from "./Input.vue";
import {useTokenStore} from "../stores/token.js";
const tokenStore=useTokenStore();
const loader=ref(true)
function handleSave(){
  tokenStore.saveToken(clientStore.current_id)
}
const clientStore=useClientsStore()
const employeesStore=useEmployeesStore()

const route = useRoute();

const showDrawer=ref(false);
function openDrawer(){
  showDrawer.value=true
}

function prevPage(){
  router.push({ path: `/` })
}

function closeDrawer(){
  showDrawer.value=false
}

watchEffect( async () => {
  clientStore.current_id = route.params.id;
  await employeesStore.getEmployees()
  console.log(route.params.id)
  await tokenStore.tokenIsExist(route.params.id)
});

onMounted(()=>{
  setTimeout(()=>{
    loader.value=false
  },800)
})
</script>