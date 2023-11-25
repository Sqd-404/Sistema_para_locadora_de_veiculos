"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
class Aluguel {
    constructor(_dataInicio, _dataFim, _cliente, _veiculo) {
        this._dataInicio = _dataInicio;
        this._dataFim = _dataFim;
        this._cliente = _cliente;
        this._veiculo = _veiculo;
        Aluguel.inicializarContador();
        this._id = Aluguel.contador;
        this._valorAluguel = this.calcularValorAlguel();
        this._atualizarStatus();
    }
    //==> Getters e Setters <==
    get id() {
        return this._id;
    }
    set id(value) {
        this._id = value;
    }
    get dataInicio() {
        return this._dataInicio;
    }
    set dataInicio(value) {
        this._dataInicio = value;
    }
    get estaAtivo() {
        return this._estaAtivo;
    }
    set estaAtivo(value) {
        this._estaAtivo = value;
    }
    get veiculo() {
        return this._veiculo;
    }
    set veiculo(value) {
        this._veiculo = value;
    }
    get cliente() {
        return this._cliente;
    }
    set cliente(value) {
        this._cliente = value;
    }
    get valorAluguel() {
        return this._valorAluguel;
    }
    set valorAluguel(value) {
        this._valorAluguel = value;
    }
    get dataFim() {
        return this._dataFim;
    }
    set dataFim(value) {
        this._dataFim = value;
    }
    //==> Métodos <==
    calcularValorAlguel() {
        const diasAlugados = Math.ceil((this._dataFim.getTime() - this._dataInicio.getTime()) /
            (1000 * 3600 * 24)); // Calcula o número de dias de aluguel
        let resultado = this._veiculo.valorDiaria * diasAlugados;
        if (this._veiculo.tipo === "Carro") {
            resultado += resultado * 0.1; // Acréscimo de 10% para carros
        }
        else if (this._veiculo.tipo === "Moto") {
            resultado += resultado * 0.05; // Acréscimo de 5% para motos
        }
        return resultado;
    }
    _atualizarStatus() {
        const hoje = new Date();
        if (hoje >= this.dataInicio && hoje <= this._dataFim) {
            this._estaAtivo = true;
        }
        else {
            this._estaAtivo = false;
        }
        const filePath = path.join(__dirname, "..", "data", "veiculos.json");
        try {
            const content = fs.readFileSync(filePath, "utf-8");
            const veiculos = JSON.parse(content);
            const index = veiculos.findIndex((veiculo) => veiculo.placa === this._veiculo.placa);
            if (index !== -1) {
                veiculos[index].estaDisponivel = !this._estaAtivo; // Define disponibilidade baseado no status do aluguel
                fs.writeFileSync(filePath, JSON.stringify(veiculos)); // Persiste a atualização no arquivo JSON
            }
            else {
                console.log(`Veículo com placa ${this._veiculo.placa} não foi encontrado.`);
            }
        }
        catch (error) {
            console.error("Erro ao ler o arquivo JSON:", error);
        }
    }
    static inicializarContador() {
        try {
            const filePath = path.join(__dirname, "..", "data", "alugueis.json");
            const content = fs.readFileSync(filePath, "utf-8");
            const alugueis = JSON.parse(content);
            let maiorId = 0;
            for (const aluguel of alugueis) {
                if (aluguel.id > maiorId) {
                    maiorId = aluguel.id;
                }
            }
            Aluguel.contador = maiorId + 1; // Configura o contador com o maior ID encontrado + 1
        }
        catch (error) {
            console.error("Erro ao ler o arquivo JSON de aluguéis:", error);
            // Definir o contador com valor padrão em caso de erro na leitura do arquivo
            Aluguel.contador = 1;
        }
    }
    static listarAlugueis() {
        try {
            const filePath = path.join(__dirname, "..", "data", "alugueis.json");
            const content = fs.readFileSync(filePath, "utf-8");
            const alugueis = JSON.parse(content);
            return alugueis;
        }
        catch (error) {
            console.error("Erro ao ler o arquivo JSON:", error);
            return [];
        }
    }
    static listarAlugueisAtivos() {
        try {
            const filePath = path.join(__dirname, "..", "data", "alugueis.json");
            const content = fs.readFileSync(filePath, "utf-8");
            const alugueis = JSON.parse(content);
            const alugueisFiltrados = alugueis.filter((aluguel) => aluguel._estaAtivo === true);
            return alugueisFiltrados;
        }
        catch (error) {
            console.error("Erro ao ler o arquivo JSON:", error);
            return [];
        }
    }
}
Aluguel.contador = 0;
exports.default = Aluguel;
