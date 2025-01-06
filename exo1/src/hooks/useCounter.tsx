import {useState} from "react";

type props = {
    initial: number,
    step: number
}

const useCounter = ({initial, step}: props) => {
    const [count, setCount] = useState(initial);

    const increment = () => setCount(count + step);
    const decrement = () => setCount(count - step);

    return { count, increment, decrement };
}

export default useCounter;