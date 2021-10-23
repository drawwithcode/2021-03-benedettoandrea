// function to set a given theme
function setTheme(themeName) {
  document.documentElement.className = themeName;
}

// function to toggle between light and dark theme
function toggleTheme() {
  var metaThemeColor = document.querySelector("meta[name=theme-color]");
  var currentTheme = document.documentElement.className;
  if (currentTheme === "light") {
    setTheme("dark");
    metaThemeColor.setAttribute("content", "#000000");
  } else {
    setTheme("light");
    metaThemeColor.setAttribute("content", "#ffffff");
  }
}
