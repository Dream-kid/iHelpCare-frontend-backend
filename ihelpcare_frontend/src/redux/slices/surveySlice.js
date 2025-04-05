import { createSelector, createSlice } from '@reduxjs/toolkit';
import { lib } from 'mukul-react-hooks';

const { arrayToCommaSeparatedText } = lib;

export const surveySlice = createSlice({
  name: 'survey',
  initialState: {
    stage: 'start', // start, question, result
    question: [],
    takeOfAnswer: 0,
    reStart: false,
  },
  reducers: {
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
    setStage: (state, action) => {
      state.stage = action.payload;
    },
    setTakeOfAnswer: (state, action) => {
      state.takeOfAnswer = action.payload;
    },
    setAnswerAgainstQuestion: (state, action) => {
      const question = state.question.map((data, index) => {
        if (index === action.payload.id) {
          return {
            ...data,
            answer: action.payload.answer,
          };
        }
        return data;
      });
      state.question = question;
    },
    setReStart: (state) => {
      state.reStart = !state.reStart;
    },
  },
});

export const { setQuestion, setStage, setTakeOfAnswer, setAnswerAgainstQuestion, setReStart } =
  surveySlice.actions;

export default surveySlice.reducer;

// select the questions from the state
const questions = (state) => state?.survey?.question;

// create a selector to format survey submission data
export const questionsAnswer = createSelector(
  [questions],
  // prettier-ignore
  (items) => (items?.map((item) => ({
    question_id: item?.id,
    answer: (item?.type === 'mcq' && item?.multi_select)
      ? arrayToCommaSeparatedText(item?.answer)
      : `${item?.answer}`,
  })))
);
