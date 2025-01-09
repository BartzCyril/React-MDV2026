import {useContext, useEffect, useState} from "react";
import {default as BookHelper} from "~/helper/book";
import type {Book} from "~/types/types";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "~/components/ui/carousel";
import {Card, CardContent} from "~/components/ui/card";
import {Link} from "react-router";
import ThemeContext from "~/context/Theme";

export default function Index() {
    const [books, setBooks] = useState<Book[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const themeContext = useContext(ThemeContext);

    useEffect(() => {
        const localBooks = localStorage.getItem("books");
        if (localBooks) {
            setBooks(JSON.parse(localBooks) as Book[]);
            setLoading(false);
        } else {
            BookHelper.getBooks().then((data) => setBooks(data as Book[])).catch((error) => setError(error.message)).finally(() => setLoading(false));
        }
    }, []);

    return (
        <main
            className={`flex items-center justify-center min-h-screen ${themeContext.theme === "light" ? "bg-gray-100" : "bg-gray-950"}`}>
            <button className={`${themeContext.theme === "light" ? "bg-gray-100 text-black" : "bg-gray-950 text-white"} p-2 rounded-md`}
                    onClick={() => themeContext.setTheme(prevState => prevState === "light" ? "dark" : "light")}>Switch
                Theme
            </button>
            <div className="text-center">
                <h1 className={`${themeContext.theme === "light" ? "text-black" : "text-white"} text-3xl font-bold mb-4`}>Game
                    of Thrones</h1>
                {loading &&
                    <p className={`${themeContext.theme === "light" ? "text-black" : "text-white"}`}>Loading...</p>}
                {!loading && error && <p className="text-red-500">{error}</p>}
                {!loading && (
                    <Carousel
                        opts={{
                            align: "center",
                        }}
                        className="w-full max-w-2xl mx-auto"
                    >
                        <CarouselContent>
                            {books.map((book, index) => (
                                <CarouselItem
                                    key={index}
                                    className="md:basis-1/2 lg:basis-1/3"
                                >
                                    <div className="p-1">
                                        <Card
                                            className={`${themeContext.theme === "light" ? "bg-gray-950" : "bg-gray-100"}`}>
                                            <CardContent className="flex aspect-square items-center justify-center p-6">
                                                <Link to={"/books/" + (+index + 1)} state={{book}}>
                                                    <img src={book.cover} alt={book.name}/>
                                                </Link>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious/>
                        <CarouselNext/>
                    </Carousel>
                )}
            </div>
        </main>
    );
}