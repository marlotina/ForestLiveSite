// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: true,
  pageDomain:"https://bcsite.azurewebsites.net",
  imagesProfileUrl: 'https://bcommunitystorageaccount.blob.core.windows.net/profiles/',
  imagesPostUrl: 'https://bcommunitystorageaccount.blob.core.windows.net/posts/',
  userApiUrl: 'https://bcuser.azurewebsites.net/',
  postApiUrl: 'https://bcposts.azurewebsites.net/',
  userLabelApiUrl: 'https://bcuser.azurewebsites.net/',
  birdApiUrl: 'https://bcsearchs.azurewebsites.net/',
  userInteractionsApi: 'https://bcuserinteractions.azurewebsites.net/',
  postInteractionsApi: 'https://bcpostinteractions.azurewebsites.net/',
  specieApiUrl: 'https://bcexternaldata.azurewebsites.net/',
  googleApiKey: 'AIzaSyAjqE9XcDEwD2SmV9mmf757kYOdwTbJvwQ',
  whiteListDomains:  ['bcposts.azurewebsites.net', 
                      'bcuser.azurewebsites.net',
                      'bcsearchs.azurewebsites.net',
                      'bcpostinteractions.azurewebsites.net',
                      'bcuser.azurewebsites.net',
                      'bcuserinteractions.azurewebsites.net',
                      'bcexternaldata.azurewebsites.net'],
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
  pageDomain:"https://bcsite.azurewebsites.net",
  imagesProfileUrl: 'https://bcommunitystorageaccount.blob.core.windows.net/profiles/',
  imagesPostUrl: 'https://bcommunitystorageaccount.blob.core.windows.net/posts/',
  userApiUrl: 'https://localhost:44374/',
  postApiUrl: 'https://localhost:44304/',
  birdApiUrl: 'https://localhost:44383/',
  userInteractionsApi: 'https://localhost:44361/',
  postInteractionsApi: 'https://localhost:44388/',
  specieApiUrl: 'https://localhost:44380/',
  googleApiKey: 'AIzaSyAjqE9XcDEwD2SmV9mmf757kYOdwTbJvwQ',
  whiteListDomains:  ['localhost:44304', 
                      'localhost:44374',
                      'localhost:44383',
                      'localhost:44388',
                      'localhost:44361',
                      'localhost:44380'],
  blacklistedRoutes: []

/*
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
