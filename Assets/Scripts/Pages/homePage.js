const fs = require('fs');
const path=require('path');

class HomePage 
{
    constructor(req, res) 
    {
        var folder = global.FolderURL.toString();
        res.writeHeader(200,{"content-type":"text/html"});
        res.write('  <meta name="viewport" content="width=device-width,initial-scale=1.0">');
        res.write('<title>Streamer</title>');
        res.write('<link rel="stylesheet" href="Assets/Styles/material.min.css"><script src="Assets/Scripts/material.min.js"></script>');
        res.write('<link rel="stylesheet" href="Assets/Styles/main.css"><body background="Assets/Images/centreG.jpg" style="background-fit:cover;"><br>');
        //res.write("<center><h1 style='color:red;'>Developer Shivendra Pratap Singh</h1></center>");
        FileCategerizer(folder,res);
        res.end();
    }

}

function FileCategerizer(folder,res)
{
    var mp3Col=[];
    var mp4Col=[];
    var jpgCol=[];

    fs.readdirSync(folder).forEach(file => 
        {
            if(path.extname(file).toLowerCase()==".mp4")
            {
                mp4Col.push(file);
            }
            else if(path.extname(file).toLowerCase()==".mp3")
            {
                mp3Col.push(file);
            }
            if(path.extname(file).toLowerCase()==".jpg")
            {
                jpgCol.push(file);
            }
        });
        for(var i=0;i<mp4Col.length;i++)
        {
            res.write('<div>');
            var link=mp4Col[i];
            res.write("<a href='"+encodeURI(link)+"' id='video@"+i+"'>");
            res.write(path.basename(mp4Col[i],".mp4"));
            res.write('</a></div>');
            res.write('');
        }
        for(var i=0;i<mp3Col.length;i++)
        {
            res.write('<div>');
            var link=mp3Col[i];
            res.write("<a href='"+encodeURI(link)+"' id='music@"+i+"'>");
            res.write(path.basename(mp3Col[i],".mp3"));
            res.write('</a></div>');
            res.write('');
        }
}

module.exports = HomePage;