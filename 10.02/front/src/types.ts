export interface Post {
    id: number;
    tytul: string;
    tresc: string;
}

export interface Comment {
    id: number;
    tresc: string;
    wpisId: number;
}
