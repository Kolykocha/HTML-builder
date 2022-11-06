const {stdin, stdout} = process;
stdin.on('data', () => stdout.write("Enter text\n"));
stdout.write("Enter text\n");
const fs = require('fs');
const output = fs.createWriteStream('02-write-file/text.txt','utf-8');
stdin.on('data', data => {
    const newData = data.toString();
    if(newData === "exit"){
        stdout.write("Bye\n");
        process.exit();
    }else {
        output.write(newData);
    }
});



