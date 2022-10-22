import "../App.css";

function Result(props) {
    const styles = {
        color: props.tenzies ? "#ff009d" : "#4a4e74",
    };
    return (
        <div className="result">
            <p>
                Number of rolls: <span style={styles}>{props.numRoll}</span>
            </p>
            <p>
                Time: <span style={styles}>{props.time}</span>s.
            </p>
            {props.tenzies && (
                <button
                    className="save--btn"
                    onClick={() => props.saveResult(event)}>
                    Save result
                </button>
            )}
        </div>
    );
}

export default Result;
