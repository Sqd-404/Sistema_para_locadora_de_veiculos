/**
 *
 */

const fs = require("fs");
const path = require("path");

class Cliente {
	private _id: number = 0;
	static totalClientes: number;
    private _nome: string;
    private _cpf: string;
    private _tipoDeCarta: string;

	constructor(nome: string, cpf: string, tipoDeCarta: string) {
        this._nome = nome;
        this._cpf = cpf;
        this._tipoDeCarta = tipoDeCarta;
		Cliente.inicializarContador();
        this._id=Cliente.totalClientes;
    }

	//geters e seters//

    /**
     * Getter nome
     * @return {string}
     */
	public get nome(): string {
		return this._nome;
	}

    /**
     * Setter nome
     * @param {string} value
     */
	public set nome(value: string) {
		this._nome = value;
	}

    /**
     * Getter id
     * @return {number }
     */
	public get id(): number  {
		return this._id;
	}

    /**
     * Setter id
     * @param {number } value
     */
	public set id(value: number ) {
		this._id = value;
	}


    /**
     * Getter cpf
     * @return {string}
     */
	public get cpf(): string {
		return this._cpf;
	}

    /**
     * Setter cpf
     * @param {string} value
     */
	public set cpf(value: string) {
		this._cpf = value;
	}


    /**
     * Getter tipoDeCarta
     * @return {string}
     */
	public get tipoDeCarta(): string {
		return this._tipoDeCarta;
	}

    /**
     * Setter tipoDeCarta
     * @param {string} value
     */
	public set tipoDeCarta(value: string) {
		this._tipoDeCarta = value;
	}


	//métodos//

	static listar() {
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

	static cadastrarCliente(nome: string, cpf: string, tipoDeCarta: string) {
		const novoCliente = new Cliente(nome, cpf, tipoDeCarta);
		const clientes = Cliente.listar();
		const cpfExiste = clientes.some((cliente: Cliente) => cliente._cpf === cpf);

		if (cpfExiste) {
			console.log("CPF já cadastrado. Não é possível adicionar cliente.");
			return;
		} else {
			clientes.push(novoCliente);
			try {
                const filePath = path.join(__dirname, "..", "data", "clientes.json");
				fs.writeFileSync(filePath, JSON.stringify(clientes, null, 2));
                console.log(`Cliente ${nome} cadastrado com sucesso!`);
			} catch (error) {
				console.error("Erro ao ler o arquivo JSON:", error);
			}
		}
	}

	static editarCliente(
		id: number,
		nome: string,
		cpf: string,
		tipoDeCarta: string
	) {
		const clientes = Cliente.listar();
		const cliente = clientes.find((cliente: Cliente) => cliente._id === id);

		if (cliente) {
			cliente._nome = nome;
			cliente._cpf = cpf;
			cliente._tipoDeCarta = tipoDeCarta;

			try {
				const filePath = path.join(__dirname, "..", "data", "clientes.json");
				fs.writeFileSync(filePath, JSON.stringify(clientes, null, 2));
			} catch (error) {
				console.error("Erro ao ler o arquivo JSON:", error);
			}
		} else {
			console.log(`Cliente com ${id} não foi encontrado!`);
		}
	}

	static excluirCliente(id: number) {
		const clientes = Cliente.listar();
		const index = clientes.findIndex((cliente: Cliente) => cliente._id === id);

		if (index !== -1) {
			clientes.splice(index, 1);
			try {
				const filePath = path.join(__dirname, "..", "data", "clientes.json");
				fs.writeFileSync(filePath, JSON.stringify(clientes, null, 2));
			} catch (error) {
				console.error("Erro ao ler o arquivo JSON:", error);
			}
		} else {
			console.log(`Cliente com id ${id} não encontrado!`);
		}
	}

	static recuperarCliente(id: number): Cliente {
		const clientes = Cliente.listar();
		const clienteEncontrado = clientes.find(
			(cliente: Cliente) => cliente._id === id
		);
		if (clienteEncontrado) {
			return clienteEncontrado;
		} else {
			console.log(`cliente com id ${id} não foi encontrado.`);
		}
	}

	static encontrarClientePorCPF(cpf: string): Cliente  {
		const clientes = Cliente.listar();
		const cliente: Cliente = clientes.find((cliente: Cliente) => cliente._cpf.toUpperCase()  === cpf.toUpperCase() );
		const newCli = new Cliente(cliente._nome, cliente._cpf, cliente._tipoDeCarta)
		return newCli;

	}

	static inicializarContador() {
		try {
			const filePath = path.join(__dirname, "..", "data", "clientes.json");
			const content = fs.readFileSync(filePath, "utf-8");
			const clientes = JSON.parse(content);

			let maiorId = 0;
			for (const cliente of clientes) {
				if (cliente._id > maiorId) {
					maiorId = cliente._id;
				}
			}

			Cliente.totalClientes = maiorId + 1; // Configura o contador com o maior ID encontrado + 1
		} catch (error) {
			console.error("Erro ao ler o arquivo JSON de aluguéis:", error);
			// Definir o contador com valor padrão em caso de erro na leitura do arquivo
			Cliente.totalClientes = 1;
		}
	}
}

export default Cliente;
