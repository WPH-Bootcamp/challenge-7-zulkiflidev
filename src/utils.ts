// TODO: Implementasikan type guards di sini
// Hint: Type guard berguna untuk memastikan tipe data saat runtime

import { TTodo } from "./types";

// TODO: Buat fungsi untuk memvalidasi apakah suatu objek adalah To-Do yang valid
export function isValidTodo(todo: unknown): todo is TTodo  {
  
  // Pastikan todo adalah objek dan bukan null
  if (typeof todo !== 'object' || todo === null) {
    
    return false; 
  }

  //sementara ke bentuk Record untuk mengakses propertinya dengan aman
  const t = todo as Record<string, unknown>;
  return(
    typeof t.id === 'number' &&
    typeof t.title === 'string' && isValidString(t.title) &&
   
    //jika deskripsi diisi, maka validasi itu harus benar string atau tidak diisi sekalian gpp
    ((typeof t.description === 'string' && isValidString(t.description) )|| t.description === undefined) &&
    (t.status === 'ACTIVE' || t.status === 'DONE')
  )
}

// TODO: Buat fungsi helper untuk menampilkan tanggal/waktu dengan format yang bagus
export function formatDate(date: Date): string {
  
  return date.toLocaleString(); // Format tanggal/waktu sesuai dengan locale pengguna

}


// TODO: Buat fungsi untuk memastikan input dari user adalah string yang valid

export function isValidString(input: unknown): input is string {
  
    return typeof input === 'string'; // Type guard untuk memastikan input adalah string

}
