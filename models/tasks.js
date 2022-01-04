const Task = require('./task');
require ('colors');

class Tasks {
    _list = {};

    get array_list() {
        const list = [];

        Object.keys(this._list).forEach( key => {
            const task = this._list[key];
            list.push( task );
        });
        return list;
    }

    constructor() {
        this._list = {};
    }

    deleteTask( id = '' ){
        if( this._list[id] ){
            delete this._list[id];
        }
    }

    loadTasksFromArray( tasks = [] ){
        tasks.forEach( task => {
            this._list[task.id] = task;
        });
    }


    createTask( description = '' ){
        const task = new Task(description);

        this._list[task.id] = task;
    }

    completedList(){

        console.log();
        this.array_list.forEach( ( task, i ) => {

            const index = `${ i + 1 }.`.green;
            const { description, completedAt } = task;
            const status = ( completedAt ) ? 'Completada'.green : 'Pendiente'.red;

            console.log( `${ index } ${ description } :: ${status}`);
        });
    }

    listPendingCompleted( completed = true ){
        console.log();

        let index = 0;
        this.array_list.forEach( task => {
            
            const { description, completedAt } = task;
            const status = ( completedAt ) ? completedAt.green : 'Pendiente'.red;
            
            if( completed ){
                if( completedAt ){
                    index++;
                    console.log( `${ (index + '.').green } ${ description } :: ${ status }`);
                }

            }else{
                if( !completedAt ){
                    index++;
                    console.log( `${ (index + '.').green } ${ description } :: ${ status }`);
                }
            }
        });
    }

    completeTasks( ids = [] ){
        
        ids.forEach( id => {
            
            const task = this._list[id];

            if( !task.completedAt ){
                task.completedAt = new Date().toISOString();
            }
        });

        this.array_list.forEach( task =>{
            if( !ids.includes(task.id) ){
                task.completedAt = null;
            }
        });
    }
}


module.exports = Tasks;