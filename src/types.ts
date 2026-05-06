// TODO: Definisikan tipe data untuk To-Do item di sini
// Hint: To-Do sebaiknya memiliki id, text, dan status completed

// TODO: Buat interface untuk To-Do item
interface ITodo {
  id: number;
  title: string;
  description?: string;

}

// TODO: Buat tipe untuk status To-Do (active/done)
type TTodo = ITodo & {
  status: "active" | "done"
}


// TODO: Buat tipe untuk fungsi-fungsi yang akan digunakan

type AddFunction = (todo: ITodo) => void;

type MarkFunction = (id: number) => void;

type DeleteFunction = (id: number) => void;

type ListFunction = () => void;
type SearchFunction = (keyword: string) => void;




