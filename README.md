# monster-hunter-tri-android-apk

A compact download and setup guide for **Monster Hunter Tri** and **Monster Hunter 4 Ultimate**. Tri includes Android/Windows options and a separate experimental **MH3 - Low Spec** entry. MH4U offers the original developer's native Android APK and a separate customized Azahar edition, each with its own game-file links and setup guide. Dark mode is the default, with an optional light theme.

Each game has its own shareable page, downloads, setup instructions, source links, metadata and credits. The MH4U page presents khorne-hub's original native app separately from the customized Azahar-based app in Dling11/MH4-ULTIMATE.

## Game links

| Link | Opens |
| --- | --- |
| `/` | Monster Hunter Tri (the default for existing tutorial links) |
| `/mh4u/` | MH4U page with Native port selected |
| `/mh4u/#mh4u-azahar` | MH4U page with Customized Azahar selected |
| `/?game=mh4u` | Selects MH4U from a query link |

Once more than one game is visible, the tabs and **Copy link** control appear. Tabs switch immediately, update the address and support browser Back/Forward and keyboard arrow keys. Native links open each enabled game’s entry page without JavaScript. Entries are generated from one template and share the same small CSS/JS files.

Game visibility is controlled by `visible` in `showcase/site.config.js`; Tri and MH4U are enabled. Setting an entry to `false` removes its production page, navigation, content and installer/archive URLs from the served JavaScript config. Source files in this public GitHub repository retain their configured URLs; hiding the deployed page is not source-code secrecy. Installer availability is configured separately.

Built with static HTML, CSS and JavaScript. No framework, database, environment variables or Docker is required.

## Local preview

With Node.js 20 or newer, run `npm run showcase` and open the printed address. You can also open `showcase/index.html` directly or use `OPEN-SHOWCASE.cmd` on Windows.

Use the preview server to test `/mh4u/`, refreshes and copied links. Opening the HTML directly is only a basic local view.

For the owner review, run `npm run preview:mh4u` and open `http://127.0.0.1:4198/mh4u/`. This explicitly enables MH4U only on the loopback preview server without changing the production visibility flag. Do not combine this with `--production`.

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

Downloads are available again for the tutorial. The APK button uses the matching `rowell-1.4.14` gameplay-stability pre-release in the [app repository](https://github.com/Dling11/monster_hunter_tri_emulator). It adapts hammer/lance, throwable-event, Agnaktor-material, camera and Android audio-buffer fixes while retaining both earlier online fixes. The separate game-file button opens [Romsfun](https://romsfun.com/download/monster-hunter-3-tri-id1-13483/2), replacing the previous MediaFire destination.

Public targets are in `showcase/site.config.js` with HTML fallbacks in `showcase/index.html`. Standard Android ARM64 and Windows x64 use the `rowell-1.4.14` pre-release. Both builds and automated checks passed; physical gameplay testing remains pending. Save inside Tri and install the APK over your existing app to retain progress and controls. Low Spec is an experimental Android ARMv7 app with separate storage. It requires Android 10+, OpenGL ES 3.0 and 32-bit app support; performance on physical phones is not yet verified.

The Low Spec button uses its independently approved [32-bit download](https://rowell-mode-app.vercel.app/download/mh-tri-low-spec/android), pinned to experimental `low-spec-0.1.2`. The build creates the same link for visitors without JavaScript. Set `lowSpec` to `null` to disable that option. This entry never replaces the standard APK.

The selected game URL is also saved in `config/download-links.json`; keep these values consistent when changing destinations. Game files are not included in this repository. Older app releases remain unpublished.

## MH4U app choices

The MH4U page has a second row of tabs: **Native port** and **Customized Azahar**.
Only the selected app's screenshot, download and instructions are shown. Each
screenshot is a compact preview that opens at a larger size; no image viewer or
framework dependency is added. Both tabs also work without JavaScript.

Direct local review links:

- Native: http://127.0.0.1:4198/mh4u/#mh4u-native
- Customized Azahar: http://127.0.0.1:4198/mh4u/#mh4u-azahar

Copy link preserves the selected edition. The addresses above are loopback review
links. Public visitors use the same paths at https://monster-hunter-tri-android-apk.vercel.app/.

The customized edition is **Monster Hunter 4 1.0.17**, based on
[klark231 / MH4U-Android](https://github.com/klark231/MH4U-Android) and
[AzaharPlus](https://github.com/klark231/AzaharPlus), with Azahar/Citra lineage.
Its [custom source](https://github.com/Dling11/MH4-ULTIMATE) and
[signed APK](https://github.com/Dling11/MH4-ULTIMATE/releases/download/rowell-1.0.17/Monster-Hunter-4-1.0.17.apk)
are available separately from the native APK. Save in-game before updating, then
install over this customized edition without uninstalling or clearing data.

The customized edition shows two game-image download buttons, in this order:
[1. Ziperto (3 parts)](https://www.ziperto.com/monster-hunter-4-ultimate-3ds-decrypted-rom/)
and [2. Romsfun](https://romsfun.com/download/monster-hunter-4-ultimate-72059-42763/2).
Choose one source. In 1.0.17, Add game can extract a single ZIP / 7Z directly or
copy a decrypted `.3ds`, `.cci` or `.cxi` image. For Romsfun, select the downloaded
archive through Add game. For Ziperto, keep all three matching parts together
and extract part 1 manually, then select the game image. A main-game `.cia`, RAR
or individual split part is not accepted by the automatic importer. Your original
download is kept; allow room for both it and the extracted image. Progress, Cancel,
storage checks and image validation are included. The camera joystick also matches
the walking pad's faint fill and outline. A local 4 GiB extraction matched its
reference, but the new Android import flow and appearance still need phone testing.
The Native tab keeps its separate prepared game-folder instructions.

## Native Android links

The `/mh4u/` page links the original **khorne-hub 0.1.9.2 APK**. Its published SHA-256, APK signature and package identity were checked against the official 0.1.8 build:

- Direct APK: https://github.com/khorne-hub/4u-native/releases/download/v0.1.9.2/MH4U-0.1.9.2.apk
- Original source and instructions: https://github.com/khorne-hub/4u-native
- Release notes/updates: https://github.com/khorne-hub/4u-native/releases
- Owner-selected game archive page: https://apkvision.org/games/monster-hunter-4-ultimate-135599/download/v0.1.8-obb/

The APK button downloads from GitHub in one click. The separate archive button opens APKVision; it does not select APKVision's modified installer. APKs/game files are not hosted by this static site. Version 0.1.9.2 has the same package (`com.mh4u.native`), signing certificate and required game-library ID (`775bad2e95f15be4`) as 0.1.8. Its release notes support updating over the previous official app while retaining saves, settings and the code library; keep the existing game-folder link. Save in-game and export a backup before updating. This does not establish compatibility with differently signed third-party installers or arbitrary code-changing mods.

The 0.1.9 update improves menu controls, save import, graphics and memory use; 0.1.9.1 fixes hidden-touch-screen flickering on older Mali and PowerVR drivers. Version 0.1.9.2 adds physical-controller combo assignments and shader-loading/performance logs. The single-screen mod expects the USA game in English. See the [official release notes](https://github.com/khorne-hub/4u-native/releases/tag/v0.1.9.2). The new APK has passed artifact checks but has not yet been tested on our phone; the earlier installation footage and screenshots use 0.1.8. Some menus differ, and solo play now pauses in the settings menu.

The guide covers extracting the prepared 7Z, choosing the actual game folder rather than the storage root, the Circle Pad Pro prompt, save backups and update/import behavior. This is an experimental port: startup was verified, but full quests, sustained FPS, save/reopen and multiplayer have not been verified for this setup. Both this native port and the older Azahar app run the 3DS game; they execute its CPU code differently.

Credits: Android frontend by [khorne-hub](https://github.com/khorne-hub/4u-native); recompiler/runtime from [CompaLarios18 / MH4UltimateDC](https://github.com/CompaLarios18/MH4UltimateDC), with parts derived from Azahar/Citra; single-screen mod by [jM5557](https://github.com/jM5557/mh4u-single-screen-mod). The MH4U logo is the existing CAPCOM game artwork retained from the older local app's `mh4_logo.jpg`; no app/game authorship is claimed by this guide.

Page maintained by Rowell / [Nikushimi](https://www.youtube.com/@Nikushimi-19/videos). The app builds on OceanTriRecomp and its contributors; see the [full app credits](https://github.com/Dling11/monster_hunter_tri_emulator/blob/main/CREDITS.md). Monster Hunter Tri and its game artwork belong to CAPCOM. This is an unofficial fan page.
