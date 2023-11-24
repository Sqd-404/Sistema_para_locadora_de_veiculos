import Cliente from "./Cliente";
import Veiculo from "./Veiculo";

const fs = require('fs');
const path = require('path');


export class Aluguel {
    
    private static contador: number = 0

    constructor(
        private _dataInicio: Date,
        private _dataFim: Date,
        private _valorAluguel: number,
        private _cliente: Cliente,
        private _veiculo: Veiculo,
        private _estaAtivo: boolean,
        private _id: number,
    ) {
        this._id = Aluguel.contador;
        Aluguel.contador++;
        this.calcularValorAlguel()
        this._atualizarStatus()
     }

    //==> Getters e Setters <==

    public get id(): number {
        return this._id;
    }
    public set id(value: number) {
        this._id = value;
    }

    public get dataInicio() : Date {
        return this._dataInicio
    }
    public set dataInicio(value : Date) {
        this._dataInicio = value;
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

    public get valorAluguel(): number {
        return this._valorAluguel;
    }
    public set valorAluguel(value: number) {
        this._valorAluguel = value;
    }

    public get dataFim(): Date {
        return this._dataFim;
    }
    public set dataFim(value: Date) {
        this._dataFim = value;
    }
    
    //==> Métodos <==

    calcularValorAlguel() : number {
        const diasAlugados =  Math.ceil((this._dataFim.getTime() - this._dataInicio.getTime()) / (1000 * 3600 * 24)); // Calcula o número de dias de aluguel

        let resultado = this._veiculo.valorDiaria * diasAlugados;

        if(this._veiculo.tipo === 'Carro') {
            resultado += resultado * 0.1; // Acréscimo de 10% para carros
        } else if(this._veiculo.tipo === 'Moto') {
            resultado += resultado * 0.05; // Acréscimo de 5% para motos
        }

        return resultado;
    }
    
    private _atualizarStatus() : void {
        const hoje = new Date();

        if(hoje >= this.dataInicio && hoje <= this._dataFim) {
            this._estaAtivo = true
        } else {
            this._estaAtivo = false
        }

        const filePath = path.join(__dirname, "..", "data", "veiculos.json");
        try {
            const content = fs.readFileSync(filePath, "utf-8");
            const veiculos = JSON.parse(content);

            const index = veiculos.findIndex(
                (veiculo: Veiculo) => veiculo.placa === this._veiculo.placa
            );

            if(index !== -1) {
                veiculos[index].estaDisponivel = !this._estaAtivo; // Define disponibilidade baseado no status do aluguel

                fs.writeFileSync(filePath, JSON.stringify(veiculos, null, 2)); // Persiste a atualização no arquivo JSON
            } else {
                console.log(
                    `Veículo com placa ${this._veiculo.placa} não foi encontrado.`
                );
            }
        } catch (error) {
            console.error("Erro ao ler o arquivo JSON:", error);
        } 
    }

    static inicializarContador() {
        try {
            const filePath = path.join(__dirname, '..', 'data', 'alugueis.json');
            const content = fs.readFileSync(filePath, 'utf-8');
            const alugueis = JSON.parse(content);

            let maiorId = 0;
            for (const aluguel of alugueis) {
                if (aluguel.id > maiorId) {
                    maiorId = aluguel.id;
                }
            }

            Aluguel.contador = maiorId + 1; // Configura o contador com o maior ID encontrado + 1
        } catch (error) {
            console.error('Erro ao ler o arquivo JSON de aluguéis:', error);
            // Definir o contador com valor padrão em caso de erro na leitura do arquivo
            Aluguel.contador = 1;
        }
    }
}

export default Aluguel;
