require('colors');

const { inquirer_menu, 
        pause, 
        read_input, 
        taskListToDelete,
        confirm,
        showChecklist} = require('./helpers/inquirer');
const { saveDB,
        readDB } = require('./helpers/saveFile');
const Tasks = require('./models/tasks');


const main = async() => {

    let option = '';
    const tasks = new Tasks();

    const tasksDB = readDB();

    if( tasksDB ){
        tasks.loadTasksFromArray(tasksDB);
    }

    do {
        option = await inquirer_menu();

        switch (option) {
            case '1':
                const description = await read_input( 'Description:' );
                tasks.createTask( description );
                break;

            case '2':
                tasks.completedList();
            break;

            case '3':
                tasks.listPendingCompleted();
            break;

            case '4':
                tasks.listPendingCompleted(false);
            break;

            case '5':
                const ids = await showChecklist(tasks.array_list);
                tasks.completeTasks( ids );
            break;

            case '6':
                const id = await taskListToDelete( tasks.array_list );
                if( id !== '0' ){
                    const ok = await confirm('Are you sure to delete this task?')
                    if( ok ){
                        tasks.deleteTask(id);
                        console.log('\n Tarea borrada'.blue);
                    }
                }
            break;

            default:
            break;
        }

        saveDB( tasks.array_list );

        await pause();

    } while( option !== '0' );
} 

main();