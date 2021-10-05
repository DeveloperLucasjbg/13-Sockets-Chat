const d = document;
const socket = io();
const ul = d.getElementById("ul");

socket.on("PRODUCTOS", (data) => {
  toRender(data);
});

const toRender = (data) => {
  let pantilla = data
    .map(
      (e) => `
  <li class='grid'>  
  <em> ${e.tittle}</em>
  <p>${e.price}</p>
  <img class='imagen' src='${e.thumbail}' alt="">
  </li>`
    )
    .join(" ");
  ul.innerHTML = pantilla;
};

const productSend = () => {
  const tittle = d.getElementById("tittle").value;
  const price = d.getElementById("price").value;
  const thumbail = d.getElementById("thumbail").value;
  let newProduct = { tittle, price, thumbail };
  socket.emit("productIn", newProduct);
};
