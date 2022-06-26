// create a user reducer for login and register
const userReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOGIN':
        return action.payload;
        case 'LOGOUT':
        return {};
        default:
        return state;
    }
    }
export default userReducer;