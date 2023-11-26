import Veiculo from "./Veiculo";
import Cliente from "./Cliente";
import Aluguel from "./Aluguel";

const fs = require("fs");
const path = require("path");

/**
 */
export class Locadora {
	constructor(
		private _nome: string,
		private _cnpj: string,
		private _veiculos: Veiculo[],
		private _alugueis: Aluguel[],
		private _veiculosDisponiveis: Veiculo[],
		private _alugueisAtivos: Aluguel[]
	) {}

	/**
	 * Getter $nome
	 * @return {string}
	 */
	public get $nome(): string {
		return this._nome;
	}

	/**
	 * Setter $nome
	 * @param {string} value
	 */
	public set $nome(value: string) {
		this._nome = value;
	}

	/**
	 * Getter $cnpj
	 * @return {string}
	 */
	public get $cnpj(): string {
		return this._cnpj;
	}

	/**
	 * Setter $cnpj
	 * @param {string} value
	 */
	public set $cnpj(value: string) {
		this._cnpj = value;
	}

	/**
	 * Getter $veiculosDisponiveis
	 * @return {Veiculo[]}
	 */
	public get $veiculosDisponiveis(): Veiculo[] {
		return this._veiculosDisponiveis;
	}

	/**
	 * Setter $veiculosDisponiveis
	 * @param {Veiculo[]} value
	 */
	public set $veiculosDisponiveis(value: Veiculo[]) {
		this._veiculosDisponiveis = value;
	}

	/**
	 * Getter $alugueisAtivos
	 * @return {Aluguel[]}
	 */
	public get $alugueisAtivos(): Aluguel[] {
		return this._alugueisAtivos;
	}

	/**
	 * Setter $alugueisAtivos
	 * @param {Aluguel[]} value
	 */
	public set $alugueisAtivos(value: Aluguel[]) {
		this._alugueisAtivos = value;
	}

	/**
	 * Getter $alugueis
	 * @return {Aluguel[]}
	 */
	public get $alugueis(): Aluguel[] {
		return this._alugueis;
	}

	/**
	 * Setter $alugueis
	 * @param {Aluguel[]} value
	 */
	public set $alugueis(value: Aluguel[]) {
		this._alugueis = value;
	}

	/**
	 * Getter $veiculos
	 * @return {Veiculo[]}
	 */
	public get $veiculos(): Veiculo[] {
		return this._veiculos;
	}

	/**
	 * Setter $veiculos
	 * @param {Veiculo[]} value
	 */
	public set $veiculos(value: Veiculo[]) {
		this._veiculos = value;
	}

	static cadastrarVeiculo(
		tipo: string,
		marca: string,
		modelo: string,
		ano: number,
		placa: string,
		valorDiaria: number,
		estaDisponivel: boolean
	) {
		const veiculoNovo = new Veiculo(
			tipo,
			marca,
			modelo,
			ano,
			placa,
			valorDiaria,
			estaDisponivel
		);
		const veiculos = Locadora.listarVeiculos();
		/**
		 * verifica se existe a placa cadastrada
		 */
		const placaExiste = veiculos.some((veiculo) => veiculos.placa === placa);
		if (placaExiste) {
			console.log("Placa já cadastrada. Não é possível adicionar o veiculo.");
			return;
		} else {
			veiculos.push(veiculoNovo);
			try {
				const filePath = path.join(__dirname, "..", "data", "veiculos.json");
				fs.writeFileSync(filePath, JSON.stringify(veiculos, null, 2));
			} catch (error) {
				console.error("Erro ao ler o arquivo JSON:", error);
			}
		}
	}

	static editarVeiculo(
		tipo: string,
		marca: string,
		modelo: string,
		ano: number,
		placa: string,
		valorDiaria: number
	) {
		const veiculos = Locadora.listarVeiculos();
		/**
		 * verifica se existe a placa cadastrada
		 */
		const veiculoExiste = veiculos.find(
			(veiculo: Veiculo) => veiculo.placa === placa
		);
		if (veiculoExiste) {
			veiculoExiste.tipo = tipo;
			veiculoExiste.marca = marca;
			veiculoExiste.modelo = modelo;
			veiculoExiste.ano = ano;
			veiculoExiste.valorDiaria = valorDiaria;
			try {
				const filePath = path.join(__dirname, "..", "data", "veiculos.json");
				fs.writeFileSync(filePath, JSON.stringify(veiculos, null, 2));
			} catch (error) {
				console.error("Erro ao ler o arquivo JSON:", error);
			}
		} else {
			console.log(`Veiculo com placa ${placa} não foi encontrado.`);
		}
	}



	static recuperarVeiculo(placa: string): Veiculo {
		const veiculos = Locadora.listarVeiculos();
		const veiculoEncontrado = veiculos.find(
			(veiculo: Veiculo) => veiculo.placa === placa
		);
		if (veiculoEncontrado) {
            return veiculoEncontrado;

		} else {
			console.log(`Veiculo com placa ${placa} não foi encontrado.`);
			return null;
		}
	}


	static excluirVeiculo(placa: string) {
		const veiculos = Locadora.listarVeiculos();
		/**
		 * verifica se existe a placa cadastrada
		 */
		const index = veiculos.findIndex(
			(veiculo: Veiculo) => veiculo.placa === placa
		);
		if (index !== -1) {
			veiculos.splice(index, 1);
			try {
				const filePath = path.join(__dirname, "..", "data", "veiculos.json");
				fs.writeFileSync(filePath, JSON.stringify(veiculos, null, 2));
			} catch (error) {
				console.error("Erro ao ler o arquivo JSON:", error);
			}
		} else {
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
		} catch (error) {
			console.error("Erro ao ler o arquivo JSON:", error);
			return [];
		}
	}

	static cadastrarAluguel(
		dataInicio: Date,
		dataFim: Date,
		cpfCliente: string,
		placaVeiculo: string
	) {
		const cliente = Cliente.encontrarClientePorCPF(cpfCliente);
		const veiculo = Locadora.recuperarVeiculo(placaVeiculo);
		const alugueis = Aluguel.listarAlugueis();
		const alugueisAtivos = Aluguel.listarAlugueisAtivos();
		const carroAtivo = alugueisAtivos.some(
			(aluguel) => aluguel._veiculo.placa === placaVeiculo
		);
		const clienteAtivo = alugueisAtivos.some(
			(aluguel) => aluguel._cliente.cpf === cpfCliente
		);

		// Verifica se o cliente e o veículo foram encontrados
		if (!cliente || !veiculo) {
			console.log("Cliente ou veículo não encontrado.");
			return;
		}
		
		//Verificando se o cliente já possui aluguel ativo e se o carro já está alugado
		if (clienteAtivo) {
			console.log(
				"O cliente já possui um aluguel ativo. Não é possível adicionar o aluguel."
			);
			return;
		} else if (carroAtivo) {
			console.log(
				"O carro já possui um aluguel ativo. Não é possível adicionar o aluguel."
			);
			return;
		}
		
		//Lógica para adicionar aluguel na lista de alugueis com base no tipo de veiculo e  carteira do cliente
		if (
			(cliente.tipoDeCarta === 'A' && veiculo.tipo === 'A') ||
       		(cliente.tipoDeCarta === 'B' && veiculo.tipo === 'B')
		) {
			const novoAluguel = new Aluguel(dataInicio, dataFim, cliente, veiculo);
			alugueis.push(novoAluguel);

			try {
				const filePath = path.join(__dirname, "..", "data", "alugueis.json");
				fs.writeFileSync(filePath, JSON.stringify(alugueis, null, 2));
			} catch (error) {
				console.error("Erro ao escrever no arquivo JSON:", error);
			}

			novoAluguel.atualizarStatus();
		} else {
			console.log("A carteira do cliente não é compatível com este tipo de veículo.");
		}
	}

	editarAluguel(
		dataInicio: Date,
		dataFim: Date,
		cliente: Cliente,
		veiculo: Veiculo
	) {
		//todo id unico
	}
	// static listarAlugueis() {
	// 	try {
	// 		const filePath = path.join(__dirname, "..", "data", "alugueis.json");
	// 		const content = fs.readFileSync(filePath, "utf-8");
	// 		const alugueis = JSON.parse(content);
	// 		return alugueis;
	// 	} catch (error) {
	// 		console.error("Erro ao ler o arquivo JSON:", error);
	// 		return [];
	// 	}
	// }
	// static listarAlugueisAtivos() {
	// 	try {
	// 		const filePath = path.join(__dirname, "..", "data", "alugueis.json");
	// 		const content = fs.readFileSync(filePath, "utf-8");
	// 		const alugueis = JSON.parse(content);
	// 		const alugueisFiltrados = alugueis.filter(
	// 			(aluguel: Aluguel) => aluguel.estaAtivo === true
	// 		);
	// 		return alugueisFiltrados;
	// 	} catch (error) {
	// 		console.error("Erro ao ler o arquivo JSON:", error);
	// 		return [];
	// 	}
	// }

}
