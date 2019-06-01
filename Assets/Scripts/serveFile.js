const fs = require('fs');
const path = require('path');

class ServeFile {
    constructor(type, url, res, useRootPath = true, readFile = true) {
        var folder = global.FolderURL.toString();

        if (useRootPath)
            url = path.join(global.ApplicationFolder, url);

        if (readFile)
            var data = fs.readFileSync(url);

        if (type == 'css') 
        {
            res.writeHeader(200, { "content-type": "text/css" })
        }
        else if (type == 'js')
         {
            res.writeHeader(200, { "content-type": "text/javascript" })
        }
        else if (type == 'png') 
        {
            res.writeHeader(200, { "content-type": "image/png" })
        }
        else if (type == 'jpg') 
        {
            res.writeHeader(200, { "content-type": "image/jpg" })
        }
        else if (type == "mp3thumb")
        {
            const jsmediatags = require('jsmediatags');
            url = decodeURI(url);
            url = url.replace("thumb", "");
            jsmediatags.read(path.join(global.FolderURL, url), {
                onSuccess: function (tag) {
                    res.writeHeader(200, { "content-type": "image/jpg" })
                    res.write(Buffer.from(tag.tags.picture.data, 'base64'));
                    res.end();
                },
                onError: function (error) {
                    console.log(':(', error.type, error.info);
                }
            });
        }
        if (data != undefined)
            res.write(data);
        if (type != "mp3thumb")
            res.end();

    }

}



module.exports = ServeFile;