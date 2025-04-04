/* configuration locale */
/* dans une app react les variables doivent être préfixées de "REACT_APP_" pour être prises en compte */

class Env{
  REACT_APP_FIREBASE_CONFIG: any = {
    apiKey: "AIzaSyCsm_58PMx4Kg8NZGXYuzHn56hUZaeDTZA",
    authDomain: "cards-auth.firebaseapp.com",
    //databaseURL: "https://cards-auth.firebaseio.com",
    projectId: "cards-auth",
    storageBucket: "cards-auth.appspot.com",
    messagingSenderId: "802655835134",
    appId: "1:802655835134:web:08ff1983d03f95ce6426af",
    measurementId: "G-JMY0P0K68W"
  }
}

//Read environnement variable to override
const env: any = new Env()

export default env