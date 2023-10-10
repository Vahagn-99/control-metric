<template>
  <div class="mx-6">
    <div class="border-gray-200 rounded-lg dark:border-gray-700">
      <div class="justify-center rounded dark:bg-gray-800">
        <section class="dark:bg-gray-900 antialiased">
          <div class="mx-auto">
            <div>
              <div class="overflow-x-auto text-center flex justify-start items-center">
                <p class="mr-4">Авторизоваться в Google Таблицы</p>
                <button type="button" @click="handleAmoAuth"
                        class="h-[40px] dtc-button px-[2%] text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center">
                  <p class="w-max">Авторизоваться</p></button>
              </div>
              <div v-if="clientStore.client.google_sheets_url" class="flex items-center w-full mt-3">
                <p class="mr-4">
                  <div>{{clientStore.client.google_sheets_url}}</div>
                </p>
                <button
                    @click="copy"
                    class="h-[40px] dtc-button px-[2%] text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                >
                  <svg width="24px" height="24px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="ui-svg-inline"><path fill="#ffffff" d="M21,8.94a1.31,1.31,0,0,0-.06-.27l0-.09a1.07,1.07,0,0,0-.19-.28h0l-6-6h0a1.07,1.07,0,0,0-.28-.19.32.32,0,0,0-.09,0A.88.88,0,0,0,14.05,2H10A3,3,0,0,0,7,5V6H6A3,3,0,0,0,3,9V19a3,3,0,0,0,3,3h8a3,3,0,0,0,3-3V18h1a3,3,0,0,0,3-3V9S21,9,21,8.94ZM15,5.41,17.59,8H16a1,1,0,0,1-1-1ZM15,19a1,1,0,0,1-1,1H6a1,1,0,0,1-1-1V9A1,1,0,0,1,6,8H7v7a3,3,0,0,0,3,3h5Zm4-4a1,1,0,0,1-1,1H10a1,1,0,0,1-1-1V5a1,1,0,0,1,1-1h3V7a3,3,0,0,0,3,3h3Z"></path></svg>
                </button>
                <button
                    class=" h-[40px] dtc-button px-[2%] text-white bg-[#4c8bf7] hover:bg-[#5c8bf9] focus:ring-4 py-2.5 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm py-2.5 text-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex items-center"
                >
                  <a :href="clientStore.client.google_sheets_url" target="_blank" class="dtc-a text-white flex items-center justify-center">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        width="24px"
                        height="24px"
                    >
                      <path
                          fill="#ffffff"
                          d="M 19.980469 2.9902344 A 1.0001 1.0001 0 0 0 19.869141 3 L 15 3 A 1.0001 1.0001 0 1 0 15 5 L 17.585938 5 L 8.2929688 14.292969 A 1.0001 1.0001 0 1 0 9.7070312 15.707031 L 19 6.4140625 L 19 9 A 1.0001 1.0001 0 1 0 21 9 L 21 4.1269531 A 1.0001 1.0001 0 0 0 19.980469 2.9902344 z M 5 3 C 3.9069372 3 3 3.9069372 3 5 L 3 19 C 3 20.093063 3.9069372 21 5 21 L 19 21 C 20.093063 21 21 20.093063 21 19 L 21 13 A 1.0001 1.0001 0 1 0 19 13 L 19 19 L 5 19 L 5 5 L 11 5 A 1.0001 1.0001 0 1 0 11 3 L 5 3 z"
                      />
                    </svg>
                  </a>
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script setup>
import {useClientsStore} from "../stores/clients.js";
import {onMounted} from "vue";

const clientStore=useClientsStore()


async function handleAmoAuth() {
  await oauthModal(
      `${window.Host}api/google-sheets/auth/`+clientStore.current_id
  ).then(async (e) => {
    await clientStore.getClient(clientStore.current_id);
  });
}
 function oauthModal(url) {
  return new Promise((resolve, reject) => {
    const win = window.open(url, '_blank', 'width=800,height=600')
    window.addEventListener('message', function (event) {
      if (event.origin !== "https://widgets-api.dicitech.com")
        return;
      if (event.data === "closed") {
        resolve();
      }
    }, false);
  })
}

function copy(){
  navigator.clipboard.writeText(clientStore.client.google_sheets_url);
  notify({
    type: 'success',
    title: "Ссылка скопирована в буфер",
  });
}

onMounted(async () => {
  await clientStore.getClient(clientStore.current_id);
})

</script>