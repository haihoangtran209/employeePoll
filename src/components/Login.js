import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { handleLogin } from "../actions/shared.js";

const Login = (props) => {

    // const { loggedIn, users, authedUser } = props;
    const { loggedIn, users, userIds } = props;

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    if (loggedIn) {
        const urlParams = new URLSearchParams(window.location.search);
        const redirectUrl = urlParams.get('redirectTo');
        return <Navigate to={redirectUrl ? redirectUrl : "/"}/>;
    }

    let usersArr = []
    for (let i = 0; i < userIds.length; i++) {
        usersArr.push(users[userIds[i]])
    }

    const handleBtnLogin = (e) => {
        e.preventDefault();
        props.dispatch(handleLogin(username, password));
        setUsername("");
        setPassword("");
    };

    return (
        <div>
            <h1 className="text-center" data-testid="login-id">Login</h1>
            <form onSubmit={handleBtnLogin}>
                <div className="input-group mb-4">
                    <span className="input-group-text">Username</span>
                    <select
                        className="form-control"
                        name="login"
                        onChange={(e => (setUsername(e.target.value)))}
                        data-testid="test-select"
                    >
                        <option>Choose your username</option>
                        {usersArr.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="input-group mb-4">
                    <span className="input-group-text" id="password">Password</span>
                    <input
                        value={password}
                        onChange={(e => (setPassword(e.target.value)))}
                        type="password"
                        name="password"
                        id="password"
                        data-testid="password"
                        className="form-control" />
                </div>
                <div className="mt-3 text-center">
                    <button type="submit"
                        data-testid="submit"
                        className="btn btn-outline-info">
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
};

const mapStateToProps = ({ authedUser, users }) => {

    const userIds = Object.keys(users)

    return { loggedIn: !!authedUser, users, userIds };
}

export default connect(mapStateToProps)(Login);