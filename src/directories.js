const readline = require("readline");
const Directory = require("./models/Directory");
  
let root = new Directory(null, null);
let cwd = root; // Separation allows for support for changing dir later on

const cli = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function do_command(prompt) {
  cli.question(prompt, (command) => {
    var fields = command.split(' ');
      switch(fields[0]) {
        case 'CREATE':
          cwd.create(fields[1]);
            break;
        case 'LIST':
          cli.write(cwd.list(''));
          break;
        case 'DELETE':
          cwd.delete(fields[1]);
          break;
        case 'MOVE':
          cwd.move(fields[1], fields[2]);
          break;
        default:
          cli.write("Invalid command: " + command);
        }
    do_command(prompt);
  })
}

do_command('');