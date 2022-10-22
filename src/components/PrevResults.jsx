import "../App.css";

function PrevResults(props) {
    function displaySavedResults() {
        const results = props.savedResults;
        return results.map((result) => {
            const dateFormat = new Date(result.date);
            const day = dateFormat.getDate();
            const month = dateFormat.getMonth() + 1;
            const year = dateFormat.getFullYear();
            return (
                <li key={result.date}>
                    Date: {day}/{month}/{year} | Rolls: {result.numRoll} | Time:{" "}
                    {result.time}s.
                </li>
            );
        });
    }

    localStorage.setItem("TenziesResults", JSON.stringify(props.savedResults));

    return (
        <div className="prev-results">
            <h2>Previous results</h2>
            <ul>{props.savedResults && displaySavedResults()}</ul>
            <a href="#" className="clear" onClick={props.clearResults}>
                Clear results
            </a>
        </div>
    );
}

export default PrevResults;
