const fs=require('fs');
const Path=require('path');
class StreamAudio
{
    constructor(req,res)
    {
        var folder = global.FolderURL.toString();
        const path=decodeURI(Path.join(folder,req.url)).replace("strm","");

        const stat=fs.statSync(path);
        const fileSize=stat.size;
        const range=req.headers.range;

        if(range)
        {
            const part=range.replace(/bytes=/,"").split("-");
            const start=parseInt(part[0],10);
            var end=part[1]?parseInt(part[1],10):fileSize-1;
            var chunkSize=(end-start)+1;
            const file=fs.createReadStream(path,{start,end});
            if(chunkSize>1024*1024)
            {
                end=start+1024*1024;
                chunkSize=(end-start)+1;
            }
            const head={
                       'content-range':'bytes '+start+'-'+end+'/'+fileSize,
                       'accept-ranges':'bytes',
                       'content-length':chunkSize,
                       'content-type':'audio/mp3',
                       };
            res.writeHead(206,head);
            file.pipe(res);
        }
        else
        {
            const head={ 
                        'content-length':fileSize,
                        'content-type':'video/mp3',                        
                      }
            res.writeHead(200,head);
            fs.createReadStream(path).pipe(res);
        }
    }
}

module.exports=StreamAudio;