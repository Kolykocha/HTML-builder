const fs = require('fs')
const path = require("path");
const dir = __dirname + "/"
const {stdout} = process;
fs.readdir(dir, (err, files) => {
    if (err) {
        console.error(err)
        return
    }

    for (let i = 0; i < files.length; i++) {

        const notes = dir + files[i];
        fs.stat(notes,
            (err, stats) => {
                if (stats.isDirectory() === false) {

                    stdout.write(path.basename(notes, path.extname(notes)) + " - " + path.extname(notes) + " - " +
                        stats.size / 8 / 16 + "kb" + "\n")


                } else {

                    const dir2 = notes + "/"
                    fs.readdir(dir2, (err, files) => {

                        if (err) {
                            console.error(err)
                            return
                        }

                        for (let i = 0; i < files.length; i++) {
                            const notes = dir2 + files[i];
                            fs.stat(notes,
                                (err, stats) => {
                                    if (stats.isDirectory() === false) {
                                        stdout.write(path.basename(notes, path.extname(notes)) + " - " + path.extname(notes) + " - " +
                                            stats.size / 8 / 16 + "kb" + "\n")
                                    } else {
                                        for (let i = 0; i < files.length; i++) {
                                            const notes = dir2 + files[i];
                                            fs.stat(notes,
                                                (err, stats) => {
                                                    if (stats.isDirectory() === false) {
                                                        stdout.write(path.basename(notes, path.extname(notes)) + " - " + path.extname(notes) + " - " +
                                                            stats.size / 8 / 16 + "kb" + "\n")
                                                    } else {

                                                    }
                                                })
                                        }
                                    }
                                })
                        }
                    })
                }
            })
    }
})

