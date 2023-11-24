// main.ts

import * as readlineSync from 'readline-sync';
import { Cliente } from './Cliente';
import Veiculo from './Veiculo';

const veiculos: Veiculo[] = []; // Array de veículos inicializado

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
            const novaPlaca = readlineSync.question('Digite a placa do veículo: ');
            const novoVeiculo = new Veiculo(novaPlaca);
            novoVeiculo.cadastrarVeiculo(veiculos, novaPlaca);
            break;

        case 2:
            const tipoVeiculoAluguel = readlineSync.question('Digite o tipo do veículo a alugar (carro/moto): ');
            const clienteAluguel = new Cliente( );
            novoVeiculo.alugarVeiculo(clienteAluguel, tipoVeiculoAluguel);
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