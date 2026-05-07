// TODO: Implementasikan type guards di sini
// Hint: Type guard berguna untuk memastikan tipe data saat runtime

// TODO: Buat fungsi untuk memvalidasi apakah suatu objek adalah To-Do yang valid

export function isValidTodo(todo: unknown): boolean {
  
  // Pastikan todo adalah objek dan bukan null
  if (typeof todo !== 'object' || todo === null) {
    
    return false;
  
  }

  //sementara ke bentuk Record untuk mengakses propertinya dengan aman
  const t = todo as Record<string, unknown>;
  return(
    typeof t.id === 'number' &&

    typeof t.title === 'string' &&
    
    (typeof t.description === 'string' || t.description === undefined) &&
    
    (t.status === 'active' || t.status === 'done')
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
