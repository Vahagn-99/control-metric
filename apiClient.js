import axios from 'axios';


window.baseUrl = 'https://widgets-api.dicitech.com/api/widgets/';
window.Host = 'https://widgets-api.dicitech.com/';

// window.baseUrl = 'http://127.0.0.1:8080/api/widgets/';
const apiClient = axios.create({
    baseURL: window.baseUrl,
    byWidgetId: false, // set default to false
});

// Helper function to get widget id
async function getWidgetId() {
    const fromLocalStorage = localStorage.getItem('CONTROL_METRIC_ID');
    if (fromLocalStorage) {
        return fromLocalStorage;
    }
    const { data: { data: { id: widgetId } } } = await apiClient.get('info/counter-metric');
    localStorage.setItem('CONTROL_METRIC_ID', widgetId);
    return widgetId;
}

apiClient.interceptors.request.use(async (config) => {
    if (config.byWidgetId) {
        const id = await getWidgetId();
        config.url = `${id}/${config.url}`; // append the widget id to the endpoint
    }
    delete config.byWidgetId; // remove custom parameter
    return config;
}, function (error) {
    return Promise.reject(error);
});

export default apiClient;
