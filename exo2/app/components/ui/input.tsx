import { type ChangeEvent, useId } from "react";

type InputProps = {
    name: string;
    type: "text" | "password" | "email" | "number";
    value: string;
    onChange: (newValue: string) => void;
    errors: string[];
};

const Input = ({ name, type, value, onChange, errors }: InputProps) => {
    const id = useId();

    return (
        <div className="mb-4">
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
                {name}
            </label>
            <input
                type={type}
                name={name}
                id={id}
                value={value}
                className={`w-full px-3 py-2 border ${
                    errors.length > 0 ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm`}
                onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
            />
            {errors.map((error, index) => (
                <p key={index} className="text-sm text-red-500 mt-1">
                    {error}
                </p>
            ))}
        </div>
    );
};

export default Input;
