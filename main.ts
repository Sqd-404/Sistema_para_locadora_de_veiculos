import Aluguel from "./model/Aluguel";
import { Locadora } from "./model/Locadora";
import Veiculo from "./model/Veiculo";
import Cliente from "./model/Cliente";
import * as readlineSync from 'readline-sync';
import { read } from "fs";

const veiculos: Veiculo[] = [];

function exibirMenu() {
	console.log("\n");
	console.log("======= MENU =======");
	console.log("1. Cadastrar veículo");
	console.log("2. Alugar veículo");
	console.log("3. Devolver veículo");
	console.log("4. Listar veículos disponíveis");
	console.log("5. Listar veículos alugados");
	console.log("6. Sair");
	console.log("====================");
}

let running: boolean = true;
while (running) {
	exibirMenu();
	const opcao: string = readlineSync.question("Escolha uma opcao: ");
	
	// 	switch (opcao) {
	// 		case "1":
	// 			console.log(opcao);
	// 			break;
	// 		case "2":
	// 			console.log(opcao);
	// 			break;
	// 		case "3":
	// 			console.log(opcao);
	// 			break;
	// 		case "4":
	// 			console.log(opcao);
	// 			break;
	// 		case "5":
	// 			console.log(opcao);
	// 			break;
	// 		case "6":
	// 			console.log(opcao);
	// 			break;
	// 		default:
	// 			console.log(opcao);
	// 	}
	// }

	switch (opcao) {
		case '1':
		const tipo = readlineSync.question('Digite o tipo do novo veiculo (carro/moto): ');
		const marca = readlineSync.question('Digite a marca do novo veiculo: ');
		const modelo = readlineSync.question('Digite o modelo do novo veiculo: ');
		const ano = parseInt(readlineSync.question('Digite o ano do novo veiculo: '));
		const placa = readlineSync.question('Digite a placa do novo veiculo: ');
		const diaria = parseInt(readlineSync.question('Digite o valor da diaria para o novo veiculo: '));
		const disponivel = readlineSync.question('Este veiculo estara disponivel para aluguel? S/N: ');
		const estaDisponivel: boolean =( disponivel === 'S' || disponivel === 's') ? true : false;
		Veiculo.cadastrarVeiculo(tipo, marca, modelo, ano, placa, diaria, estaDisponivel);
		break;

		case '2':
			const dataInicio = new Date(
				readlineSync.question("Digite a data de inicio (YYYY-MM-DD): ")
			);
			const dataFim = new Date(
				readlineSync.question("Digite a data de termino (YYYY-MM-DD): ")
			);
			const cpfCliente = readlineSync.question("Digite o CPF do cliente: ");
			const placaVeiculo = readlineSync.question(
				"Digite a placa do veiculo que deseja alugar: "
			);
			Locadora.cadastrarAluguel(dataInicio, dataFim, cpfCliente, placaVeiculo);
			break;

		case '3':
			const cpfClienteDevolucao = readlineSync.question(
				"Digite o CPF do cliente: "
			);
			const aluguelAtivo = Aluguel.listarAlugueisAtivos().find(
				(aluguel) => aluguel._cliente.cpf === cpfCliente
			);
			aluguelAtivo.devolucaoVeiculo(cpfClienteDevolucao);

		case '4':
			Veiculo.listarVeiculosDisponiveis(veiculos);
			break;

		case '5':
			Veiculo.listarVeiculosAlugados(veiculos);
			break;

		case '6':
			running = false;
			break;

		default:
			console.log("Opção inválida. Tente novamente.");
	}
}
