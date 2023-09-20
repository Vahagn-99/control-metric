import { ref } from 'vue';
import { defineStore } from 'pinia';
import apiClient from '../../apiClient';
import {useEmployeesStore} from "./employees.js";
import {notify} from "@kyvg/vue3-notification";

export const useQuestionsStore = defineStore('questions', () => {
    const employeesStore=useEmployeesStore()

    const questions=ref([])
    const employee=employeesStore.employee
    const saveQuestion = async (id) => {
        try {
            await apiClient.post(`control-metric/v1/employees/${id}/questions`, {questions: questions.value});
            notify({
                type: 'success',
                title: "Пользователь #" + id,
                text: "Настройки успешно сохранены",
            });
        } catch (error) {
            notify({
                type: 'error',
                title: "Пользователь #" + id,
                text: "Что-то пошло не так! Заполните все поля или попробуйте еще раз",
            });
        }
    };

    const getQuestions = async (id) => {
        const response = await apiClient.get(`control-metric/v1/employees/${id}/questions`,);
        questions.value=response.data.data
    };

    const deleteQuestion = async (employee_id,id) => {
        await apiClient.delete(`control-metric/v1/employees/${employee_id}/questions/${id}`);
    };

    function $reset() {
        questions.value=[]
    }

    return {
        saveQuestion,
        getQuestions,
        deleteQuestion,
        questions,
        $reset
    };
})