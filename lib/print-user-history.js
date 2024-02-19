const colors = require('colors')
const chalk = require('chalk')

async function printUserHistory(userId) {
    const posts = await userService.getUserPosts(userId);
    // console.log('posts', posts);
    console.log(chalk.yellow(`User Post History (ID: ${userId}):`));
   
    posts.forEach((post, index) => {
        console.log(chalk.green(`Post ${index + 1}:`), chalk.gray(post.quote));
        
    });
}


module.exports = {
    printUserHistory: printUserHistory
  };

