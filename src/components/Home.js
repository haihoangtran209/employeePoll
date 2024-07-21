import { connect } from "react-redux";
import { Card } from "react-bootstrap";
import PollItem from "./PollItem.js";

const Home = (props) => {
  const { authedUser, questions, users } = props;

  const newQuestion = (question) =>
    !question.optionOne.votes.includes(authedUser.id) &&
    !question.optionTwo.votes.includes(authedUser.id);

  const doneQuestion = (question) =>
    question.optionOne.votes.includes(authedUser.id) ||
    question.optionTwo.votes.includes(authedUser.id);

  return (
    <div>
      <h1 className="text-2xl font-bold mt-6 text-left" data-testid="heading">
        Home
      </h1>

      <ul className="nav nav-tabs align-items-center" id="tabNavs01">
        <li className="nav-item">
          <a
            id="t-customer"
            data-bs-toggle="tab"
            className="nav-link active"
            href="#tabquestion"
          >
            Questions
          </a>
        </li>
        <li className="nav-item">
          <a
            id="t-position"
            data-bs-toggle="tab"
            className="nav-link"
            href="#tabdone"
          >
            Done
          </a>
        </li>
      </ul>

      <div
        className="tab-content d-flex flex-nowrap align-items-center"
        id="tabCont01"
      >
        <div className="tab-pane fade show active flex-grow-1" id="tabquestion">
          <div className="new-container">
            <div className="mb-3">
              <Card className="bg-white text-green">
                <Card.Title className="fs-2 text-success w-100 text-center mt-2">
                  New Questions
                </Card.Title>
              </Card>
            </div>

            <div className="container">
              <div className="row gx-5">
                {questions &&
                  questions.filter(newQuestion).map((question) => (
                    <div className="col mb-3" key={question.id}>
                      <Card style={{ width: "18rem" }}>
                        <Card.Body>
                          <Card.Text className="text-center">
                            <PollItem
                              question={question}
                              author={users[question.author]}
                            />
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
        <div className="tab-pane fade flex-grow-1" id="tabdone">
          <div className="new-container">
            <div className="mb-3">
              <Card className="bg-white text-green">
                <Card.Title className="fs-2 text-success text-center mt-2">
                  Done
                </Card.Title>
              </Card>
            </div>
            <div className="container">
              <div className="row gx-5">
                {questions &&
                  questions.filter(doneQuestion).map((question) => (
                    <div className="col mb-3" key={question.id}>
                      <Card style={{ width: "18rem" }}>
                        <Card.Body>
                          <Card.Text className="text-center">
                            <PollItem
                              question={question}
                              author={users[question.author]}
                            />
                          </Card.Text>
                        </Card.Body>
                      </Card>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ authedUser, questions, users }) => ({
  questions: Object.values(questions).sort(
    (time1, time2) => time2.timestamp - time1.timestamp
  ),
  authedUser,
  users,
});

export default connect(mapStateToProps)(Home);