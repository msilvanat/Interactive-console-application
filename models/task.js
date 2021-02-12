const { v4: uudiv4 } = require('uuid');

class Task {

    id = '';
    desc = '';
    completeIn = null;

    constructor( desc ) {

        this.id = uudiv4();
        this.desc = desc;
        this.completeIn = null;
    }


}

module.exports = Task;