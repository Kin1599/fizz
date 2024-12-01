import axios from "axios"
import baseUrl from "../config";

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

    static async getUser(user_id){
        return await axios.get(baseUrl + `/users${user_id}`)
            .then(response => response.data)
            .catch(error => console.log('Error fetching user', error));
    }

    //* Cards

    static async getCards(){
        return await axios.get(baseUrl + '/cards')
            .then(response => response.data)
            .catch(error => console.log('Error fetching cards', error));
    }

    static async addCard(card_data){
        return await axios.post(baseUrl + '/cards', card_data)
            .then(response => response.data)
            .catch(error => console.log('Error fetching cards', error));
    }

    static async getCardInfo(card_id){
        return await axios.get(baseUrl + `/cards/${card_id}`)
            .then(response => response.data)
            .catch(error => console.log('Error fetching cards', error));
    }

    static async updateCard(card_id, card_data){
        return await axios.put(baseUrl + `/cards/${card_id}`, card_data)
            .then(response => response.data)
            .catch(error => console.log('Error fetching cards', error));
    }

    static async deleteCard(card_id){
        return await axios.delete(baseUrl + `/cards/${card_id}`)
            .then(response => response.data)
            .catch(error => console.log('Error fetching cards', error));
    }

    //* Transactions
    static async getTransactions(){
        return await axios.get(baseUrl + '/transactions')
            .then(response => response.data)
            .catch(error => console.log('Error fetching transactions', error));
    }

    static async addTransaction(transaction_data){
        return await axios.post(baseUrl + '/transactions', transaction_data)
            .then(response => response.data)
            .catch(error => console.log('Error fetching transactions', error));
    }

    static async getTransactionInfo(transaction_id){
        return await axios.get(baseUrl + `/transactions/${transaction_id}`)
            .then(response => response.data)
            .catch(error => console.log('Error fetching transactions', error));
    }

    static async updateTransaction(transaction_id, transaction_data){
        return await axios.put(baseUrl + `/transactions/${transaction_id}`, transaction_data)
            .then(response => response.data)
            .catch(error => console.log('Error fetching transactions', error));
    }

    static async deleteTransaction(transaction_id){
        return await axios.delete(baseUrl + `/transactions/${transaction_id}`)
            .then(response => response.data)
            .catch(error => console.log('Error fetching transactions', error));
    }

    //* Journals

    static async getJournals(){

        return [
            {
                id: 1,
                title: 'Личный фонд: налогообложение',
                content: 'Личный фонд, как новый инструмент наследования бизнеса и активов, проходит постоянную «донастройку» с точки зрения налогообложения. Общий тренд изменений в налогообложении Личных фондов направлен на учет его специфики. Под стать предназначению Личных фондов, налоговый режим стал приближен к налогообложению при личном владении и управлении активами...',
                tags: ['Фонды', 'Активы', 'Налоги'],
                date: '01.01.2023'
            },
        ]
        // return await axios.get(baseUrl + '/journals')
        //     .then(response => response.data)
        //     .catch(error => console.log('Error fetching journals', error));
    }
}

