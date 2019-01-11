const path=require('path');

class VideoPage 
{
    constructor(req, res) 
    {
        var folder = global.FolderURL.toString();
        res.writeHeader(200,{"content-type":"text/html"});
        res.write('<title>'+path.basename(decodeURI(req.url),".mp3")+'</title>');
        res.write('<meta name="viewport" content="width=device-width,initial-scale=1.0"><body bgcolor="black" >');
        res.write("<center><video width='87% height='87%' controls styles='margin:20%' autoplay>");
        var link=req.url+"strm";
        res.write("<source src='"+link+"' type='video/mp4'></video></center>");
        res.end();
    }
}

module.exports = VideoPage;