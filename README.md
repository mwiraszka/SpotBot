# Spotbot

This web app is built with the Angular framework. SpotBot makes your life easier by allowing you to drop a music folder and allowing you to create a Spotify playlist with any songs found in Spotify.

Live website is available at: https://spotbot-762b2.web.app/

# Development details

# System requirements

Libraries verified to be working for:

```
❯ node -v
v12.18.0
❯ npm --version
6.14.4
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Functions usage

For Spotify login server side cloud functions:
1. Download secrets: firebase functions:config:get > .runtimeconfig.json
2. Test locally with emulator: firebase emulators:start

The emulator is setup to load files from the `dist` folder so you will have to do a `ng build` to serve any latest local changes. This should only be used for testing app + functions behaviour locally. For all other development it is recommended to use `ng serve` development flow.

## Functions deploy

Deployment has been auto configured as part of the .github trigger. However, functions must still be deployed manually.

Ensure that before any pull request creation `npm run build` is run which will update the package.json version.

firebase deploy --only hosting
firebase deploy --only functions

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

# Spotify Integration

https://developer.spotify.com/documentation/web-api/quick-start/

## Firebase functions

Our backend server is powered via Firebase cloud functions.

    firebase deploy --only functions
