interface ChoicesProps {
    choices: string[];
}

const Choices = ({ choices }: ChoicesProps) => {
    return (
        <div className="choices-display">
            {choices.length > 0 ? (
                <ul>
                    {choices.map((choice, index) => (
                        <li key={index}>{choice} <br /></li>
                    ))}
                </ul>
            ) : (
                <p>No summary results to display.</p>
            )}
        </div>
    );
};

export default Choices;