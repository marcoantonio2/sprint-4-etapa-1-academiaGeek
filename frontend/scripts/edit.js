let id = window.location.href.split("?id=")[1];
id = id.split("&id_linea=")[0];
let form = document.getElementById("form");
document.addEventListener("DOMContentLoaded", async function () {
    console.log(id);
  let id_linea = window.location.href.split("&id_linea=")[1];
  let result = await fetch("https://api-sprint-1-back.herokuapp.com/api/lineas/" + id_linea);
  let lineas = await result.json();
  let holder = document.getElementById("selectHolder2");
  holder.innerHTML = `
          <label for="inputLine" class="form-label">Linea</label>
          <select id="inputLine" class="form-select" required>
              <option selected value="">Selecciona una opcion...</option>
             ${lineas
               .map(
                 (linea) =>
                   `<option value="${linea.id}">${linea.nombre}</option>`
               )
               .join("")}
          `;

  let result3 = await fetch("https://api-sprint-1-back.herokuapp.com/api/vehiculos");
  let vehiculos = await result3.json();
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
                </tr>
                `;
  });
});

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  let id_linea = document.getElementById("inputLine").value;
  let nombre = document.getElementById("inputName").value;
  let descripcion = document.getElementById("inputDescription").value;
  let numero_placa = document.getElementById("inputPlate").value;
  let modelo = document.getElementById("inputModel").value;
  let fecha_vencimiento_seguro =
    document.getElementById("inputVenciSeguro").value;
  let fecha_vencimiento_tecnicomecanica =
    document.getElementById("inputVenciTecno").value;
  let result = await fetch("https://api-sprint-1-back.herokuapp.com/api/vehiculos/" + id, {
    method: "PUT",
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
  let result2 = await fetch("https://api-sprint-1-back.herokuapp.com/api/vehiculos");
  let vehiculos = await result2.json();
  let holder2 = document.getElementById("tableBody");
  holder2.innerHTML = "";
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
                    </tr>
                    `;
  });
});
