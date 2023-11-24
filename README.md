# Sistema de Locadora de Veiculos

Este é um projeto em JavaScript que visa a criação de um sistema para gerenciar uma locadora de veiculos. O código do projeto visando o estudo para TypeScript como parte de um curso que abordará os conceitos dessa linguagem.

## Estrutura do Projeto

O projeto está organizado em pastas e bibliotecas para uma melhor modularização. Abaixo estão as principais entidades e suas funcionalidades:

### Locadora
- **Atributos**: nome, CNPJ
- **Listas**: veiculos, alugueis, veiculosDisponiveis, alugueisAtivos
- **Métodos**: cadastrarAluguel, editarAluguel, listarVeiculos, listarVeiculosDisponiveis, listarAlugueis, listarAlugueisAtivos

### Cliente
- **Atributos**: nome, CPF, tipoDeCarteira
- **Métodos**: Cadastrar, editar, excluir

### Aluguel
- **Atributos**: dataInicio, dataFim, valorAluguel, cliente, veiculo, estaAtivo
- **Métodos**: calcularValor, atualizarStatus

### Veiculo
- **Atributos**: tipo, marca, modelo, ano, placa, valorDiaria, estaDisponivel
- **Métodos**: cadastrar, editar, excluir

## Como Executar o Projeto

1. Clone o repositório para sua máquina local:

   ```
   git clone https://github.com/Sqd-404/Sistema_para_locadora_de_veiculos.git
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd nome-do-repositorio
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

4. Execute o projeto:

   ```bash
   npm start
   ```


## Observações Importantes
- **Certifique-se de ter o Node.js instalado na sua máquina.**
- **Certifique-se de ter todas as dependências instaladas corretamente usando o comando `npm install`.**
- **Atualize as configurações do banco de dados no arquivo `config.js` para refletir suas configurações locais.**

```
+----------------------+
|      Locadora        |
+----------------------+
| - nome               |
| - CNPJ               |
| - veiculos           |
| - alugueis           |
| - veiculosDisponiveis|
| - alugueisAtivos     |
+----------------------+
      |
+----------------------+
|       Cliente        |
+----------------------+
| - nome               |
| - CPF                |
| - tipoDeCarteira     |
+----------------------+
      |
+----------------------+
|       Aluguel        |
+----------------------+
| - dataInicio         |
| - dataFim            |
| - valorAluguel       |
| - cliente            |
| - veiculo            |
| - estaAtivo          |
+----------------------+
      |
+----------------------+
|       Veiculo        |
+----------------------+
| - tipo               |
| - marca              |
| - modelo             |
| - ano                |
| - placa              |
| - valorDiaria        |
| - estaDisponivel     |
+----------------------+
```