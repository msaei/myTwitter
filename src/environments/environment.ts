// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyCIp-MZwKXMfzoI4KJoaAcv4QODnEWZdaM",
    authDomain: "mytwitter-9b1c2.firebaseapp.com",
    databaseURL: "https://mytwitter-9b1c2.firebaseio.com",
    projectId: "mytwitter-9b1c2",
    storageBucket: "mytwitter-9b1c2.appspot.com",
    messagingSenderId: "540343751579"
  }
};
