// TODO: Implementasikan type guards di sini
// Hint: Type guard berguna untuk memastikan tipe data saat runtime

// TODO: Buat fungsi untuk memvalidasi apakah suatu objek adalah To-Do yang valid

function isValidTodo(todo: unknown): boolean {
  // Pastikan todo adalah objek dan bukan null
  if (typeof todo !== 'object' || todo === null) {
    return false;
  }

  //sementara ke bentuk Record untuk mengakses propertinya dengan aman

  const t = todo as Record<string, unknown>;
  return (
    typeof todo === 'object' &&
    typeof todo.id === 'number' &&
    typeof todo.title === 'string' &&
    typeof todo.completed === 'boolean'
  );
}

// TODO: Buat fungsi helper untuk menampilkan tanggal/waktu dengan format yang bagus

// TODO: Buat fungsi untuk memastikan input dari user adalah string yang valid
