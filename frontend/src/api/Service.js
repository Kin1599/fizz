import axios from "axios"
import baseUrl from "../config";
import Password from "antd/es/input/Password";

export default class SendServer{
    //* Здесь можно писать функции, которые взаимодействуют с сервером

    //* Функция для проверки на CORS
    static async getPing(){
        return await axios.get(baseUrl + '/ping')
            .then(response => response.data)
            .catch(error => console.log('Error fetching products', error));
    }

    //*AUTH
    static async registration(email, hashed_password, consent){
        return await axios.post(baseUrl + '/register', {
            email: email,
            hashed_password: hashed_password,
            consent: consent
        })  
            .then(response => response.data)
            .catch(error => console.log('Error fetching registration', error));
    }

    static async login(email, password){
        return await axios.post(baseUrl + '/login', {}, {
            params: {
                email: email,
                password: password
            }
        })
            .then(response => response.data)
            .catch(error => console.log('Error fetching login', error));
    }
}

