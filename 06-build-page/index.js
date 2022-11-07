const fs = require('fs');
const path = require('path')
const styleDir = __dirname + "/styles/";
const htmlDir = __dirname + "/components/"
const dist_dir = __dirname + `/project-dist`;
const dist_html_dir = __dirname + `/project-dist/index.html`;
const dist_style_dir = __dirname + `/project-dist/style.css`;
const origin_html_Dir = __dirname + "/template.html"
const assets_dir = __dirname + "/assets"

let template = [];
let article;
let footer;
let header;

fs.writeFile(dist_html_dir, "", (err) => {
    if (err) throw err;
});


fs.readFile(htmlDir + "articles.html", "utf-8", (err, data) => {
    article = data;

});
fs.readFile(htmlDir + "footer.html", "utf-8", (err, data) => {
    footer = data;
});
fs.readFile(htmlDir + "header.html", "utf-8", (err, data) => {
    header = data;
});


fs.readFile(origin_html_Dir, "utf-8", (err, data) => {
    template = data.split('\n');
    for (let i = 0; i < template.length; i++) {
       // console.log(template[i].replace(/\s/g, ""));
        if (template[i].trim() === '{{header}}') {
            template[i] = header;
        }
        if (template[i].trim() ===  '{{articles}}') {
            template[i] = article;
        }
        if (template[i].trim() ===  '{{footer}}') {
            template[i] = footer;
        }
    }
    fs.appendFile(dist_html_dir,template.toString(), (err) => {
        if (err) {
            console.error(err)
        }
    })
});

try {
    fs.rmdirSync(dist_dir, {recursive: true})

} catch (err) {
    console.error(`Error while deleting ${dist_dir}.`)
}

fs.mkdir(dist_dir, {recursive: true}, (err) => {
    if (err) {
        console.error(err)
    }
})
fs.mkdir(dist_dir + "/assets", {recursive: true}, (err) => {
    if (err) {
        console.error(err)
    }
})

fs.readdir(assets_dir, (err, files) => {
    for (let i = 0; i < files.length; i++) {
        if (path.extname(assets_dir + "/" + files[i]) === '') {
            fs.mkdir(dist_dir + "/assets/" + files[i], {recursive: true}, (err) => {
                if (err) {
                    console.error(err)
                }
            })
            fs.readdir(assets_dir + "/" + files[i], (err, files2) => {
                for (let j = 0; j < files2.length; j++) {
                    fs.copyFile(assets_dir + "/" + files[i] + "/" + files2[j], dist_dir + "/assets/" + files[i] + "/" + files2[j], (err) => {
                        if (err) {
                            console.error(err)
                        }
                    })
                }
            })
        } else {
            fs.copyFile(assets_dir + "/" + files[i], dist_dir + "/assets", (err) => {
                if (err) {
                    console.error(err)
                }
            })
        }
    }
})

fs.writeFile(dist_style_dir, "", (err) => {
    if (err) throw err;
});

fs.readdir(styleDir, (err, files) => {

    for (let i = 0; i < files.length; i++) {
        let text = '';

        if (path.extname(styleDir + files[i]).toString() === '.css') {

            fs.readFile(styleDir + files[i], (err, data) => {
                if (err) {
                    console.error(err)
                    return
                }
                text = data.toString();
                fs.appendFile(dist_style_dir, text, (err) => {
                    if (err) {
                        console.error(err)
                    }
                })
            })
        }
    }
})

