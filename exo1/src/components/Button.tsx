type props = {
    text: string,
    onClick: () => void
}

const Button = ({text, onClick}: props) => {
    return <button onClick={onClick}>{text}</button>
}

export default Button