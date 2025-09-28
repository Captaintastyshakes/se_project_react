//api key
const APIKey = "18dcbdfc088656b10a0172f785ceb998";

//coordinates

const coordinates = { latitude: "53.63344", longitude: "-113.63533" };

//

export const baseURL = `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.latitude}&lon=${coordinates.longitude}&units=imperial&appid=${APIKey}`;

//export const dbApiUrl = "http://localhost:3001";

//export const dbApiUrl = "http://localhost:3000";
//NEW url endpoint for remote ubuntu server
export const dbApiUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.tastywearlab.jumpingcrab.com"
    : "http://localhost:3001";
