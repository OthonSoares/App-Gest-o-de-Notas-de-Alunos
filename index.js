const readline = require('readline-sync');

class Aluno {
  constructor(nome) {
    this.nome = nome;
    this.materias = [];
  }

  adicionarMateria(materia) {
    this.materias.push(materia);
  }

  calcularMedia() {
    this.materias.forEach(materia => {
      materia.calcularMedia();
    });
  }

  exibirResultados() {
    console.log(`Resultados para o aluno: ${this.nome}`);
    this.materias.forEach(materia => {
      materia.exibirResultados();
    });
  }
}

class Materia {
  constructor(nome) {
    this.nome = nome;
    this.notas = [];
    this.faltas = 0;
    this.media = 0;
    this.reprovadoPorFaltas = false;
  }

  adicionarNota(nota) {
    this.notas.push(nota);
  }

  calcularMedia() {
    const somaNotas = this.notas.reduce((acc, nota) => acc + nota, 0);
    this.media = somaNotas / this.notas.length;
  }

  adicionarFaltas(faltas) {
    this.faltas = faltas;
    this.reprovadoPorFaltas = faltas > 5;
  }

  exibirResultados() {
    console.log(`Matéria: ${this.nome}`);
    console.log(`Média: ${this.media.toFixed(2)}`);
    console.log(`Faltas: ${this.faltas}`);
    console.log(`Status: ${this.reprovadoPorFaltas ? 'Reprovado por faltas' : this.media >= 7 ? 'Aprovado' : 'Reprovado'}`);
  }
}

// Função para criar alunos predefinidos
function criarAlunosPredefinidos() {
  const nomesAlunos = ['Ana', 'Bruno', 'Carlos'];
  return nomesAlunos.map(nome => new Aluno(nome));
}

// Função principal
function main() {
  const alunos = criarAlunosPredefinidos();

  alunos.forEach(aluno => {
    console.log(`Configurando dados para o aluno: ${aluno.nome}`);
    let continuar = true;
    while (continuar) {
      const nomeMateria = readline.question('Digite o nome da matéria: ');
      const materia = new Materia(nomeMateria);

      for (let i = 0; i < 3; i++) {
        const nota = parseFloat(readline.question(`Digite a nota ${i + 1} para ${nomeMateria}: `));
        materia.adicionarNota(nota);
      }

      const faltas = parseInt(readline.question(`Digite o número de faltas para ${nomeMateria}: `), 10);
      materia.adicionarFaltas(faltas);

      aluno.adicionarMateria(materia);

      continuar = readline.keyInYNStrict('Deseja adicionar outra matéria? ');
    }

    aluno.calcularMedia();
    aluno.exibirResultados();
  });
}

main();

