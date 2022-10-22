import "../App.css";

function Die(props) {
    const styles = props.isHeld
        ? { background: "#59E391" }
        : { background: "white" };

    return (
        <div
            className="die"
            style={styles}
            onClick={() => {
                props.holdDice(props.id);
            }}>
            {props.value}
        </div>
    );
}

export default Die;
