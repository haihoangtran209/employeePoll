const { _saveQuestion, _saveQuestionAnswer } = require("./_DATA");
import { expect } from '@jest/globals';

describe("_saveQuestionAnswer", () => {
  it("should return true for correct parameters", async () => {
    const response = await _saveQuestionAnswer({
      authedUser: "sarahedo",
      qid: "8xf0y6ziyjabvozdd253nd",
      answer: "optionOne"
    });

    expect(response).toBeTruthy();
  });

  it("should return error for false parameters", async () => {
    try {
      await _saveQuestionAnswer({
        authedUser: "sarahedo",
        qid: undefined,
        answer: "optionOne"
      });
    } catch (error) {
      expect(error).toBe("Please provide authedUser, qid, and answer");
    }
  });
});

describe('_saveQuestion function', () => {
  test('should reject with error message when required fields are missing', () => {
    const mockQuestion = {
      optionOneText: 'Option One',
      author: 'user123'
    };

    return expect(_saveQuestion(mockQuestion)).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
  });
});