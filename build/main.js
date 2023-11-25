//todo menu / view
import Aluguel from './model/Aluguel';
import { Locadora } from './model/Locadora';
import Veiculo from './model/Veiculo';
import Cliente from "./model/Cliente";
import * as readlineSync from 'readline-sync';
import { read } from 'fs';

Aluguel.inicializarContador();
Cliente.inicializarContador();

const veiculos: Veiculo[] = [];

function exibirMenu() {
    console.log('======= MENU =======');
    console.log('1. Cadastrar veículo');
    console.log('2. Alugar veículo');
    console.log('3. Devolver veículo');
    console.log('4. Listar veículos disponíveis');
    console.log('5. Listar veículos alugados');
    console.log('6. Sair');
    console.log('====================');
}

let running = true;
while (running) {
    exibirMenu();
    const opcao = parseInt(readlineSync.question('Escolha uma opção: '));

    switch (opcao) {
        case 1:
            let tipo = readlineSync.question('Digite o tipo do novo veiculo (carro/moto): ');
            let marca = readlineSync.question('Digite a marca do novo veiculo: ');
            let modelo = readlineSync.question('Digite o modelo do novo veiculo: ');
            let ano = parseInt(readlineSync.question('Digite o ano do novo veiculo: '));
            let placa = readlineSync.question('Digite a placa do novo veiculo: ');
            let diaria = parseInt(readlineSync.question('Digite o valor da diaria para o novo veiculo: '));
            let disponivel = readlineSync.question('Este veiculo estara disponivel para aluguel? S/N: ');
            let estaDisponivel = disponivel === 'S' ? true : false
            const novoVeiculo = new Veiculo(tipo, marca, modelo, ano, placa, diaria, estaDisponivel);
            novoVeiculo.cadastrarVeiculo(veiculos, tipo, marca, modelo, ano, placa, diaria, estaDisponivel);
            break;

        case 2:
            tipo = readlineSync.question('Digite o tipo do novo veiculo (carro/moto): ');
            marca = readlineSync.question('Digite a marca do novo veiculo: ');
            modelo = readlineSync.question('Digite o modelo do novo veiculo: ');
            ano = parseInt(readlineSync.question('Digite o ano do novo veiculo: '));
            placa = readlineSync.question('Digite a placa do novo veiculo: ');
            diaria = parseInt(readlineSync.question('Digite o valor da diaria para o novo veiculo: '));
            disponivel = readlineSync.question('Este veiculo estara disponivel para aluguel? S/N: ');
            estaDisponivel = disponivel === 'S' ? true : false
            let nome = readlineSync.question('Digite o nome do cliente: ');
            let cpf = readlineSync.question('Digite o CPF do cliente: ');
            let carta = readlineSync.question('Digite o tipo da carteira do cliente (A/B): ');
            let inicio = readlineSync.question('Digite a data de inicio do aluguel: ');
            let fim = readlineSync.question('Digite a data de devolucao: ');
            const clienteAluguel = new Cliente(nome, cpf, carta);
            const veiculoAluguel = new Veiculo(tipo, marca, modelo, ano, placa, diaria, estaDisponivel);
0           novoVeiculo.cadastarAluguel(inicio, fim, clienteAluguel, veiculoAluguel);
            break;

        case 3:
            const clienteDevolucao = new Cliente( );
            novoVeiculo.devolverVeiculo(clienteDevolucao);
            break;

        case 4:
            Veiculo.listarVeiculosDisponiveis(veiculos);
            break;

        case 5:
            Veiculo.listarVeiculosAlugados(veiculos);
            break;

        case 6:
            running = false;
            break;

        default:
            console.log('Opção inválida. Tente novamente.');
    }
}