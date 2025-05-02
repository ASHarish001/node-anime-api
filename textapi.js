const animeName = "zatch_bell";
const api_url = `http://localhost:3000/${animeName}`;

const response = await fetch(api_url);
const data = await response.json();

console.log(data[0]);
console.log(typeof data, data.length);