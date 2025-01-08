import type {Book} from "~/types/types";

const book = {
    getBookCover: async (isbn: string) => {
        try {
            if (!isbn) {
                throw new Error("ISBN is required");
            }
            const response = await fetch(`https://covers.openlibrary.org/b/isbn/${isbn}.jpg`);
            return await response.blob();
        } catch (error: any) {
            throw new Error("Error fetching book cover : " + error.message);
        }
    },

    getBooks: async (id?: string) => {
        try {
            const response = await fetch(`https://anapioficeandfire.com/api/books${id ? "/" + id : ""}`);
            let data = await response.json();

            if (!Array.isArray(data)) {
                data = [data];
            }
            for (let i = 0; i < data.length; i++) {
                const blob = await book.getBookCover(data[i].isbn);
                const reader = new FileReader();

                await new Promise((resolve) => {
                    reader.onloadend = () => {
                        data[i] = { ...data[i], cover: reader.result };
                        resolve(null);
                    };
                    reader.readAsDataURL(blob);
                });
            }
            if (id) {
                return data[0] as Book;
            }
            localStorage.setItem("books", JSON.stringify(data));
            return data as Book[];
        } catch (error: any) {
            throw new Error("Error fetching book : " + error.message);
        }
    }
}

export default book;