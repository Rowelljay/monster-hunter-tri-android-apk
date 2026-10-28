# monster-hunter-tri-android-apk

A compact Android download page for **MH Tri - Rowell**, with APK and game-file links, setup instructions, source code and contributor credits. Dark mode is the default, with an optional light theme.

Built with static HTML, CSS and JavaScript. No framework, database, environment variables or Docker is required.

## Local preview

With Node.js 20 or newer, run `npm run showcase` and open the printed address. You can also open `showcase/index.html` directly or use `OPEN-SHOWCASE.cmd` on Windows.

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

Downloads are temporarily paused. The public page shows a pause notice, and `apk` and `game` are `null` in `showcase/site.config.js`. Restore the download cards and URLs from the preceding commit only when downloads are ready to resume. The [app source repository](https://github.com/Dling11/monster_hunter_tri_emulator) remains available. Game files are not included in this repository.

Page maintained by Rowell / [Nikushimi](https://www.youtube.com/@Nikushimi-19/videos). The app builds on OceanTriRecomp and its contributors; see the [full app credits](https://github.com/Dling11/monster_hunter_tri_emulator/blob/main/CREDITS.md). Monster Hunter Tri and its game artwork belong to CAPCOM. This is an unofficial fan page.
