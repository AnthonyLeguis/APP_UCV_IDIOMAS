const mensajeVacio = document.querySelector("#mensajeError");
const agregarPersonal = document.querySelector("#agregarPersonal");
const modal = document.querySelector("#modalAgregar");

//inputs para registrar personal EIM
const formAgregarPersona = document.querySelector("#formAgregarPersona");
const namePersonal = document.querySelector("#namePersonal");
const cedulaPersonal = document.querySelector("#cedulaPersonal");
const idacPersonal = document.querySelector("#idacPersonal");
const departamentoPersonal = document.querySelector("#departamentoPersonal");
const catedraPersonal = document.querySelector("#catedraPersonal");
const agregarPersonalModal = document.querySelector("#btnAgregarPersonalModal");
const cerrarModal = document.querySelector("#closeModal");

agregarPersonal.addEventListener("click", () => {
  modal.showModal();
});

cerrarModal.addEventListener("click", () => {
  modal.close();
});

let newPersonal = {};

namePersonal.addEventListener("input", (e) => {
  const nombreValor = namePersonal.value;
  newPersonal.nameFull = nombreValor;
});

cedulaPersonal.addEventListener("input", (e) => {
  let cedulaValor = cedulaPersonal.value;
  cedulaValor = cedulaValor.replace(/\D/g, ""); // Eliminar todos los caracteres que no sean números
  cedulaPersonal.value = cedulaValor; // Actualiza el valor del campo solo con los números
  newPersonal.cedula = cedulaValor;
});

const opcionesCatedra = {
  716000: [{ value: "716000000", text: "ESCUELA DE IDIOMAS MODERNOS" }],
  716020: [
    { value: "716020100", text: "IDIOMA BÁSICO" },
    { value: "716020200", text: "CULTURA DE ALEMÁN" },
    { value: "716020300", text: "GRAMATICA Y ESPECIALIZACIÓN" },
  ],
  716030: [
    { value: "716030100", text: "IDIOMA BÁSICO" },
    { value: "716030200", text: "CULTURA" },
    { value: "716030300", text: "GRAMÁTICA Y ESPECIALIZACIÓN" },
  ],
  716040: [
    { value: "716040100", text: "INGLÉS IDIOMA BÁSICO" },
    { value: "716040200", text: "INGLÉS CULTURA" },
    { value: "716040300", text: "INGLÉS GRAMÁTICA Y ESPECIALIZACIÓN" },
  ],
  716050: [
    { value: "716050100", text: "IDIOMA BÁSICO" },
    { value: "716050200", text: "CULTURA" },
    { value: "716050300", text: "GRAMÁTICA DEL ITALIANO" },
  ],
  716070: [
    { value: "716070100", text: "LINGÜÍSTICA" },
    { value: "716070200", text: "LENGUA ESPAÑOLA" },
    { value: "716070300", text: "ASIGNATURAS INSTRUMENTALES" },
  ],
  716080: [
    { value: "716080100", text: "IDIOMA BÁSICO" },
    { value: "716080200", text: "CULTURA" },
    { value: "716080300", text: "GRAMÁTICA Y ESPECIALIZACIÓN" },
  ],
  716090: [
    { value: "716090100", text: "TRADUCCIÓN" },
    { value: "716090200", text: "INTERPRETACIÓN" },
  ],
};

function actualizarOpcionesCatedra() {
  const departamentoSeleccionado = departamentoPersonal.value;
  const opciones = opcionesCatedra[departamentoSeleccionado] || [];

  //limpieza de las opciones actuales del segundo select
  catedraPersonal.innerHTML = "";

  //agregado de las nuevas opciones al segundo select
  opciones.forEach((opcion) => {
    const option = document.createElement("option");
    option.value = opcion.value;
    option.text = opcion.text;
    catedraPersonal.appendChild(option);
  });
}

departamentoPersonal.addEventListener("change", () => {
  const departamentoSelected =
    departamentoPersonal[departamentoPersonal.selectedIndex];
  const departamentoText = departamentoSelected.text;
  newPersonal.departamento = departamentoText;
});

departamentoPersonal.addEventListener("change", actualizarOpcionesCatedra);

actualizarOpcionesCatedra();

catedraPersonal.addEventListener("change", () => {
  const catedraSelected = catedraPersonal[catedraPersonal.selectedIndex];
  const catedraText = catedraSelected.text;
  newPersonal.catedra = catedraText;
});

idacPersonal.addEventListener("input", (e) => {
  let idacValor = idacPersonal.value;
  idacValor = idacValor.replace(/\D/g, ""); // Eliminar todos los caracteres que no sean números
  idacPersonal.value = idacValor; // Actualiza el valor del campo solo con los números
  newPersonal.idac = idacValor;
});

function mostrarSpinner() {
  const spinner = document.querySelector("#spinner");
  spinner.classList.remove("hidden");
  spinner.classList.add("flex");
}

function ocultarSpinner() {
  const spinner = document.querySelector("#spinner");
  spinner.classList.remove("flex");
  spinner.classList.add("hidden");
}

function mostrarMsjSuccess() {
  const msjSuccess = document.querySelector("#msjSuccess");
  msjSuccess.classList.remove("hidden");
  msjSuccess.classList.add("flex");
}

function ocultarMsjSuccess() {
  const msjSuccess = document.querySelector("#msjSuccess");
  msjSuccess.classList.remove("flex");
  msjSuccess.classList.add("hidden");
}

function mostrarMsjError() {
  const msjSuccess = document.querySelector("#msjError");
  msjSuccess.classList.remove("hidden");
  msjSuccess.classList.add("flex");
}

function ocultarMsjError() {
  const msjSuccess = document.querySelector("#msjError");
  msjSuccess.classList.remove("flex");
  msjSuccess.classList.add("hidden");
}

// Enviar registro del personal a la DB//
formAgregarPersona.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    const newPersonal = {
      nameFull: namePersonal.value,
      cedula: cedulaPersonal.value,
      departamento:
        departamentoPersonal.options[departamentoPersonal.selectedIndex].text,
      catedra: catedraPersonal.options[catedraPersonal.selectedIndex].text,
      Idac: idacPersonal.value,
    };

    console.log(newPersonal);
    formAgregarPersona.reset();

    //crearNotificacion(false);

    mostrarSpinner();

    const response = await axios.post("/api/personal", newPersonal);
    console.log(response);

    // Esperar 1 segundos
    await new Promise((resolve) => setTimeout(resolve, 1000));

    ocultarSpinner();

    mostrarMsjSuccess();

    await new Promise((resolve) => setTimeout(resolve, 2000));

    ocultarMsjSuccess();
  } catch (error) {
    console.error(error);
    //crearNotificacion(true);
    formAgregarPersona.reset();

    await new Promise((resolve) => setTimeout(resolve, 1000));
    ocultarSpinner();

    mostrarMsjError();

    await new Promise((resolve) => setTimeout(resolve, 2000));

    ocultarMsjError();
  }
});

// Función para obtener los datos del personal desde tu API
async function obtenerPersonal() {
  try {
    mostrarSpinner();
    const response = await axios.get("/api/personal");
    const personal = response.data;
    generarHTML(personal);
    ocultarSpinner();
  } catch (error) {
    console.error(error);
  }
}

// Función para generar el HTML del listado utilizando los datos del personal
function generarHTML(personal) {
  //console.log(personal)
  const containPersonal2 = document.querySelector("#containPersonal2");

  personal.forEach((dato) => {
    const tr = document.createElement("tr");
    tr.id = "listadoPersonalOrden";
    tr.className =
      "flex justify-around items-center text-ccenter h-auto my-1 border-1.5 border-indigo-950 rounded-md bg-indigo-300 transition-all duration-[1500]";

    /////////////// ESCUELA /////////////////
    const divEscuela = document.createElement("th");
    divEscuela.id = "list_escuela";
    divEscuela.className = "flex align-center md:ml-5";
    const h2Escuela = document.createElement("h2");
    h2Escuela.className = " text-[0.50rem] md:text-xs lg:text-md font-semibold w-10";
    h2Escuela.textContent = "EIM";
    divEscuela.appendChild(h2Escuela);

    /////////////// NOMBRE /////////////////
    const h2Nombre = document.createElement("h2");
    h2Nombre.className = "flex align-center justify-end mx-auto text-[0.50rem] md:text-xs lg:text-md font-semibold uppercase w-40";
    h2Nombre.textContent = dato.nameFull;
    //console.log(dato.nameFull);
    const divNombre = document.createElement("th");
    divNombre.id = "list_nombre";
    divNombre.className = "flex align-center md:ml-12";
    divNombre.appendChild(h2Nombre);

    /////////////// CEDULA /////////////////
    const divCedula = document.createElement("th");
    divCedula.id = "list_cedula";
    divCedula.className = "flex align-center md:mr-3";
    const h2Cedula = document.createElement("h2");
    h2Cedula.className = "flex align-center justify-end text-[0.50rem] md:text-xs lg:text-md font-semibold uppercase w-24";
    h2Cedula.textContent = dato.cedula;
    divCedula.appendChild(h2Cedula);
    //console.log(dato.cedula);

    /////////////// DEPARTAMENTO /////////////////
    const divDepartamento = document.createElement("th");
    divDepartamento.id = "list_departamento";
    divDepartamento.className = "flex align-center justify-center";
    const h2Departamento = document.createElement("h2");
    h2Departamento.className = "text-[0.50rem] md:text-xs lg:text-md font-semibold uppercase w-40";
    h2Departamento.textContent = dato.departamento;
    divDepartamento.appendChild(h2Departamento);
    //console.log(dato.departamento)

    /////////////// IDAC /////////////////
    const divIdac = document.createElement("th");
    divIdac.id = "list_idac";
    divIdac.className = "flex justify-center md:mr-4";
    const h2Idac = document.createElement("h2");
    h2Idac.className = "flex align-center justify-center text-[0.50rem] md:text-xs lg:text-md font-semibold w-20";
    h2Idac.textContent = dato.Idac;
    divIdac.appendChild(h2Idac);

    ////////Botones de acción////////
    const divBotones = document.createElement("th");
    divBotones.className ="flex flex-row my-auto w-20 md:mr-2";

    ////////Boton de editar//////////
    const divEditar = document.createElement("div");
    divEditar.className = "w-6 my-4 mx-1 text-center";
    divEditar.title = "Editar";
    const buttonEditar = document.createElement("button");
    buttonEditar.id = "btnEditarPersonal";
    buttonEditar.name = "Editar";
    buttonEditar.className =
      " p-1 w-full bg-blue-700 text-white rounded-lg active:rounded-lg hover:bg-blue-950 hover:rounded-md mx-auto";
    const iEditar = document.createElement("i");
    iEditar.className =
      "bx bx-edit text-center";

    ///////////Boton de eliminar//////////
    const divEliminar = document.createElement("div");
    divEliminar.className = "w-6 my-4 mx-1 text-center";
    divEliminar.title = "Eliminar";
    const buttonEliminar = document.createElement("button");
    buttonEliminar.id = "btnEliminarPersonal";
    buttonEliminar.name = "Eliminar";
    buttonEliminar.className =
      "p-1 w-full bg-red-600 text-white rounded-lg active:rounded-lg hover:bg-red-800 hover:rounded-md mx-auto";
    const iEliminar = document.createElement("i");
    iEliminar.className =
      "bx bx-trash text-center";

    buttonEditar.appendChild(iEditar);
    divEditar.appendChild(buttonEditar);

    buttonEliminar.appendChild(iEliminar);
    divEliminar.appendChild(buttonEliminar);

    divBotones.appendChild(divEditar);
    divBotones.appendChild(divEliminar);

    tr.appendChild(divEscuela);
    tr.appendChild(divNombre);
    tr.appendChild(divCedula);
    tr.appendChild(divDepartamento);
    tr.appendChild(divIdac);
    tr.appendChild(divBotones);

    containPersonal2.appendChild(tr);
  });
}

// Llamar a la función para obtener los datos y generar el HTML
obtenerPersonal();

document.addEventListener("DOMContentLoaded", () => {
  const buscarCedulaInput = document.querySelector("#buscarCedula");

  buscarCedulaInput.addEventListener("input", () => {
    const valorIngresado = buscarCedulaInput.value;
    const soloNumeros = valorIngresado.replace(/\D/g, "");
    buscarCedulaInput.value = soloNumeros;
  });

  buscarCedulaInput.addEventListener("input", filtrarPorCedula);

  function filtrarPorCedula() {
    // Obtengo el valor del input de búsqueda
    const cedulaRequerida = buscarCedulaInput.value.trim().toLowerCase();

    // Buscar entre los elementos de la lista
    const todosElementos = document.querySelectorAll("#containPersonal > div");

    // Recorrido de elementos que se van a mostrar/ocultar dependiendo de la cédula buscada
    todosElementos.forEach((elemento) => {
      const cedula = elemento
        .querySelector("#list_cedula > h2")
        .textContent.toLowerCase();

      if (cedula.includes(cedulaRequerida)) {
        elemento.classList.remove("hidden");
        elemento.classList.add("opacity-100", "scale-100");
      } else {
        elemento.classList.add("hidden");
        elemento.classList.remove("opacity-100", "scale-100");
      }
    });
  }
});
