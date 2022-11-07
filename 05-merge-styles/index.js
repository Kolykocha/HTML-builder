const fs = require('fs');
const path = require('path')
const srcDir = __dirname+"/styles/";
const dir = __dirname+`/project-dist/bundle.css`;


    fs.unlink(dir, (err) => {
        if(err) throw err;
    });



    fs.writeFileSync(dir,"", (err) => {
        if(err) throw err;
    });




fs.readdir(srcDir, (err, files) => {

    for(let i =0;i<files.length;i++) {
        let text = '' ;

                if (path.extname(srcDir + files[i]).toString() === '.css') {

                    fs.readFile(srcDir + files[i], (err, data) => {
                        if (err) {
                            console.error(err)
                            return
                        }
                        text = data.toString();
                        fs.appendFile(dir, text, (err) => {
                            if (err) {
                                console.error(err)
                            }
                        })
                    })
                }
    }
})