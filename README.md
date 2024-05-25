# Automação de Testes de Validação de CEP com Cypress

Este projeto é uma automação de testes desenvolvida em Cypress para validar diversos cenários de uma API de validação de CEP. Utilizando boas práticas de desenvolvimento e testes, foram criados diversos casos de teste para garantir que a API funcione corretamente em diferentes situações.

## Funcionalidades

- Validação do formato e estrutura do JSON retornado pela API.
- Verificação do status de resposta da API para requisições válidas e inválidas.
- Verificação do tempo de resposta da API para requisições válidas.
- Testes de diferentes regiões e formatações de CEP.
- Utilização de comandos personalizados para simplificar a escrita dos testes.

## Pré-requisitos

- Node.js instalado na máquina.
- Cypress instalado globalmente ou localmente no projeto.
- Acesso à internet para fazer as requisições à API de validação de CEP.

## Como Executar os Testes

1. Clone este repositório em sua máquina local.
2. Instale as dependências do projeto utilizando o comando `npm install`.
3. Execute os testes em modo headless com o comando `npm run test:headless` ou em modo interativo com `npm run test:interactive`.
4. Os resultados dos testes serão exibidos no terminal ou na interface do Cypress.

## Contribuição

Contribuições são bem-vindas! Se você encontrou algum problema, tem alguma sugestão de melhoria ou deseja adicionar novos casos de teste, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Navegadores Testados

- Google Chrome
- Mozilla Firefox
- Microsoft Edge
- Electron 

## Ambiente de Integração Contínua (CI)

Este projeto é configurado para rodar na esteira de integração contínua do GitLab. Os testes serão executados automaticamente em cada commit ou push para o repositório.
