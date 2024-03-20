const toggle = document.querySelector(".toggle");
const body = document.querySelector("body");
const prefersDarkMode = window.matchMedia("(prefers-color-scheme: dark)");
const root = document.querySelector(":root");

let themeIndex = 0;

let regularThemeData = {};
let darkThemeData = {};
let lightThemeData = {};

fetch("./theme-datas/regular-theme.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Couldn't fetch data");
    }

    return response.json();
  })
  .then((data) => (regularThemeData = data))
  .catch((error) => console.error(error));

fetch("./theme-datas/dark-theme.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Couldn't fetch data");
    }

    return response.json();
  })
  .then((data) => {
    darkThemeData = data;
    root.style.setProperty("--color-text-yellow", data.textYellow);
  })
  .catch((error) => console.error(error));

fetch("./theme-datas/light-theme.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Couldn't fetch data");
    }

    return response.json();
  })
  .then((data) => (lightThemeData = data))
  .catch((error) => console.error(error));

const getThemeData = function (themeIndex) {
  switch (themeIndex) {
    default:
    case 0:
      return regularThemeData;
    case 1:
      return darkThemeData;
    case 2:
      return lightThemeData;
  }
};

const changeTheme = function (themeIndex) {
  const data = getThemeData(themeIndex);

  root.style.setProperty("--color-body-background", data.bodyBackground);
  root.style.setProperty("--color-keypad-background", data.keypadBackground);
  root.style.setProperty("--color-screen-background", data.screenBackground);

  root.style.setProperty(
    "--color-reset-key-background",
    data.resetKeyBackground
  );
  root.style.setProperty("--color-reset-key-shadow", data.resetKeyShadow);

  root.style.setProperty(
    "--color-equals-key-background",
    data.equalsKeyBackground
  );
  root.style.setProperty("--color-equals-key-shadow", data.equalsKeyShadow);

  root.style.setProperty(
    "--color-regular-key-background",
    data.regularKeyBackground
  );
  root.style.setProperty("--color-regular-key-shadow", data.regularKeyShadow);

  root.style.setProperty("--color-text-dark", data.textDark);
  root.style.setProperty("--color-text-white", data.textWhite);

  switch (themeIndex) {
    default:
    case 0:
      toggle.style.justifyContent = "flex-start";
      if (body.classList.contains("light")) {
        body.classList.remove("light");
      }
      if (body.classList.contains("dark")) {
        body.classList.remove("dark");
      }
      break;
    case 1:
      toggle.style.justifyContent = "center";
      if (body.classList.contains("light")) {
        body.classList.remove("light");
      }
      if (!body.classList.contains("dark")) {
        body.classList.add("dark");
      }
      break;
    case 2:
      toggle.style.justifyContent = "flex-end";
      if (body.classList.contains("dark")) {
        body.classList.remove("dark");
      }
      if (!body.classList.contains("light")) {
        body.classList.add("light");
      }
      break;
  }
};

toggle.addEventListener("click", () => {
  themeIndex + 1 > 2 ? (themeIndex = 0) : themeIndex++;
  changeTheme(themeIndex);
  localStorage.setItem("theme", themeIndex);
});

function loadThemeIndex() {
  const theme = localStorage.getItem("theme");

  if (theme != null) {
    themeIndex = Number(theme);
    changeTheme(themeIndex);
  } else {
    if (prefersDarkMode) {
      changeTheme(1);
      localStorage.setItem("theme", 1);
    }
  }
}

setTimeout(() => {
  loadThemeIndex();
}, 300);
