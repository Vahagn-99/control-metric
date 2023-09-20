import {onMounted, ref} from 'vue';
import { defineStore } from 'pinia';
import apiClient from '../../apiClient';
import {notify} from "@kyvg/vue3-notification";

export const useClientsStore = defineStore('clients', () => {
    const client=ref({
        id:'',
        name:'',
        phone:'',
        amocrm_id:''
    })

    const current_id=ref('')

    const clients=ref([]);
    const getClient = async (id) => {
        const response = await apiClient.get(`control-metric/v1/employers/${id}`);
        client.value=response.data.data
    };

    const getClients = async () => {
        const response = await apiClient.get(`control-metric/v1/employers`);
        clients.value=response.data.data

    };

    const saveClient = async () => {
        try {
            await apiClient.post(`control-metric/v1/employers`,client.value);
            notify({
                type: 'success',
                title: "Пользователь #",
                text: "Настройки успешно сохранены",
            });
        } catch (error) {
            notify({
                type: 'error',
                title: "Пользователь #",
                text: "Заполните все поля или попробуйте авторизоваться еще раз",
            });
        }
    };

    const deleteClient = async (id) => {

        try {
            await apiClient.delete(`control-metric/v1/employers/${id}`);
            await getClients()          ;
            notify({
                type: 'success',
                title: "Пользователь #",
                text: "Настройки успешно Удалены",
            });
        } catch (error) {
            notify({
                type: 'error',
                title: "Пользователь #",
                text: "Что-то пошло не так! Повтарите действе",
            });
        }

    };

    function $reset() {
        client.value={
            id:'',
            name:'',
            phone:'',
            amocrm_id:''
        }
    }

    onMounted(async ()=>{
        await getClients()
    })



    return {
        getClient,
        getClients,
        saveClient,
        deleteClient,
        clients,
        client,
        current_id,
        $reset
    };
})