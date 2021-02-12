require('colors'); // First comes the import of third-party packages, then ours

const { saveDB, readDB } = require('./helpers/saveFile');
const { inquirerMenu,
    stop,
    readInput,
    listTasksDelete,
    confirm,
    showListChecklist
} = require('./helpers/inquirer');

const Tasks = require('./models/tasks');


const main = async () => {
    let opt = '';

    const tasks = new Tasks();

    const tasksDB = readDB();

    if ( tasksDB ) { // Load tasks
        tasks.loadTasksFromArray( tasksDB );
    }

    do {
        //Print the menu
        opt = await inquirerMenu();

        switch (opt) {
            case '1':
                const desc = await readInput('Descripction:');
                tasks.createTask( desc );
                break;

            case '2':
                tasks.completeList();
                break;

            case '3':
                tasks.listPendingCompletes(true);
                break;

            case '4':
                tasks.listPendingCompletes(false);
                break;

                case '5':
                    const ids = await showListChecklist( tasks.listArr );
                    tasks.toggleComplete( ids );
                break;

                case '6': // Delete
                const id = await listTasksDelete( tasks.listArr );
                if ( id !== '0' ) {
                    const ok = await confirm('¿Are you sure?');
                    if ( ok ) {
                        tasks.deleteTask( id );
                        console.log('The task was delete');
                    }
                }
            break;
        }

        saveDB(tasks.listArr);

        await stop();


    } while (opt !== '0');

   
}

main();