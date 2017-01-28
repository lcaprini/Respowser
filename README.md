#Respowser

Respowser is an [Electron](http://electron.atom.io/) app written with [Angular Material](https://material.angularjs.org/latest/)
for single page application testing, using different smartphones and tablets real frames.

![alt text](resources/screen1.png "Respowser")

## Using

### Define new app

Start it and use the Open ![Alt text](https://cdn.rawgit.com/lcaprini/Respowser/master/client/icons/folder_open.svg "Open icon") button to load an existing single page application by selecting its main `index.html` file.
Configure your app's name and all device's info:

- **Device**: smartphone and/or tablet
- **Orientation**: portrait and/or landscape
- **Operating** system: Android and/or iOS

![alt text](resources/screen2.png "New app")

Now start using your application in Respowser exactly as you would on the mobile phones or tablet.

To change the device settings you can use the Settings ![Alt text](https://cdn.rawgit.com/lcaprini/Respowser/master/client/icons/settings.svg "Settings icon") button on the right side of toolbar.

### Change and use devices

Respowser allows to use different devices to test your app, so you can view it inside the real device
frame in an immersive and charming mode.
The current version of Respowser includes the following smartphones and tablets:

- iPhone 6s
- iPhone 6s Plus
- iPhone 5s
- Nexus 5X
- iPad Air 2
- iPad Mini 4
- Nexus 9
- Galaxy Tab S2 9.7"

You can also rotate all device in portrait or landscape mode using the Rotate ![Alt text](https://cdn.rawgit.com/lcaprini/Respowser/master/client/icons/screen_rotation.svg "Rotate icon") button; this button is available only if your app allow multiple orientations.

### Develper Tools

Because Respowser was born to test single page application, it includes one of the best tool available for developers: a complete version of Chrome Developer Tools, available through the Developer Tools ![Alt text](https://cdn.rawgit.com/lcaprini/Respowser/master/client/icons/developer_mode.svg "Developer Tools icon")
icon.

You have access to all original Chrome Developer Tools features, like:

- Inspect, add and remove HTML elements and change CSS style
- Read every console log and errors with colored sintax
- Watch source and use realtime debug experience, with breakpoints and so on
- View all network request infos, like url, headers, response, during time and even more
- Using Timeline and Profile to check app performance
- Direct access to Service Workers and Storage systems

If you dont want the user can open Chrome Developer Tools you just edit `core/config.js` configuration file and set
`canOpenDevTools` to `false`.

## Embedded app

You can also use Respowser with a single page application embedded into the build.
To do that you can only follow these simple steps:

- Copy all single page application's source inside `client/www` directory
- Open `core/config.js` configuration file and set `canOpenOtherApps` to `false`
- Config you single page application using `core/app.js`:
  - _name_: the app name
  - _url_: the url of main `index.html` page
  - _lastDevice.model_: device model name (from `client/devices/devices.list.json`)
  - _lastDevice.orientation_: device default orientation [`ORIENTATIONS.PORTRAIT`, `ORIENTATIONS.LANDSCAPE`]
  - _compatibility.orientations_: all allowed orientations [`ORIENTATIONS.PORTRAIT`, `ORIENTATIONS.LANDSCAPE`]
  - _compatibility.types_: all allowed orientations [`DEVICES.TYPES.SMARTPHONE`, `DEVICES.TYPES.TABLET`]
  - _compatibility.oss_: all allowed orientations [`DEVICES.OSS.IOS`, `DEVICES.OSS.ANDROID`]
    
## Develop and Build

Before you can develop and/or build Respowser, you must install and configure the following dependencies on your machine:

- **[Git](https://git-scm.com/)**: it gets all Respowser dependencies
- **[Node.js v6.x (LTS)](https://nodejs.org/en/)**: depending on your system, you can install Node either from source or as a pre-packaged bundle.
- **[Gulp](http://gulpjs.com/)**: to generate svg icons, compile Sass files, start electron and watcher to edits

### Install npm dependencies

To install all dependencies and development dependencies use the following code:
``` 
npm install
```

### Start development

To start development use the following code to start watchers, compilers and open Respowser in dev-mode:
```
gulp serve
```

### Build

To build a Respowser app use the `npm` scripts available in `package.json` or create a new one using [electron-packager](https://github.com/electron-userland/electron-packager) syntax.
