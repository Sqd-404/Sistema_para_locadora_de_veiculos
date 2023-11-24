import Veiculo from "./Veiculo";
import Cliente from "./Cliente";
import { Aluguel } from "./Aluguel";

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

	/**
	 * Função responsável pelo cadastro de clientes, ela possui uma verificação garantindo um cpf unico.
	 * @param nome
	 * @param cpf
	 * @param tipoCarteira
	 * @returns
	 */
	static cadastrarCliente(nome: string, cpf: string, tipoCarteira: string) {
		const clienteNovo = new Cliente(nome, cpf, tipoCarteira);

		const clientes = Locadora.listarClientes();

		/**
		 * verifica se existe o cpf cadastrado
		 */
		const cpfExiste = clientes.some((cliente) => cliente.cpf === cpf);

		if (cpfExiste) {
			console.log("CPF já cadastrado. Não é possível adicionar cliente.");
			return;
		} else {
			clientes.push(clienteNovo);
			try {
				const filePath = path.join(__dirname, "..", "data", "clientes.json");
				fs.writeFileSync(filePath, JSON.stringify(clientes));
			} catch (error) {
				console.error("Erro ao ler o arquivo JSON:", error);
			}
		}
	}
	/**
	 * Metodo estático responsável por listar os clientes da locadora.
	 * @returns
	 */
	static listarClientes() {
		try {
			const filePath = path.join(__dirname, "..", "data", "clientes.json");
			const content = fs.readFileSync(filePath, "utf-8");
			const clientes = JSON.parse(content);
			return clientes;
		} catch (error) {
			console.error("Erro ao ler o arquivo JSON:", error);
			return [];
		}
	}

	/**
	 * A partir do cpf (atributo único de cliente) ele pega o cliente edita e salva o json
	 * @param nome
	 * @param cpf
	 * @param tipoCarteira
	 */
	static editarCliente(nome: string, cpf: string, tipoCarteira: string) {
		const clientes = Locadora.listarClientes();
		/**
		 * verifica se existe o cpf cadastrado
		 */
		const clienteExiste = clientes.find(
			(cliente: Cliente) => cliente.cpf === cpf
		);
		if (clienteExiste) {
			clienteExiste.nome = nome;
			clienteExiste.tipoCarteira = tipoCarteira;
			try {
				const filePath = path.join(__dirname, "..", "data", "clientes.json");
				fs.writeFileSync(filePath, JSON.stringify(clientes));
			} catch (error) {
				console.error("Erro ao ler o arquivo JSON:", error);
			}
		} else {
			console.log(`Usuário com CPF ${cpf} não foi encontrado.`);
		}
	}
	/**
	 * A partir do cpf (atributo único de cliente) ele pega o cliente e o exclui
	 * @param nome
	 * @param cpf
	 * @param tipoCarteira
	 */
	static excluirCliente(cpf: string) {
		const clientes = Locadora.listarClientes();
		/**
		 * verifica se existe o cpf cadastrado e retorna o index
		 */
		const index = clientes.findIndex((cliente: Cliente) => cliente.cpf === cpf);
		if (index !== -1) {
			clientes.splice(index, 1);
			try {
				const filePath = path.join(__dirname, "..", "data", "clientes.json");
				fs.writeFileSync(filePath, JSON.stringify(clientes));
			} catch (error) {
				console.error("Erro ao ler o arquivo JSON:", error);
			}
		} else {
			console.log(`Usuário com CPF ${cpf} não foi encontrado.`);
		}
	}

	/**
	 * Função responsável pelo cadastro de veiculos, ela possui uma verificação garantindo uma placa unica.
	 * @param tipo
	 * @param marca
	 * @param modelo
	 * @param ano
	 * @param placa
	 * @param valorDiaria
	 */
	static cadastrarVeiculo(
		tipo: string,
		marca: string,
		modelo: string,
		ano: number,
		placa: string,
		valorDiaria: number
	) {
		const veiculoNovo = new Veiculo(
			tipo,
			marca,
			modelo,
			ano,
			placa,
			valorDiaria
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
				fs.writeFileSync(filePath, JSON.stringify(veiculos));
			} catch (error) {
				console.error("Erro ao ler o arquivo JSON:", error);
			}
		}
	}

	/**
	 * Classe responsável por editar o veiculo baseando na placa
	 * @param tipo
	 * @param marca
	 * @param modelo
	 * @param ano
	 * @param placa
	 * @param valorDiaria
	 */
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
				fs.writeFileSync(filePath, JSON.stringify(veiculos));
			} catch (error) {
				console.error("Erro ao ler o arquivo JSON:", error);
			}
		} else {
			console.log(`Veiculo com placa ${placa} não foi encontrado.`);
		}
	}

	static recuperarCliente(cpf: string) : Cliente | undefined  {
		const clientes = Locadora.listarClientes();
		const clienteEncontrado = clientes.find(
			(cliente: Cliente) => cliente.cpf === cpf
		);
		if (clienteEncontrado !== -1) {
			const { nome, cpf, tipoCarteira } =
            clienteEncontrado;
			const cliente = new Cliente(
                nome,
                cpf,
                tipoCarteira
			);
            return cliente;

		} else {
			console.log(`cliente com cpf ${cpf} não foi encontrado.`);
			return undefined;
		}
	}

	static recuperarVeiculo(placa: string): Veiculo | undefined  {
		const veiculos = Locadora.listarVeiculos();
		const veiculoEncontrado = veiculos.find(
			(veiculo: Veiculo) => veiculo.placa === placa
		);
		if (veiculoEncontrado !== -1) {
			const { tipo, marca, modelo, ano, placa, valorDiaria, estaDisponivel } =
				veiculoEncontrado;
			const veiculo = new Veiculo(
				tipo,
				marca,
				modelo,
				ano,
				placa,
				valorDiaria,
			);
            veiculo.estaDisponivel=estaDisponivel;
            return veiculo;

		} else {
			console.log(`Veiculo com placa ${placa} não foi encontrado.`);
			return undefined;
		}
	}
	/**
	 * Classe responsável por excluir o veiculo baseando na placa
	 * @param tipo
	 * @param marca
	 * @param modelo
	 * @param ano
	 * @param placa
	 * @param valorDiaria
	 */
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
				fs.writeFileSync(filePath, JSON.stringify(veiculos));
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
	static listarVeiculosDisponiveis() {
		try {
			const filePath = path.join(__dirname, "..", "data", "veiculos.json");
			const content = fs.readFileSync(filePath, "utf-8");
			const veiculos = JSON.parse(content);
			const veiculosFiltrados = veiculos.filter(
				(veiculo: any) => veiculo.estaDisponivel === true
			);
			return veiculosFiltrados;
		} catch (error) {
			console.error("Erro ao ler o arquivo JSON:", error);
			return [];
		}
	}

	/**
	 *
	 * @param id
	 * @param dataInicio
	 * @param dataFim
	 * @param valorAluguel
	 * @param cliente
	 * @param veiculo
	 * @param estaAtivo
	 */
	static cadastarAluguel(
		dataInicio: Date,
		dataFim: Date,
		cliente: Cliente,
		veiculo: Veiculo
	) {
		const novoAluguel = new Aluguel(dataInicio, dataFim, cliente, veiculo);
		const alugueis = Locadora.listarAlugueis();
		const alugueisAtivos = Locadora.listarAlugueisAtivos();

		const clienteAtivo = alugueisAtivos.some(
			(aluguel) => alugueis.cliente === cliente
		);
		const carroAtivo = alugueisAtivos.some(
			(aluguel) => alugueis.veiculo === veiculo
		);
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
		} else {
			alugueis.push(novoAluguel);
			try {
				const filePath = path.join(__dirname, "..", "data", "alugueis.json");
				fs.writeFileSync(filePath, JSON.stringify(alugueis));
			} catch (error) {
				console.error("Erro ao ler o arquivo JSON:", error);
			}
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

	static listarAlugueis() {
		try {
			const filePath = path.join(__dirname, "..", "data", "alugueis.json");
			const content = fs.readFileSync(filePath, "utf-8");
			const alugueis = JSON.parse(content);
			return alugueis;
		} catch (error) {
			console.error("Erro ao ler o arquivo JSON:", error);
			return [];
		}
	}
	static listarAlugueisAtivos() {
		try {
			const filePath = path.join(__dirname, "..", "data", "alugueis.json");
			const content = fs.readFileSync(filePath, "utf-8");
			const alugueis = JSON.parse(content);
			const alugueisFiltrados = alugueis.filter(
				(aluguel: Aluguel) => aluguel.estaAtivo === true
			);
			return alugueisFiltrados;
		} catch (error) {
			console.error("Erro ao ler o arquivo JSON:", error);
			return [];
		}
	}
}
