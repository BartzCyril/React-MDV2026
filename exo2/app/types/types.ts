export type Book = {
    url: string,
    name: string,
    isbn: string,
    cover?: string,
    authors: string[],
    numberOfPages: number,
    publisher: string,
    country: string,
    mediaType: string,
    released: string,
    characters: string[],
    povCharacters: string[]
}