import { saveQuestion, saveQuestionAnswer } from "../util/_DATA";
import { addAnswerUser, addQuestionUser } from "./users";

export const ADD_QUESTION = "ADD_QUESTION";
export const ADD_ANSWER_QUESTION = "ADD_ANSWER_QUESTION";
export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

function addAnswerQuestion(author, qid, answer) {
  return {
    type: ADD_ANSWER_QUESTION,
    author,
    qid,
    answer,
  };
}

export const handleAddQuestion =
  (firstOption, secondOption) => async (dispatch, getState) => {
    try {
      const { authedUser } = getState();

      // Gọi hàm _saveQuestion và chờ cho đến khi hàm này trả về kết quả
      const question = await saveQuestion(
        firstOption,
        secondOption,
        authedUser
      );

      // Dispatch hai action cần thiết sau khi đã lưu câu hỏi thành công
      dispatch(addQuestion(question));
      dispatch(addQuestionUser(question));

      // Trả về kết quả của việc dispatch action, để có thể xử lý tiếp nếu cần
      return question;
    } catch (error) {
      // Do nothing
    }
  };

export const handleAddAnswer = (questionId, answer) => {
  return async (dispatch, getState) => {
    const { authedUser } = getState();

    try {
      await saveQuestionAnswer(authedUser.id, questionId, answer);
      dispatch(addAnswerQuestion(authedUser.id, questionId, answer));
      dispatch(addAnswerUser(authedUser.id, questionId, answer));
    } catch (error) {
      // Do nothing
    }
  };
};
