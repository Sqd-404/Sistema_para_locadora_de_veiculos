import Cliente from "./Cliente";
import Veiculo from "./Veiculo";

class Aluguel {

    constructor(
        private _id: number,
        private _dataInicio: Date,
        private _dataFim: Date,
        private _valorAluguel: Number,
        private _cliente: Cliente,
        private _veiculo: Veiculo,
        private _estaAtivo: boolean
    ) { }

    //==> Getters e Setters <==

    public get id() : number {
        return this._id;
    }
    public set id(id : number) {
        this._id = id;
    }

    public get dataInicio() : Date {
        return this._dataInicio
    }
    public set dataInicio(valor : Date) {
        this._dataInicio = valor;
    }

    public get estaAtivo(): boolean {
        return this._estaAtivo;
    }
    public set estaAtivo(value: boolean) {
        this._estaAtivo = value;
    }

    public get veiculo(): Veiculo {
        return this._veiculo;
    }
    public set veiculo(value: Veiculo) {
        this._veiculo = value;
    }

    public get cliente(): Cliente {
        return this._cliente;
    }
    public set cliente(value: Cliente) {
        this._cliente = value;
    }

    public get valorAluguel(): Number {
        return this._valorAluguel;
    }
    public set valorAluguel(value: Number) {
        this._valorAluguel = value;
    }

    public get dataFim(): Date {
        return this._dataFim;
    }
    public set dataFim(value: Date) {
        this._dataFim = value;
    }
    
    //==> Métodos <==

    calcularValorAlguel() : Number {
        const diasAlugados =  Math.ceil((this._dataFim.getTime() - this._dataInicio.getTime()) / (1000 * 3600 * 24)); 

        let acrescimo = 0;

        if(this._veiculo.tipo === 'Carro') {
            acrescimo = 0.1;
        } else if(this._veiculo.tipo === 'Moto') {
            acrescimo = 0.05;
        }

        const resultado = this._veiculo.valorDiaria * diasAlugados * (1 + acrescimo);
        return resultado;
    }
    
    atualizarStatus() : void {
        const hoje = new Date();

        if(hoje >= this.dataInicio && hoje <= this._dataFim) {
            this._estaAtivo = true
        } else {
            this._estaAtivo = false
        }
    }
}

export default Aluguel;
