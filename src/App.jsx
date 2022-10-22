import { useState, useEffect } from "react";
import "./App.css";
import Die from "./components/Die";
import Result from "./components/Result";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
import PrevResults from "./components/prevResults";

function App() {
    const [diceArr, setDiceArr] = useState(allNewDice());
    const [tenzies, setTenzies] = useState(false);
    const [numRoll, setNumRoll] = useState(0);
    const [time, setTime] = useState(0);
    const [firstRoll, setFirstRoll] = useState(true);
    const [intervalId, setIntervalId] = useState(null);
    const [savedResults, setSavedResults] = useState(
        JSON.parse(localStorage.getItem("TenziesResults"))
    );

    useEffect(() => {
        const win = diceArr.every((dice) => {
            const control = diceArr[0].value;
            return dice.isHeld === true && dice.value === control;
        });

        setTenzies(win);
    }, [diceArr]);

    useEffect(() => {
        tenzies && stopTimer();
    }, [tenzies]);

    function makeRandom() {
        return Math.round(Math.random() * 5) + 1;
    }

    function allNewDice() {
        let randomArr = [];
        for (let i = 0; i < 10; i++) {
            const random = makeRandom();
            randomArr.push({ value: random, isHeld: false, id: nanoid() });
        }
        return randomArr;
    }

    const diceMarkup = diceArr.map((dice, i) => (
        <Die
            value={dice.value}
            key={dice.id}
            id={dice.id}
            isHeld={dice.isHeld}
            holdDice={holdDice}
        />
    ));

    function rollDice() {
        if (tenzies) {
            setTenzies(false);
            setDiceArr(allNewDice());
            setFirstRoll(true);
            setNumRoll(-1);
            setTime(0);
        } else {
            setDiceArr((prevArr) => {
                return prevArr.map((dice) => {
                    if (dice.isHeld === true) {
                        return dice;
                    } else {
                        return {
                            value: makeRandom(),
                            isHeld: false,
                            id: nanoid(),
                        };
                    }
                });
            });
        }

        if (firstRoll) {
            setIntervalId(setInterval(() => timer(), 1000));
            setFirstRoll(false);
        }

        setNumRoll((prevRoll) => prevRoll + 1);
    }

    function holdDice(id) {
        setDiceArr((prevArr) => {
            return prevArr.map((item) => {
                if (item.id === id) {
                    return { ...item, isHeld: !item.isHeld };
                } else {
                    return item;
                }
            });
        });
    }

    function timer() {
        setTime((prevTime) => prevTime + 1);
    }

    function stopTimer() {
        setIntervalId(clearInterval(intervalId));
    }

    function saveResult(event) {
        console.log("target", event.target);
        const results = {
            date: Date.now(),
            numRoll: numRoll,
            time: time,
        };

        setSavedResults((prevRes) => {
            if (prevRes === null) {
                return [results];
            } else {
                return [...prevRes, results];
            }
        });

        event.target.textContent = "Result saved";
        event.target.disabled = true;
    }

    function clearResults() {
        setSavedResults(null);
        localStorage.clear();
    }

    return (
        <div className="app">
            <main className="main">
                {tenzies && <Confetti />}
                <h1>Tenzies</h1>
                <p>
                    Roll until all dice are the same. Click each die to freeze
                    it at its current value between rolls.
                </p>
                <div className="die--wrapper">{diceMarkup}</div>
                <button className="roll--btn" onClick={rollDice}>
                    {tenzies ? "New Game" : "Roll"}
                </button>
                <Result
                    numRoll={numRoll}
                    time={time}
                    tenzies={tenzies}
                    saveResult={saveResult}
                />
            </main>
            {savedResults && (
                <PrevResults
                    savedResults={savedResults}
                    clearResults={clearResults}
                />
            )}
        </div>
    );
}

export default App;
