import axios from 'axios'
import {fetchUsersFailure,fetchUsersSuccess,fetchUsersRequest} from './usersActions'

export const fetchUsers = () => {
    return dispatch => {
        dispatch(fetchUsersRequest())
        axios.get('http://localhost:3000/users')
            .then(response => {
                //setTimeout for imitation fetch to server
                setTimeout(() => {
                    dispatch(fetchUsersSuccess(response?.data))
                }, 1000);
            })
            .catch(error => {
                dispatch(fetchUsersFailure(error?.message))
            })
    }
}