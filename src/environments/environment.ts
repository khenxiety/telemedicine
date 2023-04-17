// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  firebase: {
    projectId: 'telemedicine-3ca8d',
    appId: '1:82380482432:web:5277aeaef9db15ce28c365',
    databaseURL: 'https://telemedicine-3ca8d-default-rtdb.firebaseio.com',
    storageBucket: 'telemedicine-3ca8d.appspot.com',
    apiKey: 'AIzaSyAtrnUDaelaOXvlvT67mYSC767kWoexYHo',
    authDomain: 'telemedicine-3ca8d.firebaseapp.com',
    messagingSenderId: '82380482432',
    measurementId: 'G-LV3WD9ZVLJ',
  },
  production: false,
  emailJs:{
    serviceId:'service_691qh98',
    templateId:'template_av5a8kq'
  }
};

// {
//   "rules": {
//     ".read": "true",
//     ".write": "true",
//     "data": {
//       ".indexOn": ["date","name"],

//     },
//     "users": {
//       ".indexOn": ["email"],

//     }
//   }
// }
//{
//"rules": {
// ".read": "auth != null",
// ".write": "auth != null",
//"$uid": {
// ".write": "$uid === auth.uid"
//},
// "data": {
//   ".indexOn": ["date","name"],

//  },
//  "users": {
//   ".indexOn": ["email"],

// }
// }
//}
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
