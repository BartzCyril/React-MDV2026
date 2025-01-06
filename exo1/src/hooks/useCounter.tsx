import {useState} from "react";

type props = {
    initial: number,
    number: number
}

const useCounter = ({initial, number}: props) => {
    const [count, setCount] = useState(initial);

    const increment = () => setCount(count + number);
    const decrement = () => setCount(count - number);

    return { count, increment, decrement };
}

export default useCounter;