//todo menu / view
import { Aluguel } from './model/Aluguel';
import { Locadora } from './model/Locadora';
import Veiculo from './model/Veiculo';
import Cliente from "./model/Cliente";

Aluguel.inicializarContador();

// console.table(Locadora.listarClientes());

// Locadora.cadastrarCliente('Cliente Manual', '123.456.789-00', 'A');
// console.table(Locadora.listarClientes());
// Locadora.editarCliente('Cliente Manual modificado', '123.456.789-00', 'AB');

// console.table(Locadora.listarClientes());
// console.table(Locadora.listarVeiculos());
//Locadora.cadastrarVeiculo('moto', 'manual', '008', 2000, 'A58DGF', 35);
// console.table(Locadora.listarVeiculos());
// console.table(Locadora.listarVeiculosDisponiveis());
// console.table(Locadora.listarVeiculos());
// Locadora.editarVeiculo('carro', 'auto', 'editado', 1988, 'A58DGF', 55);
// console.table(Locadora.listarVeiculos());
// Locadora.excluirVeiculo('A58DGF');
// console.table(Locadora.listarVeiculos());
let veiculo: Veiculo | undefined = Locadora.recuperarVeiculo('BCD7890');
let cliente: Cliente | undefined = Locadora.recuperarCliente('123.456.789-00');
const dataInicial: Date = new Date(2023, 10, 23);
const dataFinal: Date = new Date(2023, 10, 29);
Locadora.cadastarAluguel(dataInicial,dataFinal, cliente!, veiculo!)
console.table(Locadora.listarAlugueis())