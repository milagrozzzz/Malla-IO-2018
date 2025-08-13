const cursos = [
  // === PRIMER AÑO ===
  // Ciclo I
  { id: 1, nombre: "Economía General", ciclo: 1, prereqs: [] },
  { id: 2, nombre: "Género y Sociedad", ciclo: 1, prereqs: [] },
  { id: 3, nombre: "Lenguaje", ciclo: 1, prereqs: [] },
  { id: 4, nombre: "Métodos de Estudio Universitario", ciclo: 1, prereqs: [] },
  { id: 5, nombre: "Gestión Personal", ciclo: 1, prereqs: [] },
  { id: 6, nombre: "Cálculo I", ciclo: 1, prereqs: [] },
  { id: 7, nombre: "Matemática Básica", ciclo: 1, prereqs: [] },
  { id: 8, nombre: "Biología", ciclo: 1, prereqs: [] },

  // Ciclo II
  { id: 9, nombre: "Fundamentos de Investigación Científica", ciclo: 2, prereqs: [] },
  { id: 10, nombre: "Medio Ambiente y Desarrollo Sostenible", ciclo: 2, prereqs: [8] },
  { id: 11, nombre: "Realidad Nacional y Mundial", ciclo: 2, prereqs: [] },
  { id: 12, nombre: "Cálculo II", ciclo: 2, prereqs: [6] },
  { id: 13, nombre: "Química Inorgánica y Orgánica", ciclo: 2, prereqs: [] },
  { id: 14, nombre: "Física General", ciclo: 2, prereqs: [] },

  // === SEGUNDO AÑO ===
  // Ciclo III
  { id: 15, nombre: "Cálculo III", ciclo: 3, prereqs: [12] },
  { id: 16, nombre: "Álgebra Lineal", ciclo: 3, prereqs: [7] },
  { id: 17, nombre: "Estadística y Probabilidad", ciclo: 3, prereqs: [12, 7] },
  { id: 18, nombre: "Economía", ciclo: 3, prereqs: [10, 11] },
  { id: 19, nombre: "Modelos Determinísticos en IO I", ciclo: 3, prereqs: [6] },

  // Ciclo IV
  { id: 20, nombre: "Programación de Computadoras", ciclo: 4, prereqs: [19] },
  { id: 21, nombre: "Inferencia Estadística", ciclo: 4, prereqs: [17] },
  { id: 22, nombre: "Introducción a las Ecuaciones Diferenciales Ordinarias", ciclo: 4, prereqs: [16, 15] },
  { id: 23, nombre: "Programación Lineal y Entera", ciclo: 4, prereqs: [16] },

  // === TERCER AÑO ===
  // Ciclo V
  { id: 24, nombre: "Teoría, Análisis y Diseño de Sistemas", ciclo: 5, prereqs: [19] },
  { id: 25, nombre: "Modelos Determinísticos en IO II", ciclo: 5, prereqs: [19, 23] },
  { id: 26, nombre: "Matemática Financiera", ciclo: 5, prereqs: [16, 18, 23] },
  { id: 27, nombre: "Métodos Numéricos", ciclo: 5, prereqs: [12, 20, 16] },
  { id: 28, nombre: "Práctica Pre Profesional Módulo I", ciclo: 5, prereqs: [20, 23, 19] },

  // Ciclo VI
  { id: 29, nombre: "Modelos Probabilísticos en IO I", ciclo: 6, prereqs: [19, 17] },
  { id: 30, nombre: "Procesos Estocásticos", ciclo: 6, prereqs: [17, 22] },
  { id: 31, nombre: "Gestión de Sistemas Organizacionales", ciclo: 6, prereqs: [24] },
  { id: 32, nombre: "Seminario de Investigación I", ciclo: 6, prereqs: [25] },

  // === CUARTO AÑO ===
  // Ciclo VII
  { id: 33, nombre: "Modelos Probabilísticos en IO II", ciclo: 7, prereqs: [29] },
  { id: 34, nombre: "Simulación de Sistemas", ciclo: 7, prereqs: [30, 21, 29] },
  { id: 35, nombre: "Teoría de Grafos", ciclo: 7, prereqs: [23] },

  // Ciclo VIII
  { id: 36, nombre: "Heurísticas y Metaheurísticas", ciclo: 8, prereqs: [20, 35] },
  { id: 37, nombre: "Teoría de Decisiones", ciclo: 8, prereqs: [26, 21] },
  { id: 38, nombre: "Programación No Lineal y Dinámica", ciclo: 8, prereqs: [15, 23, 27] },
  { id: 39, nombre: "Seminario de Investigación II", ciclo: 8, prereqs: [32] },
  { id: 40, nombre: "Práctica Pre Profesional Módulo II", ciclo: 8, prereqs: [34, 33, 28, 35] },

  // === QUINTO AÑO ===
  // Ciclo IX
  { id: 41, nombre: "Modelos Econométricos", ciclo: 9, prereqs: [21, 26, 18] },
  { id: 42, nombre: "Seminario de Tesis de IO I", ciclo: 9, prereqs: [34, 39, 35, 37, 38] },
  { id: 43, nombre: "Estudio de Casos en IO", ciclo: 9, prereqs: [36, 35, 38, 37, 34] },
  { id: 44, nombre: "Formulación y Gestión de Proyectos", ciclo: 9, prereqs: [31, 26] },

  // Ciclo X
  { id: 45, nombre: "Series Cronológicas", ciclo: 10, prereqs: [41] },
  { id: 46, nombre: "Seminario de Tesis II", ciclo: 10, prereqs: [42] },
  { id: 47, nombre: "Práctica Pre Profesional Módulo III", ciclo: 10, prereqs: [40] },
];

let aprobados = new Set(JSON.parse(localStorage.getItem("aprobados") || "[]"));

function estadoCurso(curso) {
  if (aprobados.has(curso.id)) return "aprobado";
  const cumple = curso.prereqs.every(id => aprobados.has(id));
  return cumple ? "desbloqueado" : "bloqueado";
}

function render() {
  const contenedor = document.getElementById("columns");
  contenedor.innerHTML = "";

  const maxCiclo = Math.max(...cursos.map(c => c.ciclo));
  for (let ciclo = 1; ciclo <= maxCiclo; ciclo++) {
    const col = document.createElement("div");
    col.classList.add("col");
    const h2 = document.createElement("h2");
    h2.textContent = "Ciclo " + ciclo;
    col.appendChild(h2);

    cursos.filter(c => c.ciclo === ciclo).forEach(curso => {
      const div = document.createElement("div");
      const estado = estadoCurso(curso);
      div.classList.add("curso", estado);
      div.textContent = curso.nombre;

      if (estado !== "bloqueado") {
        div.addEventListener("click", () => {
          if (aprobados.has(curso.id)) {
            aprobados.delete(curso.id);
          } else {
            aprobados.add(curso.id);
          }
          localStorage.setItem("aprobados", JSON.stringify([...aprobados]));
          render();
        });
      }

      col.appendChild(div);
    });

    contenedor.appendChild(col);
  }
}

document.getElementById("btnReiniciar").addEventListener("click", () => {
  if (confirm("¿Seguro que deseas reiniciar tu progreso?")) {
    aprobados.clear();
    localStorage.removeItem("aprobados");
    render();
  }
});

render();
