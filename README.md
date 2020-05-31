<br>
<div style="display: flex; justify-content: space-between">
    <img src="resources/kob_text.png" alt="kob-icon" width="128" height="36" align="left" hspace="0" vspace="3" style="align-self: center"/>
    <img src="resources/kob.png" alt="kob-icon" width="64" height="64" align="right" hspace="0" vspace="3"/>
</div>
<br>

---
[![Build Status](https://travis-ci.com/cognophile/Kob.svg?branch=master)](https://travis-ci.com/cognophile/Kob) 

Kob is a simplified, visual, database-independant migration tool born from the frustration that many frameworks bake-in a language-specific migration tool, making development time quick but portability between ecosystems more painful.

## Getting started 👩‍💻👨‍💻
To download the application, visit the [Releases](https://github.com/cognophile/Kob/releases) page and download the latest verison of the application suitable for your platform. If you're unsure which you need, check the list below.

* **Windows** 💻: Unzip `Kob-windows-*.zip` and double-click to run the contained `Kob.exe`.
* **macOS** 🍎: Unzip `Kob-macos-*.zip` and double-click to run the contained `Kob.app`. You should then copy this into your `Applications` folder.
* **Linux** 🐧: Unzip `Kob-linux-*.zip` and run the contained `Kob` after creating a desktop launcher. This may vary according to your flavour of Linux, but [this](https://askubuntu.com/a/330783/778594) may help.

## Reporting
If you encounter any issues with the application, please submit an [issue](https://github.com/cognophile/Kob/issues) with as much information as possible about your platform, the application version, what you did, what happend, and any errors displayed.

## Development ⚙️
### Prerequisties 🧱
* [Node.js and NPM](https://nodejs.org/en/)
* Wine

### Building 🏗
Once cloned and the prerequisites have been installed on your system, start by installing the project dependencies. 

```bash
npm install
```

You can then run the application within the Electron application development wrapper

```bash
npm start
```

When you're happy with your changes and wish to build the application for all platforms, use the provided build scripts. 

```bash
npm run build
```

Optionally, you can specify the platform to build individually, to save time.

```bash
npm run build:[windows|linux|macos]
```

## Contributing 🎁
Please read the [contributing guide](CONTRIBUTING.md) for more info. 

## License 💼
Licensed under the GNU General Public License v3.0. For more details, see [LICENSE](LICENSE).

## Acknowledgements 🙌
With thanks to the great teams at: 
- Electron
- Electron packager
- NodeJS
- NPM
- Bootstrap
- jQuery
- Popper.js