import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import avatarUserDefault from "../image/userDefault.jpg";
import { Image } from "react-bootstrap";

const PollItem = (props) => {
  const { question, author } = props;

  const navigate = useNavigate();
  const avatar = author?.avatarURL || avatarUserDefault;

  const showQuestion = (e) => {
    e.preventDefault();
    return navigate(`questions/${question.id}`);
  };

  return (
    <Link to={`questions/${question.id}`}>
      <div className="m-3 p-2 space-x-4">
        <div className="shrink-0">
          <Image
            className="h-12 w-12"
            src={avatar}
            alt="Author"
            roundedCircle
          />
        </div>
        <div>
          <div className="fs-5 text-black fw-bold">{question.author}</div>
          <p className="fs-6  fw-light fst-italic text-success">
            {new Date(question.timestamp).toDateString()}
          </p>

          <button
            type="submit"
            onClick={showQuestion}
            data-testid="submit"
            className="btn-block btn-light border-success w-100"
          >
            Show
          </button>
        </div>
      </div>
    </Link>
  );
};

export default connect()(PollItem);
