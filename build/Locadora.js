"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Locadora = void 0;
const Veiculo_1 = require("./Veiculo");
const Cliente_1 = require("./Cliente");
const Aluguel_1 = require("./Aluguel");
const fs = require("fs");
const path = require("path");
/**
 */
class Locadora {
    constructor(_nome, _cnpj, _veiculos, _alugueis, _veiculosDisponiveis, _alugueisAtivos) {
        this._nome = _nome;
        this._cnpj = _cnpj;
        this._veiculos = _veiculos;
        this._alugueis = _alugueis;
        this._veiculosDisponiveis = _veiculosDisponiveis;
        this._alugueisAtivos = _alugueisAtivos;
    }
    /**
     * Getter $nome
     * @return {string}
     */
    get $nome() {
        return this._nome;
    }
    /**
     * Setter $nome
     * @param {string} value
     */
    set $nome(value) {
        this._nome = value;
    }
    /**
     * Getter $cnpj
     * @return {string}
     */
    get $cnpj() {
        return this._cnpj;
    }
    /**
     * Setter $cnpj
     * @param {string} value
     */
    set $cnpj(value) {
        this._cnpj = value;
    }
    /**
     * Getter $veiculosDisponiveis
     * @return {Veiculo[]}
     */
    get $veiculosDisponiveis() {
        return this._veiculosDisponiveis;
    }
    /**
     * Setter $veiculosDisponiveis
     * @param {Veiculo[]} value
     */
    set $veiculosDisponiveis(value) {
        this._veiculosDisponiveis = value;
    }
    /**
     * Getter $alugueisAtivos
     * @return {Aluguel[]}
     */
    get $alugueisAtivos() {
        return this._alugueisAtivos;
    }
    /**
     * Setter $alugueisAtivos
     * @param {Aluguel[]} value
     */
    set $alugueisAtivos(value) {
        this._alugueisAtivos = value;
    }
    /**
     * Getter $alugueis
     * @return {Aluguel[]}
     */
    get $alugueis() {
        return this._alugueis;
    }
    /**
     * Setter $alugueis
     * @param {Aluguel[]} value
     */
    set $alugueis(value) {
        this._alugueis = value;
    }
    /**
     * Getter $veiculos
     * @return {Veiculo[]}
     */
    get $veiculos() {
        return this._veiculos;
    }
    /**
     * Setter $veiculos
     * @param {Veiculo[]} value
     */
    set $veiculos(value) {
        this._veiculos = value;
    }
    static cadastrarVeiculo(tipo, marca, modelo, ano, placa, valorDiaria, estaDisponivel) {
        const veiculoNovo = new Veiculo_1.default(tipo, marca, modelo, ano, placa, valorDiaria, estaDisponivel);
        const veiculos = Locadora.listarVeiculos();
        /**
         * verifica se existe a placa cadastrada
         */
        const placaExiste = veiculos.some((veiculo) => veiculos.placa === placa);
        if (placaExiste) {
            console.log("Placa já cadastrada. Não é possível adicionar o veiculo.");
            return;
        }
        else {
            veiculos.push(veiculoNovo);
            try {
                const filePath = path.join(__dirname, "..", "data", "veiculos.json");
                fs.writeFileSync(filePath, JSON.stringify(veiculos, null, 2));
            }
            catch (error) {
                console.error("Erro ao ler o arquivo JSON:", error);
            }
        }
    }
    static editarVeiculo(tipo, marca, modelo, ano, placa, valorDiaria) {
        const veiculos = Locadora.listarVeiculos();
        /**
         * verifica se existe a placa cadastrada
         */
        const veiculoExiste = veiculos.find((veiculo) => veiculo.placa === placa);
        if (veiculoExiste) {
            veiculoExiste.tipo = tipo;
            veiculoExiste.marca = marca;
            veiculoExiste.modelo = modelo;
            veiculoExiste.ano = ano;
            veiculoExiste.valorDiaria = valorDiaria;
            try {
                const filePath = path.join(__dirname, "..", "data", "veiculos.json");
                fs.writeFileSync(filePath, JSON.stringify(veiculos, null, 2));
            }
            catch (error) {
                console.error("Erro ao ler o arquivo JSON:", error);
            }
        }
        else {
            console.log(`Veiculo com placa ${placa} não foi encontrado.`);
        }
    }
    static recuperarVeiculo(placa) {
        const veiculos = Locadora.listarVeiculos();
        const veiculoEncontrado = veiculos.find((veiculo) => veiculo.placa === placa);
        if (veiculoEncontrado) {
            return veiculoEncontrado;
        }
        else {
            console.log(`Veiculo com placa ${placa} não foi encontrado.`);
            return null;
        }
    }
    static excluirVeiculo(placa) {
        const veiculos = Locadora.listarVeiculos();
        /**
         * verifica se existe a placa cadastrada
         */
        const index = veiculos.findIndex((veiculo) => veiculo.placa === placa);
        if (index !== -1) {
            veiculos.splice(index, 1);
            try {
                const filePath = path.join(__dirname, "..", "data", "veiculos.json");
                fs.writeFileSync(filePath, JSON.stringify(veiculos, null, 2));
            }
            catch (error) {
                console.error("Erro ao ler o arquivo JSON:", error);
            }
        }
        else {
            console.log(`Veiculo com placa ${placa} não foi encontrado.`);
        }
    }
    /**
     * Metodo estático responsável por listar os veiculos da locadora.
     * @returns
     */
    static listarVeiculos() {
        try {
            const filePath = path.join(__dirname, "..", "data", "veiculos.json");
            const content = fs.readFileSync(filePath, "utf-8");
            const clientes = JSON.parse(content);
            return clientes;
        }
        catch (error) {
            console.error("Erro ao ler o arquivo JSON:", error);
            return [];
        }
    }
    static cadastrarAluguel(dataInicio, dataFim, cpfCliente, placaVeiculo) {
        const cliente = Cliente_1.default.encontrarClientePorCPF(cpfCliente);
        const veiculo = Locadora.recuperarVeiculo(placaVeiculo);
        const alugueis = Aluguel_1.default.listarAlugueis();
        const alugueisAtivos = Aluguel_1.default.listarAlugueisAtivos();
        const carroAtivo = alugueisAtivos.some((aluguel) => aluguel._veiculo.placa === placaVeiculo);
        const clienteAtivo = alugueisAtivos.some((aluguel) => aluguel._cliente.cpf === cpfCliente);
        // Verifica se o cliente e o veículo foram encontrados
        if (!cliente || !veiculo) {
            console.log("Cliente ou veículo não encontrado.");
            return;
        }
        //Verificando se o cliente já possui aluguel ativo e se o carro já está alugado
        if (clienteAtivo) {
            console.log("O cliente já possui um aluguel ativo. Não é possível adicionar o aluguel.");
            return;
        }
        else if (carroAtivo) {
            console.log("O carro já possui um aluguel ativo. Não é possível adicionar o aluguel.");
            return;
        }
        //Lógica para adicionar aluguel na lista de alugueis com base no tipo de veiculo e  carteira do cliente
        if ((cliente.tipoDeCarta === 'A' && veiculo.tipo === 'A') ||
            (cliente.tipoDeCarta === 'B' && veiculo.tipo === 'B')) {
            const novoAluguel = new Aluguel_1.default(dataInicio, dataFim, cliente, veiculo);
            alugueis.push(novoAluguel);
            try {
                const filePath = path.join(__dirname, "..", "data", "alugueis.json");
                fs.writeFileSync(filePath, JSON.stringify(alugueis, null, 2));
            }
            catch (error) {
                console.error("Erro ao escrever no arquivo JSON:", error);
            }
            novoAluguel.atualizarStatus();
        }
        else {
            console.log("A carteira do cliente não é compatível com este tipo de veículo.");
        }
    }
    editarAluguel(dataInicio, dataFim, cliente, veiculo) {
        //todo id unico
    }
}
exports.Locadora = Locadora;
