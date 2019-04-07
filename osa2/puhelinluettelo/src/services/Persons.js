import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    console.log('get all persons')
    
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const getOne = () => { console.log('get  Person') }

const create = ( name, phone ) => {
    console.log(`add person ${name} ${phone}`)

    const request = axios.post(baseUrl, {name, phone})
    return request.then(response => response.data)
}

const update = (person) => {
    console.log(`update person ${person}`)

    const request = axios.put(`${baseUrl}/${person.id}`, person)
    return request.then(response => response.data)
}

const remove = (personId) => {
    console.log(`remove Person ${personId}`)

    return axios.delete(`${baseUrl}/${personId}`)
}


export default { getAll, getOne, create, update, remove }