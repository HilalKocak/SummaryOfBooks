const chalk = require('chalk')

 function printUserHistory(user) {
    // const posts =  userService.getUserPosts(user.id);
    // console.log('posts', posts);
    // console.log(chalk.yellow(`User Post History (ID: ${user.id}):`));
   
    // posts.forEach((post, index) => {
    //     console.log(`User name ${chalk.red(user.name)} phone ${chalk.green(user.phone)}`);
        
    // });

    return console.log(`User name ${chalk.red(user.name)} phone ${chalk.green(user.phone)}`);
}


module.exports = {
    printUserHistory: printUserHistory
  };

