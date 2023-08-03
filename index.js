let url = `https://www.thecolorapi.com/scheme?hex=5ba0e1&mode=monochrome&count=5`;

const renderColors = (colors) => {
  const hexCodes = colors.map((color) => color.hex.value).join(", ");

  let html = colors
    .map((color) => {
      return `
            <div class="color">
              <div class="color-fill" style="background: ${color.hex.value}">
                  <p class="color-name">${color.name.value}</p>
              </div>
              <p class="color-hex">${color.hex.value}</p>
            </div>
        `;
    })
    .join("");

  document.querySelector(".scheme-palette").innerHTML = html;
  document.body.style.background = `linear-gradient(to top, ${hexCodes})`;
};

document.querySelector(".generator-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const data = new FormData(e.target);

  const colorHex = data.get("color-hex").slice(1);
  const colorMode = data.get("color-mode");

  console.log(colorHex);
  const queryString = `?hex=${colorHex}&mode=${colorMode}&count=5`;
  url = `https://www.thecolorapi.com/scheme${queryString}`;

  fetchColorScheme();
});

const fetchColorScheme = () => {
  fetch(url)
    .then((res) => res.json())
    .then((data) => renderColors(data.colors));
};

fetchColorScheme();

// Copy to clipboard
