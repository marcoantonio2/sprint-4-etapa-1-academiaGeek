let form = document.getElementById("form");

document.addEventListener("DOMContentLoaded", async function () {
  let result = await fetch("https://api-sprint-1-back.herokuapp.com/api/marcas");
  let marcas = await result.json();
  let holder = document.getElementById("selectHolder1");
  holder.innerHTML += `
  <label for="inputBrand" class="form-label">Marca</label>
  <select id="inputBrand" class="form-select" onchange="mostrarSelect2(this.value)" required>
      <option selected value="">Selecciona una opcion...</option>
      ${marcas
        .map((marca) => `<option value="${marca.id}">${marca.nombre}</option>`)
        .join("")}
  </select>
    `;

  let result2 = await fetch("https://api-sprint-1-back.herokuapp.com/api/vehiculos");
  let vehiculos = await result2.json();
  let holder2 = document.getElementById("tableBody");
  vehiculos.forEach((vehiculo) => {
    holder2.innerHTML += `
            <tr>
                <td>${vehiculo.id}</td>
                <td>${vehiculo.nombre}</td>
                <td>${vehiculo.descripcion}</td>
                <td>${vehiculo.numero_placa}</td>
                <td>${vehiculo.modelo}</td>
                <td>${vehiculo.fecha_vencimiento_seguro}</td>
                <td>${vehiculo.fecha_vencimiento_tecnicomecanica}</td>
                <td>
                    <button class="btn btn-primary" onclick="editarVehiculo(${vehiculo.id}, ${vehiculo.id_linea})">Editar</button>
                    <button class="btn btn-danger" onclick="eliminarVehiculo(${vehiculo.id})">Eliminar</button>
                </td>
            </tr>
            `;
  });
});

async function mostrarSelect2(id) {
  let result = await fetch("https://api-sprint-1-back.herokuapp.com/api/lineas/" + id);
  let lineas = await result.json();
  let holder2 = document.getElementById("selectHolder2");
  holder2.innerHTML = `
    <label for="inputLine" class="form-label">Linea</label>
    <select id="inputLine" class="form-select" required>
        <option selected value="">Selecciona una opcion...</option>
       ${lineas
         .map((linea) => `<option value="${linea.id}">${linea.nombre}</option>`)
         .join("")}
    `;
}

form.addEventListener("submit", async function (e) {
  let id_linea = document.getElementById("inputLine").value;
  let nombre = document.getElementById("inputName").value;
  let descripcion = document.getElementById("inputDescription").value;
  let numero_placa = document.getElementById("inputPlate").value;
  let modelo = document.getElementById("inputModel").value;
  let fecha_vencimiento_seguro =
    document.getElementById("inputVenciSeguro").value;
  let fecha_vencimiento_tecnicomecanica =
    document.getElementById("inputVenciTecno").value;
  let result = await fetch("https://api-sprint-1-back.herokuapp.com/api/vehiculos", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id_linea,
      nombre,
      descripcion,
      numero_placa,
      modelo,
      fecha_vencimiento_seguro,
      fecha_vencimiento_tecnicomecanica,
    }),
  });
  let data = await result.json();
  console.log(data);
  e.preventDefault();
});

async function editarVehiculo(id, id_linea) {
  window.location.href = `./pages/edit.html?id=${id}&id_linea=${id_linea}`;
}


async function eliminarVehiculo(id) {
  let result = await fetch("https://api-sprint-1-back.herokuapp.com/api/vehiculos/" + id, {
    method: "DELETE",
  });
  let data = await result.json();
  swal.fire(data, "success");
  window.location.reload();
}