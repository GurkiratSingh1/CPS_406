var remove;
document.addEventListener('DOMContentLoaded', function() {

 // Initialize Firebase
  const config = {
    apiKey: "AIzaSyDGHgRADrG2okN81RWwf9Am4_e5xm7VpjA",
    authDomain: "test-c24e0.firebaseapp.com",
    databaseURL: "https://test-c24e0.firebaseio.com",
    projectId: "test-c24e0",
    storageBucket: "test-c24e0.appspot.com",
    messagingSenderId: "891165606589"
  };
  firebase.initializeApp(config);
  
  
  //get Elements
 // const txtName = document.getElementById('txtName');
  const txtEmail = document.getElementById('txtEmail');
  const txtPassword = document.getElementById('txtPassword');
  const btnLogin = document.getElementById('btnLogin');
  const btnSignUp = document.getElementById('btnSignUp');
  const btnLogOut = document.getElementById('btnLogout');
  
  //add login event
  
  
  btnLogin.addEventListener('click', e =>{
	  
  //get email and pass and name
  //const name = txtName.value;
  const email = txtEmail.value;  
  const pass = txtPassword.value;  
  const auth = firebase.auth();  
  //sign in  
	  
  const promise = auth.signInWithEmailAndPassword(email,pass);	
  promise.catch(e => console.log(e.message));	   
  
  remove = 1;
  });
  
  //add signup event
  btnSignUp.addEventListener('click', e =>{
  
  //const name = txtName.value;
  const email = txtEmail.value;  
  const pass = txtPassword.value;  
  const auth = firebase.auth();  
  //sign up  
  
  
  const promise = auth.createUserWithEmailAndPassword(email,pass);
  promise.catch(e => console.log(e.message)); 
   remove = 1;
  });
 
  btnLogout.addEventListener('click', e =>{
  firebase.auth().signOut().then(function() {
  console.log('Signed Out');
  remove = 0;
});
  });


  //add a realtime listener auth 
  
  firebase.auth().onAuthStateChanged(firebaseUser => {
  
  if(firebaseUser){
	  console.log(firebaseUser);
	  

	 
	 //firebaseUser.updateProfile({'displayName: document.getElementById("name").value});
	  document.getElementById("btnLogout").style.display = "block";
	  document.getElementById("btnLogin").style.display = "none";
	  document.getElementById("btnSignUp").style.display = "none";
	 // document.getElementById("txtName").style.display = "none";
	  document.getElementById("txtEmail").style.display = "none";
	  document.getElementById("txtPassword").style.display = "none";
	  document.getElementById("name").style.display = "inline";
	  document.getElementById("name").innerHTML = "logged in as " + firebaseUser.email;

  }

  else{
	  console.log('not logged in');
	  document.getElementById("btnLogout").style.display = "none";
	 // document.getElementById("txtName").style.display = "inline";
	  document.getElementById("txtEmail").style.display = "inline";
	  document.getElementById("txtPassword").style.display = "inline";
	  document.getElementById("btnLogin").style.display = "inline";
	  document.getElementById("btnSignUp").style.display = "inline";
	  document.getElementById("name").style.display = "none";
  }
  });
  
  
  
  
  
 }());
 
 
 ////
 window.onload = function (){
        var prob;
        var desc; 
      
}
///
 
 
 var Problem = document.getElementById("Problem");
 var id;
var markers = {};
var lat,lng,markerId;
//database related stuff
var incidentLoc;
 function initMap() {
  
  var mapCanvas = document.getElementById("map");
  var myCenter=new google.maps.LatLng(43.6532,-79.3832);
  var mapOptions = {center: myCenter, zoom: 12};
  var map = new google.maps.Map(mapCanvas, mapOptions);

  
  google.maps.event.addListener(map, 'click', function(event) 
  {
	var lat = event.latLng.lat(); // lat of clicked point
    var lng = event.latLng.lng(); // lng of clicked point
    var markerId = getMarkerUniqueId(lat, lng); 
   placeMarker(map, event.latLng, markerId);
 });
 
}

var getMarkerUniqueId= function(lat, lng) {
    return lat + '_' + lng;
}

var getLatLng = function(lat, lng) {
    return new google.maps.LatLng(lat, lng);
};
	
	  
function placeMarker(map,location,markerId) {
	
  var problem = Problem.value;
  var color;

   
  
  if(document.getElementById('Grey').checked) {
	 
	color = "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|808080";
	}
	
	if(document.getElementById('Green').checked) {
   color = "http://maps.google.com/mapfiles/ms/icons/green-dot.png";

	}
	
	
	if(document.getElementById('Red').checked) {
    color = "http://maps.google.com/mapfiles/ms/icons/red-dot.png";

	}
	
	if(document.getElementById('Blue').checked) {
    color = "http://maps.google.com/mapfiles/ms/icons/blue-dot.png";

	}
  
  

  var marker = new google.maps.Marker({
    position: location,
    map: map,
	icon: color,
	 id: 'marker_' + markerId
  });
  
   markers[markerId] = marker; // cache marker in markers object
   
   
    bindMarkerEvents(marker);
	    

	
  var infowindow = new google.maps.InfoWindow({
    content: problem
  });
  
   infowindow.open(map, marker);
  
 marker.addListener('click', function() {
          infowindow.open(map, marker);
        });

  
  
}
var bindMarkerEvents = function(marker) {
    google.maps.event.addListener(marker, "rightclick", function (point) {
        var markerId = getMarkerUniqueId(point.latLng.lat(), point.latLng.lng()); // get marker id by using clicked point's coordinate
        var marker = markers[markerId]; // find marker
		if(remove == 1){
			removeMarker(marker, markerId); // remove it
		}        
    });
};

/**
 * Removes given marker from map.
 * @param {!google.maps.Marker} marker A google.maps.Marker instance that will be removed.
 * @param {!string} markerId Id of marker.
 */ 
var removeMarker = function(marker, markerId) {
    marker.setMap(null); // set markers setMap to null to remove it from map
    delete markers[markerId]; // delete marker instance from markers object
};
///database stuff

function getVal(){
        prob = document.getElementById("Problem").value;
        desc = document.getElementById("Desc").value;
          firebase.database().ref('posts/').push({
            Problem: prob,
            Description:desc
            //Location:incidentLoc
           });
} 

 