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
  status: "ACTIVE" | "DONE"
}


// TODO: Buat tipe untuk fungsi-fungsi yang akan digunakan

export type TAddFunction = (data: Pick<ITodo, 'title' | 'description'>) => boolean;
export type TMarkFunction = (data: Pick<ITodo, 'id'>) => void;
export type TDeleteFunction = (data: Pick<ITodo, 'id'>) => void;
export type TListFunction = () => void;
export type TSearchFunction = (keyword: string) => void;




