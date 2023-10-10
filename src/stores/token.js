import {onMounted, ref} from 'vue';
import { defineStore } from 'pinia';
import apiClient from '../../apiClient';
import {notify} from "@kyvg/vue3-notification";

export const useTokenStore = defineStore('token', () => {
    const token=ref(null)
    const isExist=ref(false)

    const saveToken = async (id) => {
      try {
          await apiClient.post(`control-metric/v1/employers/${id}/bot`,
              {
                  token:token.value
              }
          );
          await tokenIsExist(id)

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
    const tokenIsExist = async (id) => {
        console.log(id)
        const response = await apiClient.get(`control-metric/v1/employers/${id}/bot/exists`        );
        isExist.value=response.data.message
    };

    return {
        saveToken,
        tokenIsExist,
        isExist,
        token
    };
})