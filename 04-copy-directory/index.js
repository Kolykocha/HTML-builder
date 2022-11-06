
const fs = require('fs');

const srcDir = `04-copy-directory/files/`;
const dir = `04-copy-directory/files-copy/`;

try {
    fs.rmdirSync(dir, { recursive: true })

} catch (err) {
    console.error(`Error while deleting ${dir}.`)
}

fs.mkdir( dir, { recursive: true }, (err) => {

    if (err) {
        console.error(err)
        return
    }
    fs.readdir(srcDir, (err, files) => {
        for(let i =0;i<files.length;i++) {
            fs.copyFile(srcDir+files[i],dir+files[i],(err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    })
})


