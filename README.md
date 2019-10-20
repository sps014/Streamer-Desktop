# Streamer-Desktop
A application build with electron.js that can broadcast local multimedia content to other nearby devices directly with wifi. 
Supported platforms Windows,Mac,Linux.
Future Plans for Android And ios. :)

##  Binaries Download
[Windows](https://github.com/sps014/Streamer-Desktop/releases/download/0.1/streamer-win32-ia32.zip)

## Steps for custom build
1. clone repo.
2. in same dir run

For Mac
   
```
electron-packager . --overwrite --platform=darwin --arch=x64 --icon=assets/icons/mac/icon.icns --prune=true --out=release-builds
```

For Windows
```
electron-packager . electron-tutorial-app --overwrite --asar=true --platform=win32 --arch=ia32 --icon=assets/icons/win/icon.ico --prune=true --out=release-builds --version-string.CompanyName=CE --version-string.FileDescription=CE --version-string.ProductName="Electron Tutorial App"
 ```
For Linux
```
electron-packager . electron-tutorial-app --overwrite --asar=true --platform=linux --arch=x64 --icon=assets/icons/png/1024x1024.png --prune=true --out=release-builds
 ```
### ****** Replace app name icons accordingly for your icons 

## steps for usage

1. Start Application and Configure properties

![strm1](https://user-images.githubusercontent.com/45932883/58746072-a1adb000-8477-11e9-9c91-b8ae00c2627c.PNG)

2. Start the server and let remote devices connect and scan QR code generated or type given url in remote browser

![strmr2](https://user-images.githubusercontent.com/45932883/58746109-0ec14580-8478-11e9-9f94-612ca040a304.PNG)

3. Select audio or video file to play from list in remote browser and enjoy streaming

![strm4](https://user-images.githubusercontent.com/45932883/58746136-534ce100-8478-11e9-982e-826244f7e871.PNG)
