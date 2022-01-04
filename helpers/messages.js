require('colors');

const show_menu = () => {

    return new Promise( resolve => {

        console.clear();
        console.log('=========================='.blue);
        console.log('   Select an option  '.blue);
        console.log('==========================\n'.blue);
    
        console.log(`${ '1.-'.green } Create task`);
        console.log(`${ '2.-'.green } List task`);
        console.log(`${ '3.-'.green } List completed tasks`);
        console.log(`${ '4.-'.green } List pending tasks`);
        console.log(`${ '5.-'.green } Complete task`);
        console.log(`${ '6.-'.green } Delete task`);
        console.log(`${ '0.-'.green } Exit\n`);
    
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question('Select an option: ', ( opt ) => {
            readline.close();

            resolve(opt);
        });
    });

}

const pause = () => {

    return new Promise ( resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        });
    
        readline.question(`\nPress ${'ENTER'.green}:  to continue\n`, ( opt ) => {
            readline.close();
            resolve();
        });

    });
}

module.exports = {
    show_menu,
    pause
}