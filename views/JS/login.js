var isLoggedin = false;
var userInfo = {};
function login() {
  console.log("starting logging");
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let data = {
    email: email,
    password: password
  };

  const storedToken = localStorage.getItem("token");
  console.log(storedToken, " stored");
  console.log(data);
  let url = "http://localhost:3000/booking/data/login";
  const param = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (!storedToken) {
    fetch(url, param)
      .then(response => {
        console.log("under fetch");
        return response.json();
      })
      .then(data => {
        console.log(data);
        //   userInfo = data;
        if (data.token) {
          console.log("under token");
          isLoggedin = true;
          localStorage.setItem("userId", data.userId);
          localStorage.setItem("token", data.token);
          localStorage.setItem("fullName", data.name);
          localStorage.setItem("expiresIn", data.expiresIn);
          window.location = "http://localhost:3000/booking";
        }
      });
  } else {
    window.alert("you can not go at desired location");
  }
}
