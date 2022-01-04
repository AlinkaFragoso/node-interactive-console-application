const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'Qué desea hacer?',
        choices: [
            {
                value: '1',
                name: `${ '1.'.green } Create task`
            },
            {
                value: '2',
                name: `${ '2.'.green } List tasks`
            },
            {
                value: '3',
                name: `${ '3.'.green } List completed tasks`
            },
            {
                value: '4',
                name: `${ '4.'.green } List pending tasks`
            },
            {
                value: '5',
                name: `${ '5.'.green } Complete tasks`
            },
            {
                value: '6',
                name: `${ '6.'.green } Delete task`
            },
            {
                value: '0',
                name: `${ '0.'.green } Exit`
            }
        ]
    }
];

const inquirer_menu = async() => {

    console.clear();
    console.log('=========================='.blue);
    console.log('   Select an option  '.white);
    console.log('==========================\n'.blue);

    const { option } = await inquirer.prompt(questions);
 
    return option;
}

const pause = async () => {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${ 'enter'.green } to continue`
        }

    ];

    console.log('\n');
    await inquirer.prompt(question);
    
}

const read_input = async( message ) => {
    
    const question = [
        {
            type: 'input',
            name: 'description',
            message,
            validate( value ){
                if( value.length === 0 ) {
                    return 'Por favor ingrese un valor';
                }
                return true;
            }
        }

    ];

    const { description } = await inquirer.prompt(question);

    return description;
}

const taskListToDelete = async( tasks = [] ) => {

    const choices = tasks.map( ( task, i ) => {

        const idx = `${ i + 1 }.`.green;
        return {
            value: task.id,
            name: `${ idx } ${ task.description }`
        }
    });

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    });

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Delete',
            choices,
        }
    ];
    const { id } = await inquirer.prompt(questions);

    return id;
}

const confirm = async (message) => {

    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }

    ];

    const { ok } = await inquirer.prompt(question);
    return ok;
}

const showChecklist = async( tasks = [] ) => {

    const choices = tasks.map( ( task, i ) => {

        const idx = `${ i + 1 }.`.green;
        return {
            value: task.id,
            name: `${ idx } ${ task.description }`,
            checked: ( task.completedAt ) ? true : false
        }
    });

    const question = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Select',
            choices,
        }
    ];
    const { ids } = await inquirer.prompt(question);

    return ids;
}


module.exports = {
    inquirer_menu,
    pause,
    read_input,
    taskListToDelete,
    confirm,
    showChecklist
}