import Aluguel from "./model/Aluguel";
import { Locadora } from "./model/Locadora";
import Veiculo from "./model/Veiculo";
import Cliente from "./model/Cliente";
import * as readlineSync from "readline-sync";
import { read } from "fs";

// const cliente : Cliente = Cliente.encontrarClientePorCPF("666.777.888-999");
// console.log(cliente);
// console.log(cliente.tipoDeCarta);
// const veiculo : Veiculo= Locadora.recuperarVeiculo("sss-888");
// console.log(veiculo);
// console.log(veiculo.estaDisponivel);

// Veiculo.devolverVeiculo('666.777.888-999');
Aluguel.listarAlugueis();
Aluguel.listarAlugueisAtivos(true);