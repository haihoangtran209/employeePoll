import { connect } from "react-redux";
import avatarUserDefault from "../image/userDefault.jpg";

const Leaderboard = (props) => {
  const { users } = props;

  return (
    <div>
      <h1 className="text-3xl font-bold mt-9">Leaderboard</h1>

      <table className="table table-hover">
        <thead>
          <tr className="table-row">
            <th className="fs-5 fw-bolder p-4 pt-0 pb-3 bg-light">User</th>
            <th className="fs-5 fw-bolder p-4 pt-0 pb-3 bg-light">Answered</th>
            <th className="fs-5 fw-bolder p-4 pt-0 pb-3 bg-light">Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-4 pl-8">
                <img
                  src={user.avatar || avatarUserDefault}
                  alt="Avatar user"
                  className="float-left"
                />
                <br />
                <span className="display-5">{user.name}</span>
                <br />
                {user.id}
              </td>
              <td className="p-4">{Object.keys(user.answers).length}</td>
              <td className="p-4">{user.questions.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = ({ users }) => {
  const sortedUsers = Object.values(users).sort(
    (key1, key2) =>
      Object.keys(key2.answers).length +
      Object.keys(key2.questions).length -
      (Object.keys(key1.answers).length + Object.keys(key1.questions).length)
  );

  return { users: sortedUsers };
};

export default connect(mapStateToProps)(Leaderboard);
