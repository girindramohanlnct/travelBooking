//javascript.js
//set map options
let isClicked = false;
let distanceFull;
let driverType;
let cost;
console.log(localStorage.getItem("token"));
if (localStorage.getItem("token")) {
  isAuth = true;
  islogout = false;
  console.log("google");
  document.getElementById("register").style.visibility = "hidden";
  document.getElementById("login").style.visibility = "hidden";
  document.getElementById(
    "user"
  ).innerHTML = `<h4> Hello ${localStorage.getItem("fullName")} </h4>`;
} else {
  console.log("under else");
  document.getElementById("logout").style.visibility = "hidden";
  document.getElementById("user").style.visibility = "hidden";
  document.getElementById("register").style.display = "block";
  document.getElementById("login").style.display = "block";
}
console.log("KKKKK");
var myLatLng = { lat: 12.9716, lng: 77.5946 };
var mapOptions = {
  center: myLatLng,
  zoom: 10,
  mapTypeId: google.maps.MapTypeId.ROADMAP
};

//create map
var map = new google.maps.Map(document.getElementById("googleMap"), mapOptions);

//create a DirectionsService object to use the route method and get a result for our request
var directionsService = new google.maps.DirectionsService();

//create a DirectionsRenderer object which we will use to display the route
var directionsDisplay = new google.maps.DirectionsRenderer();

//bind the DirectionsRenderer to the map
directionsDisplay.setMap(map);

//define calcRoute function

function calcRoute() {
  //create request
  document.getElementById("driver").style.display = "block";
  isClicked = true;
  var request = {
    origin: "Bangalore, Karnataka, India",
    destination: document.getElementById("to").value,
    travelMode: google.maps.TravelMode.DRIVING, //WALKING, BYCYCLING, TRANSIT
    unitSystem: google.maps.UnitSystem.METRIC
  };
  console.log("inside valcRoute");

  //pass the request to the route method
  directionsService.route(request, function(result, status) {
    if (status == google.maps.DirectionsStatus.OK) {
      //Get distance and time
      let distance1 = result.routes[0].legs[0].distance.text;
      let d = distance1.split(" ")[0].split(",");
      d = d.join("");
      let distance = parseInt(d);
      distanceFull = distance;
      console.log(distance);
      let day = Math.round(distance / 300);
      let coveredDistance = 300 * day;
      console.log("Cobvered ", coveredDistance);
      let remainDistance = distance - coveredDistance;
      console.log("remian ", remainDistance);
      let hour = (remainDistance * 24) / 300;
      console.log("hour ", hour);
      let duration = day + " day(s) " + hour + " hour(s)";
      console.log("day ", day);
      console.log("duration ", duration);

      $("#output").html(
        "<div class='alert-info'>From: " +
          document.getElementById("from").value +
          ".<br />To: " +
          document.getElementById("to").value +
          ".<br /> Driving distance: " +
          result.routes[0].legs[0].distance.text +
          ".<br />Duration: " +
          result.routes[0].legs[0].duration.text +
          ".</div>"
      );

      document.getElementById(
        "output"
      ).innerHTML = `                           <form>
                                        <div class="form-row">
                                            <div class="col">
                                            <label for="inputPassword4">Distance</label>
                                            </div>
                                            <div class="col">
                                            <input type="text" id="distance" class="form-control" value="${result.routes[0].legs[0].distance.text}" disabled>
                                            </div>
                                        </div>
                                        </form>

                                        <form class="my-2">
                                        <div class="form-row">
                                            <div class="col">
                                            <label for="inputPassword4">Duration</label>
                                            </div>
                                            <div class="col">
                                            <input type="text" id="duration" class="form-control" value="${duration}" disabled>
                                            </div>
                                        </div>
                                        </form>
                                        
                                        `;

      //display route
      directionsDisplay.setDirections(result);
    } else {
      //delete route from map
      directionsDisplay.setDirections({ routes: [] });
      //center map in London
      map.setCenter(myLatLng);

      //show error message
      $("#output").html(
        "<div class='alert-danger'>Could not retrieve driving distance.</div>"
      );
    }
  });
}

//create autocomplete objects for all inputs
var options = {
  types: ["(cities)"]
};

var input1 = document.getElementById("from");
var autocomplete1 = new google.maps.places.Autocomplete(input1, options);

var input2 = document.getElementById("to");
var autocomplete2 = new google.maps.places.Autocomplete(input2, options);

function logout1() {
  localStorage.removeItem("token");
  localStorage.removeItem("fullName");
  localStorage.removeItem("expiresIn");
  localStorage.removeItem("userId");
  if (!localStorage.getItem("token")) {
    document.getElementById("logout").style.visibility = "hidden";
  }
  window.location = "http://localhost:3000/booking";
  document.getElementById("user").style.visibility = "hidden";
}

if (!isClicked) {
  document.getElementById("driver").style.display = "none";
} else {
  document.getElementById("driver").style.display = "block";
}

function populateFair() {
  console.log("Fair");
  driverType = document.getElementById("driver").value;
  console.log(driverType);
  if (driverType === "super") {
    let duration = document.getElementById("duration").value;
    let d = duration.split(" ");
    cost = d[0] * 300;
    console.log("first 0 ", cost);
    if (0 < d[2] < 1) {
      cost = cost + 300;
    }
    console.log("cost 2nd ", cost);
    cost = cost + distanceFull * 15;
    console.log("cost lsat ", cost);
  } else if (driverType === "delux") {
    let duration = document.getElementById("duration").value;
    let d = duration.split(" ");
    cost = d[0] * 300;
    console.log("first 0 ", cost);
    if (0 < d[2] < 1) {
      cost = cost + 300;
    }
    console.log("cost 2nd ", cost);
    cost = cost + distanceFull * 18;
    console.log("cost lsat ", cost);
  } else if (driverType === "premium") {
    let duration = document.getElementById("duration").value;
    let d = duration.split(" ");
    cost = d[0] * 300;
    console.log("first 0 ", cost);
    if (0 < d[2] < 1) {
      cost = cost + 300;
    }
    console.log("cost 2nd ", cost);
    cost = cost + distanceFull * 20;
    console.log("cost lsat ", cost);
  }
  console.log("cost ", cost);
  document.getElementById("book").style.display = "block";
  document.getElementById("fair").innerHTML = `<form class="my-2">
  <div class="form-row">
      <div class="col">
      <label for="inputPassword4">Cost</label>
      </div>
      <div class="col">
      <input type="text" id="duration" class="form-control" value="${cost} Rupee(s)" disabled>
      </div>
  </div>
  </form>`;
}

document.getElementById("book").style.display = "none";

function bookNow() {
  if (localStorage.getItem("token")) {
    let sessionId = "";
    let url = "http://localhost:3000/booking/pay";

    console.log("pay");
    const data = {
      userId: localStorage.getItem("userId"),
      cost: cost,
      distance: distanceFull,
      fullName: localStorage.getItem("fullName"),
      driver: driverType
    };
    const param = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(url, param)
      .then(response => response.json())
      .then(data => {
        sessionId = data.sessionId;
        console.log(
          " data is fullanme " + data.fullName,
          " sessio ",
          sessionId
        );
        console.log("data sess ", data.sessionId);
        let stripe = Stripe("pk_test_gS4kucM6eUue4ZSDZeA2mrch00YQ4lWBQd");

        stripe
          .redirectToCheckout({
            sessionId: data.sessionId
          })
          .then(result => {
            console.log(result.error.message);
          });
      });
  } else {
    window.location = "http://localhost:3000/booking/signin;";
  }
}
