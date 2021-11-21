import axios from 'axios'

const baseUrl = 'http://localhost:3005/anecdotes'

const getAll = async () => {
    console.log('Getting anecdotes from json-server.');
    const response = await axios.get(baseUrl)
    return response.data
}

const add = async (anecdote) => {
    const obj = { content: anecdote, votes: 0}
    console.log('services -> anecdotes -> obj:', obj)
    console.log('services -> anecdotes -> Adding anecdote: ', anecdote)
    const response = await axios.post(baseUrl, obj)
    console.log('services -> anecdotes -> response.data:', response.data)
    return response.data
}

export default { getAll, add }