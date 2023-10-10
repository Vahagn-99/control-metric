import {onMounted, ref} from 'vue';
import { defineStore } from 'pinia';
import apiClient from '../../apiClient';
import {useClientsStore} from "./clients.js";
import {notify} from "@kyvg/vue3-notification";

export const useEmployeesStore = defineStore('employees', () => {
    const clientsStore=useClientsStore()
    const employee=ref({
        id:'',
        specification:'',
    })
    const employees=ref([])
    const saveEmployee = async () => {
        const response=await apiClient.post(`control-metric/v1/employers/${clientsStore.current_id}/employees/`, employee.value);
        employee.value=response.data.data
    };

    const getEmployee = async (id) => {
        const response = await apiClient.get(`control-metric/v1/employers/${clientsStore.current_id}/employees/${id}`);
        employee.value=response.data.data
    };

    const getEmployees = async () => {
        const response = await apiClient.get(`control-metric/v1/employers/${clientsStore.current_id}/employees`);
        employees.value=response.data.data
    };

    const deleteEmployee = async (id) => {
        try {
            await apiClient.delete(`control-metric/v1/employers/${clientsStore.current_id}/employees/${id}`);
            await getEmployees()        ;
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
        employee.value={
            id:'',
            specification:'',
            username:''
        }
    }



    return {
        saveEmployee,
        getEmployees,
        getEmployee,
        deleteEmployee,
        employee,
        employees,
        $reset
    };
})