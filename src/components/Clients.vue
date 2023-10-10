<template>
  <div class="h-screen relative p-6">
    <div>
      <div class="dct-card">
        <ClientsTable @openDrawer="openDrawer"/>
      </div>
    </div>
    <ClientModal v-if="showDrawer" @closeDrawer="closeDrawer"/>
  </div>
  <notifications position="top right" width="400px" :duration="5000" />

</template>
<script setup>
import {ref} from "vue";
import ClientsTable from "./ClientsTable.vue";
import ClientModal from "./ClientModal.vue";

const showDrawer=ref(false);
function openDrawer(){
  showDrawer.value=true
}

function closeDrawer(){
  showDrawer.value=false
}
</script>