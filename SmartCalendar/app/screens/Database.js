import firebase from "firebase/app";
import "firebase/database";
import "firebase/auth";


export default class Database {
	
  static db = null;  

  static getDB() {
  	if  (Database.db === null) {
  		var firebaseConfig = {
		apiKey: "AIzaSyAG9qRaaixzJOVltp_m4vo2UJP-LHDd9W0",
		authDomain: "smartwatercalendarjic8138.firebaseapp.com",
		databaseURL: "https://smartwatercalendarjic8138.firebaseio.com",
	    projectId: "smartwatercalendarjic8138",
	    storageBucket: "smartwatercalendarjic8138.appspot.com",
	    messagingSenderId: "707210951412"
		};

		Database.db = firebase.initializeApp(firebaseConfig);
	}
  	return Database.db;
  }

  constructor() {
  }

}