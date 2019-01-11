const http=require('http');
const path=require('path');
const StreamVideo=require('./streamVideo');
const ServeFile=require('./serveFile');
const HomePage=require('./Pages/homePage');
const VideoPage=require('./Pages/videoPage');
const AudioPage=require('./Pages/audioPage');
const StreamAudio=require('./streamAudio');
const colors=require('./color');
class HttpServer
{

    constructor()
    {
        this.server=undefined;
    }
 
    _RequestProcessing(req,res)
    {
        var url=req.url.toString();
        //console.log(colors.fg.Yellow,req.connection.remoteAddress,colors.fg.Magenta,"       requesting for    "+url,colors.Reset);
        global.IpPrinter.Print(req.connection.remoteAddress);

        if(url=='/')
        {
          const homePage=new HomePage(req,res);

        }
        else if(path.extname(url).toLowerCase()==".mp3strm")
        {
            const streamAudio=new StreamAudio(req,res);
        }
        else if(path.extname(url).toLowerCase()==".mp3thumb")
        {
            const serve=new ServeFile("mp3thumb",url,res,false,false);
        }
        else if(path.extname(url).toLowerCase()==".mp3")
        {
            const audioPage=new AudioPage(req,res);
        }
        else if(path.extname(url).toLowerCase()==".mp4strm")
        {
            const streamVideo=new StreamVideo(req,res);            
        }
        else if(path.extname(url).toLowerCase()==".mp4")
        {
           const videoPage=new VideoPage(req,res);
        }
        else if(path.extname(url).toLowerCase()==".css")
        {
            var serveFile=new ServeFile('css',url,res);
        }
        else if(path.extname(url).toLowerCase()==".js")
        {
            var serveFile=new ServeFile('js',url,res);
        }
        else if(path.extname(url).toLowerCase()==".jpg")
        {
            var serveFile=new ServeFile('jpg',url,res);
        }
        else 
        {
            console.log("Cant serve "+url);
            res.end();
        }

    }

    StopServer()
    {
        try
        {
	    if(this.server!=undefined)
               this.server.close();
        }
        catch(err)
        {
            console.log(err);
        }
    }
    StartServer(portNumber=5555)
    {
        try
        {
            this.server=http.createServer(this._RequestProcessing);
            this.server.listen(portNumber);
        }
        catch(err)
        {
            console.log(err);
        }
    }

}



module.exports=HttpServer;