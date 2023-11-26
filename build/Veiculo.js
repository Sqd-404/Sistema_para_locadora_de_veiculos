"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Aluguel_1 = require("./Aluguel");
const fs = require("fs");
const path = require("path");
class Veiculo {
    constructor(tipo, marca, modelo, ano, placa, valorDiaria, estaDisponivel) {
        this.tipo = tipo;
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.placa = placa;
        this.valorDiaria = valorDiaria;
        this.estaDisponivel = estaDisponivel;
    }
    cadastrarVeiculo(veiculos, tipo, marca, modelo, ano, placa, valorDiaria, estaDisponivel) {
        if (!this.veiculoExistente(veiculos, placa)) {
            const novoVeiculo = new Veiculo(tipo, marca, modelo, ano, placa, valorDiaria, estaDisponivel);
            try {
                const filePath = path.join(__dirname, "..", "data", "veiculos.json");
                const content = fs.readFileSync(filePath, 'utf-8');
                const veiculos = JSON.parse(content);
                veiculos.push(novoVeiculo);
                fs.writeFileSync(filePath, JSON.stringify(veiculos, null, 2));
            }
            catch (error) {
                console.error("Erro ao ler o arquivo JSON:", error);
            }
            console.log('\nVeículo cadastrado com sucesso!');
        }
        else {
            console.log('\nJá existe um veículo com essa placa cadastrado.');
        }
    }
    devolverVeiculo(cpfCliente) {
        const aluguelAtivo = Aluguel_1.default.listarAlugueisAtivos().find((aluguel) => aluguel._cliente.cpf === cpfCliente);
        if (aluguelAtivo) {
            aluguelAtivo.atualizarStatus();
            if (aluguelAtivo._estaAtivo) {
                console.log('Veículo devolvido dentro do prazo.');
            }
            else {
                console.log('Veículo devolvido após a data de devolução.');
            }
            console.log('Veículo devolvido com sucesso.');
        }
        else {
            console.log('Não há aluguel ativo para este cliente.');
        }
    }
    static listarVeiculosAlugados(veiculos) {
        try {
            const filePath = path.join(__dirname, "..", "data", "veiculos.json");
            const content = fs.readFileSync(filePath, "utf-8");
            const veiculos = JSON.parse(content);
            const veiculosFiltrados = veiculos.filter((veiculo) => veiculo.estaDisponivel === false);
            console.log('\nVeículos alugados:');
            veiculosFiltrados.forEach((veiculo) => console.log(veiculo));
        }
        catch (error) {
            console.error("Erro ao ler o arquivo JSON:", error);
            return [];
        }
    }
    static listarVeiculosDisponiveis(veiculos) {
        try {
            const filePath = path.join(__dirname, "..", "data", "veiculos.json");
            const content = fs.readFileSync(filePath, "utf-8");
            const veiculos = JSON.parse(content);
            const veiculosFiltrados = veiculos.filter((veiculo) => veiculo.estaDisponivel === true);
            console.log('\nVeículos disponíveis:');
            veiculosFiltrados.forEach((veiculo) => console.log(veiculo));
        }
        catch (error) {
            console.error("Erro ao ler o arquivo JSON:", error);
            return [];
        }
    }
    veiculoExistente(veiculos, placa) {
        return veiculos.some((veiculo) => veiculo.placa === placa);
    }
}
exports.default = Veiculo;
