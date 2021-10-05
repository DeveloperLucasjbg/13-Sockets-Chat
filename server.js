const express = require("express");
const metodos = require("./metodos");
const { urlencoded } = require("express");

const app = express();
const PORT = 3333;
const router = express.Router();

const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use("/api", router);

//hardcodeo
let productos = [
  {
    id: 0,
    tittle: "juguito",
    price: 421.5,
    thumbail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXMQ0HER0N2YxkyYChFu4ReQL2Mg7thasxbwKRkWTeV6KmRlogSN1Fk9lMm3-neKzh0oQ&usqp=CAU",
  },
  {
    id: 1,
    tittle: "w40",
    price: 499,
    thumbail:
      "https://media.wd40.lat/app/uploads/2020/12/10120248/WD-40-MUP-linea-productos-640x640.png.webp",
  },
  {
    id: 2,
    tittle: "francesa",
    price: 421.5,
    thumbail:
      "data:image/jpeg;base64,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",
  },
];
//rutes
router.get("/productos/listar", (_, res) => {
  res.json(new metodos(null, null, productos).listar());
});
router.get("/productos/listar/:id", (req, res) => {
  const { id } = req.params;
  res.json(new metodos(id, null, productos).listarPorId());
});
router.post("/productos/guardar", (req, res) => {
  res.json(new metodos(null, req.body, productos).guardar());
});
router.put("/productos/actualizar/:id", (req, res) => {
  const { id } = req.params;
  res.json(new metodos(id, req.body, productos).actualizar());
});
router.delete("/productos/borrar/:id", (req, res) => {
  const { id } = req.params;
  res.json((productos = new metodos(id, req.body, productos).borrar()));
});
//listen port
http.listen(PORT, () => {
  console.log("escuchando el servidor", http.address().port);
});

app.set("view engine", "ejs");

router.get("/productos/vista", (_, res) => {
  res.render(
    "pages/",
    (products = new metodos(null, null, productos).listar())
  );
});

const mensajes = [
  {
    autor: "from Server",
    texto: "Bienvenido",
    time: new Date()
  },
];
io.on("connection", (socket) => {
  io.sockets.emit("mensajes", mensajes);
  console.log("cliente conectado");
  io.sockets.emit("PRODUCTOS", productos);
  socket.on("productIn", (newP) => {
    new metodos(null, newP, productos).guardar();
    io.sockets.emit("PRODUCTOS", productos);
  });
  socket.on("newMsj", (data) => {
    mensajes.push(data);
    io.sockets.emit("mensajes", mensajes);
  });
});
