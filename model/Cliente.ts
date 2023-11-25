/**
 *
 */

const fs = require("fs");
const path = require("path");

class Cliente {
	private id: number = 0;
	static totalClientes: number;

	constructor(
        nome: string, 
        cpf: string, 
        tipoDeCarta: string) {
	}

	//geters e seters//

    /**
     * Getter $id
     * @return {number }
     */
	public get $id(): number  {
		return this.id;
	}

    /**
     * Setter $id
     * @param {number } value
     */
	public set $id(value: number ) {
		this.id = value;
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

	static cadastrarCliente(
		nome: string,
		cpf: string,
		tipoDeCarta: string
	) {
        
        const novoCliente = new Cliente(nome, cpf, tipoDeCarta);
        const clientes = Cliente.listar();
        const cpfExiste = clientes.some((cliente) => cliente.cpf === cpf);
        
        if (cpfExiste) {
			console.log("CPF já cadastrado. Não é possível adicionar cliente.");
			return;
		} else {
		clientes.push(novoCliente); 
        try {
            const filePath = path.join(__dirname, "..", "data", "clientes.json");
            fs.writeFileSync(filePath, JSON.stringify(clientes));
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
		const cliente = clientes.find((cliente: Cliente) => cliente.id === id);

		if (cliente) {
			cliente.nome = nome;
			cliente.cpf = cpf;
			cliente.tipoDeCarta = tipoDeCarta;

            try {
				const filePath = path.join(__dirname, "..", "data", "clientes.json");
				fs.writeFileSync(filePath, JSON.stringify(clientes));
			} catch (error) {
                console.error("Erro ao ler o arquivo JSON:", error);
			}
		} else {
			console.log(`Cliente com ${id} não foi encontrado!`);
		}
	}

	static excluirCliente(id: number) {
		const clientes = Cliente.listar();
		const index = clientes.findIndex((cliente: Cliente) => cliente.id === id);

		if (index !== -1) {
			clientes.splice(index, 1);
			try {
				const filePath = path.join(__dirname, "..", "data", "clientes.json");
				fs.writeFileSync(filePath, JSON.stringify(clientes));
			} catch (error) {
				console.error("Erro ao ler o arquivo JSON:", error);
			}
		} else {
			console.log(`Cliente com id ${id} não encontrado!`);
		}
	}

    static recuperarCliente(id: number) : Cliente  {
		const clientes = Cliente.listar();
		const clienteEncontrado = clientes.find(
			(cliente: Cliente) => cliente.id === id
		);
		if (clienteEncontrado) {
            return clienteEncontrado;
		} else {
			console.log(`cliente com id ${id} não foi encontrado.`);
			return undefined;
		}
	}

	static inicializarContador() {
		try {
			const filePath = path.join(__dirname, "..", "data", "clientes.json");
			const content = fs.readFileSync(filePath, "utf-8");
			const clientes = JSON.parse(content);

			let maiorId = 0;
			for (const cliente of clientes) {
				if (cliente.id > maiorId) {
					maiorId = cliente.id;
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
