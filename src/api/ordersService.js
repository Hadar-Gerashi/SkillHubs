import axios from 'axios'

const baseUrl = "https://skillhub-1-a27y.onrender.com/api/order"

//אפשרות להוספת הזמנה
export const addOrder = (data, token) => {
    console.log(data)
    return axios.post(`${baseUrl}`, data, {
        headers: {
            authorization: token
        }
    })
}

//אפשרות לקבלת רשימת הזמנות לפי משתמש
export const getOrderById = (id) => {
    return axios.get(`${baseUrl}/${id}`)
}

//אפשרות לקבלת כל ההזמנות שבוצעו
export const getOrders = () => {
    return axios.get(`${baseUrl}/`)
}





