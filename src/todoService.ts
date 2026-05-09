// TODO: Import tipe-tipe yang sudah didefinisikan di types.ts

import { TTodo, TAddFunction, 
         TMarkFunction, TDeleteFunction, 
         TListFunction, TSearchFunction } from "./types";

// TODO: Import fungsi storage untuk baca/tulis file
import { init, readTodos, saveTodos } from "./storage";

//fungsi validator dari utils
import { isValidTodo } from './utils';


//fungsi terpusat pembaca data sekaligus memvalidasinya...
const loadTodos = (): TTodo[] => {
    
    const data = readTodos();
    const validData = data.filter(isValidTodo);
     
    if (validData.length < data.length) {
        console.warn(`Peringatan: Ada ${data.length - validData.length} data rusak yang tidak dimuat.`);
    }
    return validData;
};


// TODO: Buat fungsi untuk menambahkan To-Do baru
// - Generate id yang unik (bisa pakai timestamp atau counter)
// - Pastikan text tidak kosong
// - Set default status sebagai active

export const addTodo: TAddFunction = (data) => {
    const { title, description } = data; //menerrima paramter title & desciprion buat nantinya jadi todo baru
    
    init(); //init dulu, sebelum simpan data, mencegah error

    const todoList = loadTodos(); //baca dulu dari file list yang suda ada

    //buat todo baru, dengan nilai id dari timestamp
    const newTodo: TTodo = {
        id: Date.now(),
        title: title,
        description: description?.trim() === "" ? undefined : description, //deskripsi boleh ada, boleh tidak...
        status: 'ACTIVE'
    }

    

    todoList.push(newTodo); //masukkan objek todo baru ke list-todo
    const result = saveTodos(todoList); //simpan lagi hasilnya ke file
    
    if (result){
        console.log ("Berhasil menambahkan todo baru!");
        return true;
    }
    else{
        console.log ("Error: Gagal menambahkan todo baru!");
        return false;
    }
    
}

// TODO: Buat fungsi untuk menandai To-Do sebagai selesai
// - Cari To-Do berdasarkan id
// - Ubah statusnya menjadi completed
// - Handle kasus jika id tidak ditemukan

export const markTodo: TMarkFunction = (data) => {
    const { id } = data;
    
    init();

    const todoList = loadTodos();
    const todo = todoList.find( t => t.id === id ) //cari todo berdasarkan id

        
    //cek dulu, supaya gak undefined
    if (todo){
        todo.status = 'DONE';
        saveTodos(todoList);
        console.log (`Berhasil mengubah status todo dengan id ${id} menjadi DONE!`);
    }        
    else {
        console.log(`Todo dengan id ${id} tidak berhasil ditemukan`)
    }
            
}



// TODO: Buat fungsi untuk menghapus To-Do
// - Filter To-Do berdasarkan id
// - Handle kasus jika id tidak ditemukan

export const todoDelete:TDeleteFunction = (data) => {
    const { id } = data;

    init();

    const todoList = loadTodos();
    const todo = todoList.find( t => t.id === id )
    
    if (todo){
              
        const newTodoList = todoList.filter( t => t.id !== id); //buat array baru yang isinya gak termasuk id yang dituju
        saveTodos(newTodoList); //simpan array baru ini sebagai gantinya array lama 
        console.log (`Berhasil menghapus todo dengan id ${id}!`);
        
    }        
    else {
        console.log(`Todo dengan id ${id} tidak berhasil ditemukan`)
    }
}



// TODO: Buat fungsi untuk menampilkan semua To-Do
// - Tampilkan dengan format yang rapi
// - Tambahkan status [ACTIVE] atau [DONE] di depan setiap To-Do
// - Berikan nomor urut untuk memudahkan user memilih

export const todoList:TListFunction = () => {

    init();
    
    const todoList = loadTodos();
    console.log("\nDaftar Todo:");
    todoList.forEach( (todo, index) => {
        
        const no = index + 1; //nomor urut dimulai dari angka 1 ya
        //console.log(`[${todo.status}] ${no}. ${todo.title} - ${todo.description} `);

        console.log(`[${todo.status}] ${no}. ${todo.title} ${todo.description ? ` - ${todo.description} `: ""}`);

    });
    console.log();
}

// TODO: Buat fungsi untuk mencari To-Do berdasarkan keyword

export const todoSearch: TSearchFunction = (keyword) =>
{   
    init();

    const lowerKeyword = keyword.toLowerCase();
    const todoList = loadTodos();

    const results = todoList.filter( t => {
        
        //jika keyword ada di title atau description, maka akan masuk ke hasil pencarian
        const keywordInTitle = t.title.toLowerCase().includes(lowerKeyword);
        const keywordInDesc = t.description?.toLowerCase().includes(lowerKeyword);

        return keywordInTitle || keywordInDesc;

    });

    if (results.length === 0) console.log("Tidak ada hasil!");
    else {
        
        console.log(`\n Hasil pencarian untuk:"${keyword}"`);
        
        results.forEach((todo, index) => {
            console.log(`${index + 1}. [${todo.status}] ${todo.title}`);
        
        });
    }    
}


/// Fungsi pembaca all TODO
export const getAllTodos = (): TTodo[] => {
    
    init(); // Pastikan storage siap

    return loadTodos();

};
