const apiKey = "60334d1b6bf0c304da99482033c0c44f"; // Your API key here

async function fetchWeather() {
  const state = document.getElementById("stateSelect").value.trim();
  const district = document.getElementById("districtInput").value.trim();
  const weatherBox = document.getElementById("weatherBox");
  const errorBox = document.getElementById("errorBox");

  if (!district || !state) {
    errorBox.textContent = "⚠️ Please select a state and enter a district.";
    errorBox.style.display = "block";
    weatherBox.style.display = "none";
    return;
  }

  const location = `${district},${state},IN`;
  console.log("Fetching weather for:", location);

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      location
    )}&appid=${apiKey}&units=metric`;

    const response = await fetch(url);

    if (!response.ok) throw new Error("Location not found");

    const data = await response.json();
    const { name, main, weather, wind } = data;

    weatherBox.innerHTML = `
      <h3>${name}</h3>
      <img src="https://openweathermap.org/img/wn/${weather[0].icon}@2x.png" alt="Weather icon" />
      <p><strong>${weather[0].main}</strong> - ${weather[0].description}</p>
      <p>🌡️ Temperature: ${main.temp}°C</p>
      <p>💧 Humidity: ${main.humidity}%</p>
      <p>🌬️ Wind Speed: ${wind.speed} m/s</p>
    `;

    weatherBox.style.display = "block";
    errorBox.style.display = "none";
  } catch (error) {
    errorBox.textContent = "❌ Location not found!";
    errorBox.style.display = "block";
    weatherBox.style.display = "none";
    console.error(error);
  }
}
