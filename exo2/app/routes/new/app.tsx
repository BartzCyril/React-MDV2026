import { type FormEvent, useState } from "react";
import Input from "~/components/ui/input";
import {default as BookHelper} from "~/helper/book";
import type {Book} from "~/types/types";
import {useNavigate} from "react-router";

const Form = () => {
    const [data, setData] = useState({
        name: "",
        authors: "",
        isbn: "",
    });
    const [errors, setErrors] = useState<{ [key: string]: string[] }>({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const validateField = (fieldName: string, value: string) => {
        const fieldErrors: string[] = [];

        if (fieldName === "name" && value.trim() === "") {
            fieldErrors.push("Name is required");
        }

        if (fieldName === "authors") {
            if (value.trim() === "") {
                fieldErrors.push("Authors is required");
            } else if (!/[^,]+(,[^,]+)*/.test(value)) {
                fieldErrors.push("Authors must be separated by commas");
            }
        }

        if (fieldName === "isbn") {
            if (value.trim() === "") {
                fieldErrors.push("ISBN is required");
            } else if (!/^\d{3}-\d{1}-\d{4}-\d{4}-\d{1}$/.test(value)) {
                fieldErrors.push("ISBN must be in the format XXX-X-XXXX-XXXX-X");
            }
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [fieldName]: fieldErrors,
        }));

        return fieldErrors.length === 0;
    };

    const validateForm = () => {
        const isNameValid = validateField("name", data.name);
        const isAuthorsValid = validateField("authors", data.authors);
        const isIsbnValid = validateField("isbn", data.isbn);

        return isNameValid && isAuthorsValid && isIsbnValid;
    };

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        const books = localStorage.getItem("books");
        if (books) {
            localStorage.setItem("books", JSON.stringify([...JSON.parse(books), data]));
            navigate("/");
        } else {
            setLoading(true);
            BookHelper.getBooks().then((books) => localStorage.setItem("books", JSON.stringify([...books as Book[], data]))).finally(() => {
                setLoading(false);
                navigate("/");
            });
        }
    };

    const handleFieldChange = (fieldName: string, value: string) => {
        setData((prev) => ({
            ...prev,
            [fieldName]: value,
        }));

        validateField(fieldName, value);
    };

    return (
        <form className="p-4" method="post" onSubmit={handleSubmit}>
            <Input
                name="name"
                type="text"
                value={data.name}
                onChange={(newValue) => handleFieldChange("name", newValue)}
                errors={errors.name || []}
            />
            <Input
                name="authors"
                type="text"
                value={data.authors}
                onChange={(newValue) => handleFieldChange("authors", newValue)}
                errors={errors.authors || []}
            />
            <Input
                name="isbn"
                type="text"
                value={data.isbn}
                onChange={(newValue) => handleFieldChange("isbn", newValue)}
                errors={errors.isbn || []}
            />
            <button
                className="inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
                disabled={Object.values(errors).some((fieldErrors) => fieldErrors.length > 0)}
            >
                Submit
            </button>
            {loading && <p className="text-gray-500">Loading...</p>}
        </form>
    );
};

export default Form;
