import axios from "axios";
const baseUrl = '/api/persons'

const getAll = () => {
    console.log('Getting data from url:',baseUrl);
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`,newObject)
}

const remove = id => {
    return axios.delete(`${baseUrl}/${id}`)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    getAll, create, update, remove
}