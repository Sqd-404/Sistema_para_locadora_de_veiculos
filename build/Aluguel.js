"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Aluguel {
    constructor(_dataInicio, _dataFim, _valorAluguel, _cliente, _veiculo, _estaAtivo) {
        this._dataInicio = _dataInicio;
        this._dataFim = _dataFim;
        this._valorAluguel = _valorAluguel;
        this._cliente = _cliente;
        this._veiculo = _veiculo;
        this._estaAtivo = _estaAtivo;
    }
    //==> Getters e Setters <==
    get dataInicio() {
        return this._dataInicio;
    }
    set dataInicio(valor) {
        this._dataInicio = valor;
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
        const diasAlugados = Math.ceil((this._dataFim.getTime() - this._dataInicio.getTime()) / (1000 * 3600 * 24));
        let acrescimo = 0;
        if (this._veiculo.tipo === 'Carro') {
            acrescimo = 0.1;
        }
        else if (this._veiculo.tipo === 'Moto') {
            acrescimo = 0.5;
        }
        const resultado = this._veiculo.valorDiaria * diasAlugados * (1 + acrescimo);
        return resultado;
    }
    atualizarestaAtivo() {
        const hoje = new Date();
        if (hoje >= this.dataInicio && hoje <= this._dataFim) {
            this._estaAtivo = true;
        }
        else {
            this._estaAtivo = false;
        }
    }
}
exports.default = Aluguel;
