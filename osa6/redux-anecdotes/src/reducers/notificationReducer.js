
const initialState = []

export const setNotification = (messageId,message) => {

    return {
        type: 'NOTIFICATION',
        id: messageId,
        content: message
    }
}

export const removeNotification = (messageId) => {

    return {
        type: 'REMOVE_NOTIFICATION',
        id: messageId
    }
}

const notificationReducer = (state = initialState, action) => {
    console.log('action', action)

    switch (action.type) {
        case 'NOTIFICATION':
            return state.concat({content: action.content,id: action.id})
        case 'REMOVE_NOTIFICATION':
            return state.filter(message => message.id !== action.id)
        default:
            return state
    }
}

export default notificationReducer
