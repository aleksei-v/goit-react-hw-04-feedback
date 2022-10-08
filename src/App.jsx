import { useState } from "react";
import { Box } from "./components/Box";
import FeedbackOptions from './components/Feedback/FeedbackOptions';
import Statistics from './components/Feedback/Statistics';
import Section from './components/Feedback/Section';
import Notification from './components/Feedback/Notification';


const App = () => {

    const [state, setState] = useState({
        good: 0,
        neutral: 0,
        bad: 0,
    });

    const { good, neutral, bad } = state;

    const handleClick = evt => {
        const key = evt.currentTarget.name;
        return setState({
            ...state,
            ...{ [key]: state[key] + 1 }
        });
    };
    const countTotalFeedback = () => good + neutral + bad;
    const options = Object.keys(state);

    const countPositiveFeedbackPercentage = () =>
        Math.round((good / countTotalFeedback()) * 100);
   
    return (
        <>
            <Box p={5}>
                <Section
                    title="Please leave your feedback, it's important for us">
                    <FeedbackOptions options={options} handleClick={handleClick} />
                </Section>

                <Section title="Statistics">
                    {countTotalFeedback()
                        ? <Statistics
                            good={good} neutral={neutral} bad={bad}
                            total={countTotalFeedback()}
                            positivePercentage={countPositiveFeedbackPercentage()} />
                        : <Notification message="There is no feedback" />
                    }
                </Section>
            </Box></>
    );
};

export default App;