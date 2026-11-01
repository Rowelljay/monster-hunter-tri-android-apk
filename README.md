# monster-hunter-tri-android-apk

A compact Android and Windows download page for **MH Tri - Rowell**, with a separate experimental **MH3 - Low Spec** entry, setup instructions and contributor credits. Dark mode is the default, with an optional light theme.

Game tabs also include **MH4 Ultimate · Coming soon**. The selected game has its own downloads, source links, metadata and credits. MH4U has no public APK or game-file download on this page.

## Game links

| Link | Opens |
| --- | --- |
| `/` | Monster Hunter Tri (the default for existing tutorial links) |
| `/mh4u/` | MH4 Ultimate, including without JavaScript |
| `/?game=mh4u` | MH4 Ultimate automatically when JavaScript is available |

Use **Copy link** beside the tabs to share the selected game. Tabs switch immediately, update the address and support browser Back/Forward and keyboard arrow keys. Native links still open the separate game entry pages without JavaScript. Both entries are generated from one template and use the same small CSS/JS files.

Built with static HTML, CSS and JavaScript. No framework, database, environment variables or Docker is required.

## Local preview

With Node.js 20 or newer, run `npm run showcase` and open the printed address. You can also open `showcase/index.html` directly or use `OPEN-SHOWCASE.cmd` on Windows.

Use the preview server to test `/mh4u/`, refreshes and copied links. Opening the HTML directly is only a basic local view.

## Deploy to Vercel

Import [Rowelljay/monster-hunter-tri-android-apk](https://github.com/Rowelljay/monster-hunter-tri-android-apk) into Vercel. The included `vercel.json` configures these settings:

| Setting | Value |
| --- | --- |
| Framework preset | Other |
| Root directory | Repository root (`./`) |
| Build command | `npm run build` |
| Output directory | `dist` |
| Install command | Default |
| Environment variables | None |

Run `npm run build` to check the production build locally. It creates `dist/` and removes the preview notice and preview-only `noindex` directive. Generated builds and local screenshots are ignored by Git.

## Download links and credits

Downloads are available again for the tutorial. The APK button uses the matching `rowell-1.4.13` release in the [app repository](https://github.com/Dling11/monster_hunter_tri_emulator). The separate game-file button opens [Romsfun](https://romsfun.com/download/monster-hunter-3-tri-id1-13483/2), replacing the previous MediaFire destination.

Public targets are in `showcase/site.config.js` with HTML fallbacks in `showcase/index.html`. Standard Android ARM64 and Windows x64 remain on `rowell-1.4.13`. Low Spec is an experimental Android ARMv7 app with separate storage. It requires Android 10+, OpenGL ES 3.0 and 32-bit app support; performance on physical phones is not yet verified.

The Low Spec button stays unavailable while `lowSpec` is `null`. After its matching public source and APK are published and its separate Rowell-Mode release pointer is approved, set it to `https://rowell-mode-app.vercel.app/download/mh-tri-low-spec/android`. The build creates the same link for visitors without JavaScript. Never use this entry to replace the standard APK.

The selected game URL is also saved in `config/download-links.json`; keep these values consistent when changing destinations. Game files are not included in this repository. Older app releases remain unpublished.

Page maintained by Rowell / [Nikushimi](https://www.youtube.com/@Nikushimi-19/videos). The app builds on OceanTriRecomp and its contributors; see the [full app credits](https://github.com/Dling11/monster_hunter_tri_emulator/blob/main/CREDITS.md). Monster Hunter Tri and its game artwork belong to CAPCOM. This is an unofficial fan page.
