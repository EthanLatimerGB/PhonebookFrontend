import Axios from 'axios'
const baseUrl = '/api/persons/'

const getAll = () => {
    const promise = Axios.get(baseUrl)
    return promise.then(response => response.data)
}

const create = (NewObj) => {
    const request = Axios.post(baseUrl, NewObj)
    return request.then(response => response.data)
}

const deleteContact = (deleteObj) => {
    const request = Axios.delete(baseUrl + deleteObj.id)
    return request.then(response => response.data)
}

export default {
    getAll, create, deleteContact
}