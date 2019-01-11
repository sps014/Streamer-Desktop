const path=require('path');

class AudioPage 
{
    constructor(req, res) 
    {
        var folder = global.FolderURL.toString();
        res.writeHeader(200,{"content-type":"text/html"});
        res.write('<title>'+path.basename(decodeURI(req.url),".mp3")+'</title>');
        res.write('<meta name="viewport" content="width=device-width,initial-scale=1.0"><body   background="'+req.url+'thumb" style="background-fit:cover;background-repeat: no-repeat;background-position: center;background-size: auto;background-color:black;">');
        res.write("<center><audio width='87% height='87%' controls styles='margin:20%' autoplay>");
        var link=req.url+"strm";
        res.write("<source src='"+link+"' type='audio/mp3'></audio>");
        //res.write("<img src='"+req.url+"thumb"+"'/>")
        res.write("</center>");
        res.end();
    }
}

module.exports = AudioPage;