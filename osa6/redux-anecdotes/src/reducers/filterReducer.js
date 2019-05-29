
const initialState = ''

export const setFilter = (filterText) => {

    return {
        type: 'FILTER',
        content: filterText
    }
}

const filterReducer = (state = initialState, action) => {
    console.log('action', action)

    switch (action.type) {
        case 'FILTER':
            return action.content
        default:
            return state
    }
}

export default filterReducer
