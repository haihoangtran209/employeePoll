import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { handleLogout } from "../actions/shared.js";

const Navbar = (props) => {
  const { authedUserId } = props;

  const logout = (e) => {
    e.preventDefault();
    props.dispatch(handleLogout());
  };

  return (
    <nav className="navbar bg-secondary ">
      <div className="container">
        <div className="float-left">
          <Link to="/" className="px-3 py-2 text-white">
            Home
          </Link>
          <Link to="/leaderboard" className="px-3 py-2 text-white">
            Leaderboard
          </Link>
          <Link to="/add" className="px-3 py-2 text-white">
            New
          </Link>
        </div>
        <div className="float-right">
          <span className="px-3 py-2 text-white" data-testid="user-information">
            User: {authedUserId}
          </span>
          <button onClick={logout} className="px-3 py-2 bg-warning rounded">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUserId: authedUser.id,
});

export default connect(mapStateToProps)(Navbar);
