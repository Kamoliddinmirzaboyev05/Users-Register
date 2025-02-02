// calling html elements
//registration elements
const toLog = document.querySelector(".toLog");
const toReg = document.querySelector(".toReg");
const register = document.querySelector(".register");
const registerBtn = document.querySelector(".registerBtn");
const login = document.querySelector(".login");
const loginBtn = document.querySelector(".loginBtn");
const formBack = document.querySelector(".form-back");
const fullName = document.querySelector(".fullName");
const email = document.querySelector(".email");
const userLogin = document.querySelector(".userLogin");
const userPassword = document.querySelector(".userPassword");
const confirimPassword = document.querySelector(".confirimPassword");
const loginInput = document.querySelector(".loginInput");
const passwordInput = document.querySelector(".passwordInput");
const body = document.querySelector("body");
const tbody = document.querySelector(".tbody");

// main elements
const apiLink = "https://679e2ea0946b0e23c062c4e8.mockapi.io/users/user";
const getData = async (link) => {
  const req = await fetch(link);
  const data = await req.json();
  logData(data);
  identify(data);
  writeData(data);
};
if(localStorage.getItem("enter") == "true"){
    body.classList.add("enter")
    getData(apiLink)
}
toLog.addEventListener("click", () => {
  formBack.classList.add("loginActive");
});
toReg.addEventListener("click", () => {
  formBack.classList.remove("loginActive");
});


// getData function for getting API data

// getData(apiLink)
const logData = (datab) => {
  console.log(datab);
};
// postData function for posting data to API
const postData = async (link, newData) => {
  const req = await fetch(link, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  });

  const data = await req.json();
  console.log("Yangi foydalanuvchi qo'shildi:", data);
};

// registration function
registerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  if (userPassword.value == confirimPassword.value) {
    formBack.classList.add("loginActive");
    const newUser = {
      fullName: fullName.value,
      email: email.value,
      login: userLogin.value,
      password: userPassword.value,
    };
    fullName.value = "";
    email.value = "";
    userLogin.value = "";
    userPassword.value = "";
    postData(apiLink, newUser);
  } else {
    alert("Parollarni tekshiring!");
  }
});

const identify = (DB) => {
  DB.forEach((user) => {
    if (
      loginInput.value == user.login &&
      passwordInput.value == user.password
    ) {
        localStorage.setItem("enter", "true")
      body.classList.add("enter");
    } else {
      console.log("parol login xato");
    }
  });
};
loginBtn.addEventListener("click", () => {
  getData(apiLink);
});

const writeData = (DB) => {
  DB.forEach((item) => {
    tbody.innerHTML += `
     <tr>
                <td>${item.id}</td>
                <td>${item.fullName}</td>
                <td>${item.email}</td>
                <td>${item.login}</td>
                <td>${item.password}</td>
              </tr>
    `;
  });
};
