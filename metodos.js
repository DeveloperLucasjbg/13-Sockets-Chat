class metodos {
  constructor(id, req, productos) {
    this.idToSearch = id;
    this.productos = productos;
    this.newReq = req;
  }

  listar() {
    if (this.productos.length === 0) {
      return "no hay productos";
    } else {
      return this.productos;
    }
  }

  listarPorId() {
    let thisProduct = this.productos.find(
      (productos) => productos.id == this.idToSearch
    );
    return thisProduct || "nose encontro producto";
  }
  guardar() {
    // validar que el req tenga contenido, tmb desde el form
    const newPropducts = {
      ...this.newReq,
      id: this.productos.length + 1,
    };
    this.productos.push(newPropducts);
    return "producto agregado";
  }
  actualizar() {
    let productFInd = this.productos.find(
      (productos) => productos.id == this.idToSearch
    );
    if (!productFInd) {
      return json({ msg: "prod no encontrad" });
    }
    productFInd.id = this.newReq.id || productFInd.id;
    productFInd.tittle = this.newReq.tittle || productFInd.tittle;
    productFInd.price = this.newReq.price || productFInd.price;
    productFInd.thumbail = this.newReq.thumbail || productFInd.thumbail;
    return;
  }
  borrar() {
    let aux = this.productos.filter((x) => x.id != this.idToSearch);

    return aux;
  }
}
module.exports = metodos;
