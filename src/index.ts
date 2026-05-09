// TODO: Import readline untuk membaca input dari command line
import readline from 'readline/promises'; //versi terbaru

// TODO: Import fungsi-fungsi dari todoService
import { addTodo, markTodo, todoDelete, todoList, todoSearch, getAllTodos} from './todoService';

// TODO: Import fungsi-fungsi dari utils (termasuk type guards)
import { isValidString } from './utils';


// inisialisasi readline
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



// TODO: Buat fungsi untuk menampilkan menu utama
// Tampilkan opsi seperti:

function showMainMenu():void {
    console.log(`
    ToDo Apps - by Zulkifli
    ========================
    1. Add new todo
    2. Mark todo as complete
    3. Delete todo
    4. List all todos
    5. Search todos
    6. Exit
    `);
};

// TODO: Buat fungsi untuk handle input dari user
// Gunakan readline.question untuk menerima input
async function handleUserInput(input: string): Promise<string> {
        
    if (input === "main")
        return await rl.question("Silahkan pilih menu > "); //tidak perlu callback, ajukan pertanyaan

    else if (input === "title_addTodo")
        return await rl.question("Silahkan masukkan nama task > ");

    else if (input === "desc_addTodo")
        return await rl.question("Silahkan masukkan deskripsi task > ");

    else if (input === "index_todoList")
        return await rl.question("Silahkan masukkan nomor task  > ");

    else if (input === "keyword_todoList")
        return await rl.question("Silahkan masukkan keyword  > ");
   
    else return "";   
}

async function waitForEnter(): Promise<void> {
   await rl.question("\nTekan Enter untuk kembali ke menu utama...");
}

// TODO: Buat fungsi main yang akan menjalankan aplikasi secara loop
// Hint: Gunakan recursive function atau while loop
async function main(): Promise<void> {
    
    let running = true;
    while(running){
        showMainMenu();
        const input = await handleUserInput("main");

        if (input === "1"){

            while (true){
                const title = await handleUserInput("title_addTodo");

                if (!isValidString(input) || title.trim() === "")
                    console.log("Error: Nama Task tidak boleh kosong!");               
                else{
                    const description = await handleUserInput("desc_addTodo");
                    console.log(`Task "${title}" sudah berhasil ditambahkan & disimpan ke daftar ToDo`);

                    const result = addTodo({
                                        title: title,
                                        description: description
                                   });
                    await waitForEnter(); 
                    break;
                }              
            }
        }
        else if (input === "2" || input == "3"){ //mark atau delete ToDo
            
            todoList();

            while (true){
                const choice = await handleUserInput("index_todoList");

                if (choice.trim() === "") console.log("Error: Nomor Task tidak boleh kosong!");
                else{
                    const taskNumber = parseInt(choice);
                    const alltodos = getAllTodos();

                    if (taskNumber > 0  && taskNumber <= alltodos.length){
                        const targetTodo = alltodos[taskNumber-1];                      
                        console.log(`Memproses: ${targetTodo.title}...`);

                        if (input === "2")
                            markTodo({ id: targetTodo.id }); 
                        else
                            todoDelete({ id: targetTodo.id })
                        await waitForEnter();
                        break;
                    }
                    else console.log("Error: Nomor task tidak valid!")
                    //const retult = markTodo();
                }
            }
        }
        else if (input === "4"){
            todoList();
            await waitForEnter();
        }
        else if (input === "5"){
            while (true){
                const keyword = await handleUserInput("keyword_todoList");

                if (keyword.trim() === "") console.log("Error: keyword tidak boleh kosong!");
                else{
                    
                    if (!isValidString(keyword)) console.log("Error: bukan string yang valid!");
                    else { 
                        const result = todoSearch(keyword); 
                        break;
                    }                                        
                }
            }
            await waitForEnter();
        }
        else if (input === "6"){
            console.log("Terimakasih sudah menggunakan aplikasi ini, bye...")
            running = false;
        }
    }
    rl.close();    
}


// TODO: Jalankan fungsi main
console.log('Welcome to TypeScript To-Do App!');
console.log('Start building your app here...');
main();