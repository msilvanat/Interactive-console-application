const Task = require('./task');

class Tasks {

    _list = {
        'abc' : 123 
    };
    
    get listArr() {

        const listado = [];
        Object.keys(this._list).forEach(key => { 
            const task = this._list[key];
            listado.push(task);
        });

        return listado;
    }

    constructor() {
        this._list = {};
    }

    deleteTask( id = '' ) { // Remove object property

        if ( this._list[id] ){
            delete this._list[id];
        }
    }

    loadTasksFromArray( tasks = [] ) {

        tasks.forEach( task => {
            this._list[task.id] = task;

        })

    }

    createTask( desc = '') {
        const task = new Task(desc);

        this._list[task.id] = task; // New property on the list
    }

    completeList() {

        console.log();
        this.listArr.forEach( (task, i) => {

            const idx = `${i + 1}`.green;
            const { desc, completeIn } = task;
            const state = ( completeIn )
                ? 'Complete'.green
                : 'Pending'.red;

            console.log(`${ idx } ${ desc } :: ${ state }`);

        });
    }

    listPendingCompletes( completed = true ) {

        console.log();
        let counter = 0;
        this.listArr.forEach( task => {

            const { desc, completeIn } = task;
            const state = ( completeIn ) 
                                ? 'Complete'.green
                                : 'Pending'.red;
            if ( completed ) {
                // Show completed
                if ( completeIn ) {
                    counter += 1;
                    console.log(`${ (counter + '.').green } ${ desc } :: ${ completeIn.green }`);
                }
            } else {
                // Show pendings
                if ( !completeIn ) {
                    counter += 1;
                    console.log(`${ (counter + '.').green } ${ desc } :: ${ state }`);
                }
            }

        });     

    }

    toggleComplete( ids = [] ) {

        ids.forEach( id => {

            const task = this._list[id];
            if ( !task.completeIn ) {
                task.completeIn = new Date().toISOString()
            }

        });

        this.listArr.forEach( task => {

            if ( !ids.includes(task.id) ) {
                this._list[task.id].completeIn = null;
            }

        });


    }

}

module.exports = Tasks;