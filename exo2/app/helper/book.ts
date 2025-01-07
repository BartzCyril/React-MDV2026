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
                const cover = await book.getBookCover(data[i].isbn);
                data[i] = {...data[i], cover: URL.createObjectURL(cover)};
            }
            if (id) {
                return data[0] as Book;
            }
            return data as Book[];
        } catch (error: any) {
            throw new Error("Error fetching book : " + error.message);
        }
    }
}

export default book;