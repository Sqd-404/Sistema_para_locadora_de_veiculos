import * as readlineSync from 'readline-sync';

// Código das classes e lógica do sistema aqui...

// Instanciando a locadora
const locadora = new Locadora();

// Função para exibir o menu
function exibirMenu() {
    console.log('======= MENU =======');
    console.log('1. Cadastrar veículo');
    console.log('2. Alugar veículo');
    console.log('3. Devolver veículo');
    console.log('4. Listar veículos disponíveis');
    console.log('5. Listar veículos alugados');
    console.log('6. Sair');
    console.log('====================');
}

// Loop do programa
let running = true;
while (running) {
    exibirMenu();
    const opcao = parseInt(readlineSync.question('Escolha uma opção: '));

    switch (opcao) {
        case 1:
            
            break;
        case 2:
            
            break;
        case 3:
            
            break;
        case 4:
            
            break;
        case 5:
            
            break;
        case 6:
            running = false;
            break;
        default:
            console.log('Opção inválida. Tente novamente.');
    }
}