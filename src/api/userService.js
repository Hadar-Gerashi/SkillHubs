import axios from 'axios'

const baseUrl = "https://skillhub-1-a27y.onrender.com/api/user"

//אפשרות לכניסת משתמש
export const login = (email, password) => {
    return axios.post(`${baseUrl}/logIn`, { email, password })
}

//אפשרות להוספת משתמש
export const signUp = (password, tz, email, name, role) => {
    return axios.post(`${baseUrl}`, { password, tz, email, name, role })
}

//קבלת כל המשתמשים
export const getUser = () => {
    return axios.get(`${baseUrl}`)
}









