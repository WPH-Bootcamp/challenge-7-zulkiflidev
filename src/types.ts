// TODO: Definisikan tipe data untuk To-Do item di sini
// Hint: To-Do sebaiknya memiliki id, text, dan status completed

// TODO: Buat interface untuk To-Do item
interface ITodo {
  id: number;
  title: string;
  description?: string;

}

// TODO: Buat tipe untuk status To-Do (active/done)
export type TTodo = ITodo & {
  status: "active" | "done"
}


// TODO: Buat tipe untuk fungsi-fungsi yang akan digunakan

export type AddFunction = (todo: ITodo) => void;
export type MarkFunction = (id: number) => void;
export type DeleteFunction = (id: number) => void;
export type ListFunction = () => void;
export type SearchFunction = (keyword: string) => void;




