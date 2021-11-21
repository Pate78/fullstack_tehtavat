const notificationReducer = (state='', action) => {
    switch(action.type) {
        case 'SET_MESSAGE':
            return action.data.message
        default:
            return state
    }

}

export const changeNotification = (message) => {
    return {
        type: 'SET_MESSAGE',
        data: {message}
    }
}

// export const hideNotification = () => {
//     return {
//         type: 'HIDE',
//         data: ''
//     }
// }

// export const showNotification = (message) => {
//     return {
//         type: 'SHOW',
//         data: {message}
//     }
// }

export default notificationReducer