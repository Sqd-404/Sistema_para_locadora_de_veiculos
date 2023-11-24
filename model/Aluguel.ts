import Cliente from "./Cliente";
import Veiculo from "./Veiculo";

const fs = require("fs");
const path = require("path");

export class Aluguel {
	private _estaAtivo: boolean = true;
    private _valorAluguel: Number;
    private _id: number;
    private static contador: number = 0;

	constructor(
		private _dataInicio: Date,
		private _dataFim: Date,
		private _cliente: Cliente,
		private _veiculo: Veiculo
	) {
        this._atualizarStatus();
        this._id= Aluguel.contador;
        Aluguel.contador++;
        this._atualizarStatus();
	}

	//==> Getters e Setters <==

	public get id(): number {
		return this._id;
	}
	public set id(id: number) {
		this._id = id;
	}

	public get dataInicio(): Date {
		return this._dataInicio;
	}
	public set dataInicio(valor: Date) {
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

	calcularValorAlguel(): Number {
		const diasAlugados = Math.ceil(
			(this._dataFim.getTime() - this._dataInicio.getTime()) /
				(1000 * 3600 * 24)
		);

		let acrescimo = 0;

		if (this._veiculo.tipo === "Carro") {
			acrescimo = 0.1;
		} else if (this._veiculo.tipo === "Moto") {
			acrescimo = 0.05;
		}

		const resultado =
			this._veiculo.valorDiaria * diasAlugados * (1 + acrescimo);
		return resultado;
	}

	private _atualizarStatus(): void {
		const hoje = new Date();

		if (hoje >= this.dataInicio && hoje <= this._dataFim) {
			this._estaAtivo = true;
		} else {
			this._estaAtivo = false;
		}
	}

	atualizarEstadoVeiculo() {
		const filePath = path.join(__dirname, "..", "data", "veiculos.json");
		try {
			const content = fs.readFileSync(filePath, "utf-8");
			const veiculos = JSON.parse(content);

			const index = veiculos.findIndex(
				(veiculo: Veiculo) => veiculo.placa === this._veiculo.placa
			);

			if (index !== -1) {
				veiculos[index].estaDisponivel = false; // Atualiza o estado de disponibilidade no array de veículos

				fs.writeFileSync(filePath, JSON.stringify(veiculos)); // Persiste a atualização no arquivo JSON
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

};
