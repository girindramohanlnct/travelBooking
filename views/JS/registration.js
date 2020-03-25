function postRegistrationData() {
  let fullName = document.getElementById("fullName").value;
  let email = document.getElementById("email").value;
  let phone = document.getElementById("phone").value;
  let password = document.getElementById("password").value;
  let confirmPassword = document.getElementById("confirmPassword").value;

  console.log("password ", password);
  console.log("confirm password ", confirmPassword);
  let data = {
    fullName: fullName,
    email: email,
    phone: phone,
    password: password,
    confirmPassword: confirmPassword
  };

  let url = "http://localhost:3000/booking/data/register";
  const param = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json"
    }
  };
  if (!localStorage.getItem("token")) {
    fetch(url, param)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        if (data.result) {
          window.location = "http://localhost:3000/booking/signin";
        }
      });
  } else {
    window.location = "http://localhost:3000/booking";
  }
}

console.log("reg js");
