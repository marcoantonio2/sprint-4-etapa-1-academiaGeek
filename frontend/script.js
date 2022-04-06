
document.addEventListener("DOMContentLoaded", function () {
  let holder = document.getElementById("selectHolder1");
  holder.innerHTML += `
  <label for="inputBrand" class="form-label">Marca</label>
  <select id="inputBrand" class="form-select" onchange="mostrarSelect2(this.value)" required>
      <option selected value="null"></option>
      <option value="1">Volks wagen1</option>
      <option value="2">Volks wagen2</option>
      <option value="3">Volks wagen3</option>
      <option value="4">Volks wagen4</option>
  </select>
    `;
});

function mostrarSelect2(id) {
    let holder2 = document.getElementById("selectHolder2");
    holder2.innerHTML =`
    <label for="inputLine" class="form-label">Linea</label>
    <select id="inputLine" class="form-select" required>
        <option selected value="null"></option>
        <option value="1">Volks wagen1</option>
        <option value="2">Volks wagen2</option>
        <option value="3">Volks wagen3</option>
    `;
};