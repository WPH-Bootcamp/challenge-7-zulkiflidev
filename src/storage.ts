import * as fs from 'fs';
import * as path from 'path';
import { TTodo } from './types';


// TODO: Definisikan path file untuk menyimpan data To-Do

const filePath = path.join( process.cwd(), 'data', 'todos.json');

// TODO: Buat fungsi untuk membaca To-Do dari file
// Hint: Gunakan try-catch untuk handle error saat membaca file

export function readTodos(): TTodo[] {
    
     try {
      
        const data = fs.readFileSync(filePath, 'utf-8');
        return JSON.parse(data);
    
    } catch (error) {
      
        console.error('Error reading todos:', error);
        return [];
    
    }
}



// TODO: Buat fungsi untuk menyimpan To-Do ke file
// Hint: Jangan lupa konversi ke JSON string sebelum disimpan

export function saveTodos(todos: TTodo[]): void {
    
    
    try {
      
        fs.writeFileSync(filePath, JSON.stringify(todos, null, 2));
    
    } catch (error) {
      
        console.error('Error saving todos:', error);
    
    }
}


// TODO: Buat fungsi untuk inisialisasi storage (buat file kosong jika belum ada)
export function init() {

    const dir = path.dirname(filePath);
    
    if (!fs.existsSync(dir)) {
      
        fs.mkdirSync(dir, { recursive: true }); // Buat direktori jika belum ada
    
    }
        
    if (!fs.existsSync(filePath)) {
      
        fs.writeFileSync(filePath, '[]'); 
    
    }
}

