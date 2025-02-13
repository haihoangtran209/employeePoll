import { connect } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { handleAddAnswer } from "../actions/questions";
import avatarUserDefault from "../image/userDefault.jpg";
import { Button, Col, Container, Image, Row } from "react-bootstrap";

const PollPage = (props) => {
  const { authedUser, question, author } = props;
  const navigate = useNavigate();

  if (!authedUser || !question || !author) {
    return <Navigate to="/404" />;
  }

  const avatar = author?.avatarURL || avatarUserDefault;

  const hasVotedForOptionOne = question.optionOne.votes.includes(authedUser.id);
  const hasVotedForOptionTwo = question.optionTwo.votes.includes(authedUser.id);
  const hasVoted = hasVotedForOptionOne || hasVotedForOptionTwo;

  const handleOptionOne = (e) => {
    e.preventDefault();
    props.dispatch(handleAddAnswer(question.id, "optionOne"));
    navigate("/");
  };

  const handleOptionTwo = (e) => {
    e.preventDefault();
    props.dispatch(handleAddAnswer(question.id, "optionTwo"));
    navigate("/");
  };

  const calcPercentage = (option, question) => {
    const numberVotesTotal =
      question.optionOne.votes.length + question.optionTwo.votes.length;
    switch (option) {
      case "optionOne":
        return (
          (question.optionOne.votes.length / numberVotesTotal) * 100 + " %"
        );
      case "optionTwo":
        return (
          (question.optionTwo.votes.length / numberVotesTotal) * 100 + " %"
        );
      default:
        return "";
    }
  };

  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold mt-9">Poll by {author.id}</h2>

      <div className="flex justify-center">
        <Image src={avatar} alt="Profile" className="h-24 w-24" roundedCircle />
      </div>

      <div className="flex justify-center">
        <h2 className="text-2xl font-bold mt-6">Would you rather?</h2>
      </div>

      <Container>
        <Row>
          <Col>
            <Button
              onClick={handleOptionOne}
              disabled={hasVoted}
              className={"" + (hasVotedForOptionOne ? "bg-lime-400" : "")}
            >
              <div className={hasVotedForOptionOne ? "chosen" : ""}>
                <p className="">{question.optionOne.text}</p>
                {!hasVoted && (
                  <Button
                    variant="outline-success"
                    className="btn-block btn-light border-success w-100"
                  >
                    Click
                  </Button>
                )}
                {hasVoted && (
                  <p className="text-xs">
                    Votes: {question.optionOne.votes.length} (
                    {calcPercentage("optionOne", question)})
                  </p>
                )}
              </div>
            </Button>
          </Col>
          <Col>
            <Button
              onClick={handleOptionTwo}
              disabled={hasVoted}
              className={
                "p-2 rounded-xl bg-zinc-100 hover:shadow-xl transition " +
                (hasVotedForOptionTwo ? "bg-lime-400" : "")
              }
            >
              <p className="font-bold mb-2">{question.optionTwo.text}</p>
              {!hasVoted && (
                <Button
                  variant="outline-success"
                  className="btn-block btn-light border-success w-100"
                >
                  Click
                </Button>
              )}
              {hasVoted && (
                <p className="text-xs">
                  Votes: {question.optionTwo.votes.length} (
                  {calcPercentage("optionTwo", question)})
                </p>
              )}
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

const mapStateToProps = ({ authedUser, users, questions }) => {
  try {
    const question = Object.values(questions).find(
      (question) => question.id === useParams().id
    );
    const author = Object.values(users).find(
      (user) => user.id === question.author
    );
    return { authedUser, question, author };
  } catch (e) {
    return <Navigate to="/404" />;
  }
};

export default connect(mapStateToProps)(PollPage);