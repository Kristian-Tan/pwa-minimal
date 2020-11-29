# Minimal PWA

## About
- minimal (least amount of code) to make a web application qualify as installable PWA
- no frills (css, js, library, framework), just plain old html and javascript (also some image/png/jpg for mandatory icon)
- the goal is to show the bare minimum to be installable by chrome/chromium (specification might be changed later, so it should work around last commit date)
- because it's minimal, it WILL violate many best practice for PWA

## Contained reason
- this section list the reason why each file exist in this minimal example (since all non-essential file/line must be removed to be truly 'minimal')
- README.md = to show this information
- index.html = html page to be served to browser, only contain link manifest and call to app.js
- app.js = must be made separate with index.html, called with 'defer' so that only after html page finished loading that this script is executed, contain service worker registration
- manifest.json = mandatory web manifest
- serviceWorker.js = mandatory service worker
- image logo 192px and 512px = according to https://web.dev/add-manifest/ PWA (for chrome desktop) must contain 192px and 512px icon

## Credits
- web.dev
- github.com/gauravbehere/pwa-starter-demo

