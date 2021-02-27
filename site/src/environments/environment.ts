// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  userApiUrl: 'https://userapiqa.azurewebsites.net/',
  imagesProfileUrl: 'https://birdpostsqa.blob.core.windows.net/profiles/',
  imagesPostUrl: 'https://birdpostsqa.blob.core.windows.net/posts/',
  postApiUrl: 'https://postapiqa.azurewebsites.net/',
  userPostApiUrl: 'https://userpostapiqa.azurewebsites.net/',
  pendingApiUrl: 'https://pendingapiqa.azurewebsites.net/',
  birdApiUrl: 'https://localhost:44383/',
  googleApiKey: 'AIzaSyAjqE9XcDEwD2SmV9mmf757kYOdwTbJvwQ',
  whiteListDomains:  ["postapiqa.azurewebsites.net", "userapiqa.azurewebsites.net","birdsapiqa.azurewebsites.net"],
  blacklistedRoutes: []
}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 * 
  
  production: true,
  userApiUrl: 'https://localhost:44374/',
  imagesProfileUrl: 'https://birdpostsqa.blob.core.windows.net/profiles/',
  imagesPostUrl: 'https://birdpostsqa.blob.core.windows.net/posts/',
  postApiUrl: 'https://localhost:44304/',
  birdApiUrl: 'https://localhost:44383/',
  //birdApiUrl: 'https://birdsapiqa.azurewebsites.net/',
  userPostApiUrl: 'https://localhost:44352/',
  pendingApiUrl: 'https://localhost:44360/',
  googleApiKey: 'AIzaSyAjqE9XcDEwD2SmV9mmf757kYOdwTbJvwQ',
  whiteListDomains:  ["localhost:44374", "localhost:44304"],
  blacklistedRoutes: []
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
