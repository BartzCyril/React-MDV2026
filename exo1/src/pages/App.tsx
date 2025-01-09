import useCounter from "../hooks/useCounter.tsx";
import Button from "../components/Button.tsx";

function App() {
    const {count, increment, decrement} = useCounter({initial: 0, step: 5});
    return (
        <>
            <h1>Compteur : {count}</h1>
            <div style={{display: "flex", gap: "1rem"}}>
                <Button text="Increment" onClick={increment}/>
                <Button text="Decrement" onClick={decrement}/>
            </div>
        </>
    )
}

export default App
