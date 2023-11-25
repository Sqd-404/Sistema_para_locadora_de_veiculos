"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Veiculo {
    constructor(tipo, marca, modelo, ano, placa, valorDiaria, estaDisponivel) {
        this.tipo = tipo;
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.placa = placa;
        this.valorDiaria = valorDiaria;
        this.estaDisponivel = false;
    }
    cadastrarVeiculo(veiculos, tipo, marca, modelo, ano, placa, valorDiaria, estaDisponivel) {
        if (!this.veiculoExistente(veiculos, placa)) {
            const novoVeiculo = new Veiculo(tipo, marca, modelo, ano, placa, valorDiaria, estaDisponivel);
            veiculos.push(novoVeiculo);
            console.log('Veículo cadastrado com sucesso!');
        }
        else {
            console.log('Já existe um veículo com essa placa cadastrado.');
        }
    }
    alugarVeiculo(cliente, tipoVeiculo) {
        if (cliente.$veiculoAlugado) {
            console.log('Você já possui um veículo alugado.');
            return;
        }
        if (!this.alugado && ((tipoVeiculo === 'carro' && cliente._tipoDeCarteira === 'B') || (tipoVeiculo === 'moto' && cliente.$tipoDeCarteira === 'A'))) {
            this.alugado = true;
            cliente.$veiculoAlugado = this;
            console.log('Veículo alugado com sucesso!');
        }
        else {
            console.log('Não é possível alugar o veículo.');
        }
    }
    devolverVeiculo(cliente) {
        if (cliente.$veiculoAlugado === this) {
            this.alugado = false;
            cliente.$veiculoAlugado = null;
            console.log('Veículo devolvido com sucesso!');
        }
        else {
            console.log('Este veículo não está alugado por este cliente.');
        }
    }
    static listarVeiculosDisponiveis(veiculos) {
        const veiculosDisponiveis = veiculos.filter((veiculo) => !veiculo.alugado);
        console.log('Veículos disponíveis:');
        veiculosDisponiveis.forEach((veiculo) => console.log(veiculo.placa));
    }
    static listarVeiculosAlugados(veiculos) {
        const veiculosAlugados = veiculos.filter((veiculo) => veiculo.alugado);
        console.log('Veículos alugados:');
        veiculosAlugados.forEach((veiculo) => console.log(veiculo.placa));
    }
    veiculoExistente(veiculos, placa) {
        return veiculos.some((veiculo) => veiculo.placa === placa);
    }
}
exports.default = Veiculo;
