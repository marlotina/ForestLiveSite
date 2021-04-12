// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  pageDomain:"https://wbsite.azurewebsites.net",
  production: true,
  imagesProfileUrl: 'https://birdpostsqa.blob.core.windows.net/profiles/',
  imagesPostUrl: 'https://birdpostsqa.blob.core.windows.net/posts/',
  userApiUrl: 'https://userapiqa.azurewebsites.net/',
  postApiUrl: 'https://postapiqa.azurewebsites.net/',
  userPostApiUrl: 'https://userpostapiqa.azurewebsites.net/',
  userLabelApiUrl: 'https://userlabelapiqa.azurewebsites.net/',
  birdApiUrl: 'https://birdsapiqa.azurewebsites.net/',
  birdPendingApiUrl: 'https://birdpendingapiqa.azurewebsites.net/',
  userInteractionsApi: 'https://userinteractionsapiqa.azurewebsites.net/',
  postInteractionsApi: 'https://postinteractionsapiqa.azurewebsites.net/',
  specieApiUrl: 'https://specieapiqa.azurewebsites.net/',
  googleApiKey: 'AIzaSyAjqE9XcDEwD2SmV9mmf757kYOdwTbJvwQ',
  whiteListDomains:  ['postapiqa.azurewebsites.net', 
                      'userapiqa.azurewebsites.net',
                      'birdsapiqa.azurewebsites.net',
                      'postinteractionsapiqa.azurewebsites.net',
                      'userpostapiqa.azurewebsites.net',
                      'userlabelapiqa.azurewebsites.net',
                      'userinteractionsapiqa.azurewebsites.net',
                      'specieapiqa.azurewebsites.net',
                      'birdpendingapiqa.azurewebsites.net'],
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
  userApiUrl: 'https://userapiqa.azurewebsites.net/',
  imagesProfileUrl: 'https://birdpostsqa.blob.core.windows.net/profiles/',
  imagesPostUrl: 'https://birdpostsqa.blob.core.windows.net/posts/',
  postApiUrl: 'https://postapiqa.azurewebsites.net/',
  userPostApiUrl: 'https://userpostapiqa.azurewebsites.net/',
  birdApiUrl: 'https://birdsapiqa.azurewebsites.net/',
  googleApiKey: 'AIzaSyAjqE9XcDEwD2SmV9mmf757kYOdwTbJvwQ',
  whiteListDomains:  ["postapiqa.azurewebsites.net", "userapiqa.azurewebsites.net","birdsapiqa.azurewebsites.net"],
  blacklistedRoutes: []

/*
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
