import {receiveUsers} from "./users";
import {receiveQuestions} from "./questions";
import {getInitialData} from "../util/_DATA";
import { setAuthedUser, logoutAuthedUser } from "./authedUser";

export const handleInitialData = () => async (dispatch) => {
    try {
        // Gọi hàm _getInitialData và chờ cho đến khi hàm này trả về kết quả
        const { users, questions } = await getInitialData()

        // Dispatch hai action cần thiết sau khi đã nhận dữ liệu ban đầu thành công
        dispatch(receiveUsers(users));
        dispatch(receiveQuestions(questions));
    } catch (error) {
        // Do nothing
    }
};

export const handleLogin = (username, password) => async (dispatch, getState) => {
    try {
        const { users } = getState();

        const user = Object.values(users).find(user => user.id === username && user.password === password);

        if (user) {
            dispatch(setAuthedUser(user));
        }
    } catch (error) {
        // Do nothing
    }
};

export const handleLogout = () => {
    return (dispatch) => {
        return dispatch(logoutAuthedUser());
    };
}