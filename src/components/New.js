import { connect } from "react-redux";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleAddQuestion } from "../actions/questions";

const New = ({ dispatch }) => {
    const navigate = useNavigate();
    const [firstOption, setFirstOption] = useState('');
    const [secondOption, setSecondOption] = useState('');

    const handleBtnSubmit = (e) => {
        e.preventDefault();
        // Dispatch action to add question
        dispatch(handleAddQuestion(firstOption, secondOption));
        // Navigate back to the home page
        navigate("/");
    };

    const handleFirstOptionChange = (e) => {
        setFirstOption(e.target.value);
    };

    const handleSecondOptionChange = (e) => {
        setSecondOption(e.target.value);
    };

    return (
        <div>
            <h1 className="text-center">Would You Rather</h1>
            <h4 className="text-center">Create Your Own Poll</h4>

            <form onSubmit={handleBtnSubmit}>

                <div className="input-group mb-4">
                    <span className="input-group-text">First Option</span>
                    <input
                        value={firstOption}
                        onChange={handleFirstOptionChange}
                        type="text"
                        name="firstOption"
                        id="firstOption"
                        data-testid="firstOption"
                        className="form-control" />
                </div>

                <div className="input-group mb-4">
                    <span className="input-group-text" id="second-option">Second Option</span>
                    <input
                        value={secondOption}
                        onChange={handleSecondOptionChange}
                        type="text"
                        name="secondOption"
                        id="secondOption"
                        data-testid="secondOption"
                        className="form-control" />

                </div>

                <div className="mt-3 text-center">
                    <button type="submit"
                        data-testid="submit"
                        className="btn btn-outline-info">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default connect()(New);
