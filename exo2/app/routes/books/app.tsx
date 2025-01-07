import {Link, useLocation, useParams} from "react-router";
import {useEffect, useState} from "react";
import {default as BookHelper} from "~/helper/book";
import type {Book} from "~/types/types";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "~/components/ui/card";

export default function Books() {
    const location = useLocation();
    const [book, setBook] = useState<Book | null>(location.state?.book || null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const id = useParams().id;

    useEffect(() => {
        if (!book) {
            setLoading(true);
            BookHelper.getBooks(id).then((data) => setBook(data as Book)).catch((error) => setError(error.message)).finally(() => setLoading(false));
        }
    }, [book]);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            {book && <Card>
                <CardHeader>
                    <CardTitle>{book.name}</CardTitle>
                    <CardDescription>{book.authors.join(",")}</CardDescription>
                </CardHeader>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                    <img src={book?.cover} alt={book?.name}/>
                </CardContent>
            </Card>}
            {loading && <p className="text-gray-500">Loading...</p>}
            {!loading && error && <p className="text-red-500">{error}</p>}
            <Link to={"/"}>Back</Link>
        </main>
    );
}