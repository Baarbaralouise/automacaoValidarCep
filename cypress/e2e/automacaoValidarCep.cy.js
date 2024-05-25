/// <reference types="Cypress" />

describe("Validação de CEP", () => {
  it("Deve verificar a disponibilidade da API e retornar status 200", () => {
    cy.verificarDisponibilidadeAPI("/");
  });

  it("Deve verificar o tempo de resposta da API", () => {
    cy.verificarTempoDeRespostaDaAPI();
  });

  it("Deve retornar as informações corretas para um CEP válido", () => {
    cy.verificarDisponibilidadeAPI("/");
    cy.verificarInformacoesCorretasCepValido();
  });

  it("Deve retornar as informações corretas para CEPs de diferentes regiões", () => {
    cy.verificarDisponibilidadeAPI("/");
    cy.verificarInformacoesCepDiferentesRegioes("");
  });

  it("Deve validar que o CEP tem exatamente 8 dígitos", () => {
    cy.verificarDisponibilidadeAPI("/");
    cy.verificarCepCom8Digitos();
  });

  it("Deve retornar 400 e Bad Request para um CEP inválido", () => {
    cy.verificarDisponibilidadeAPI("/");
    cy.retornar400CepInvalido;
  });

  it("Deve retornar 400 para entradas alfanuméricas", () => {
    cy.verificarDisponibilidadeAPI("/");
    cy.retornarErro400CepAlfanumerico("/");
  });


  it('Deve retornar erro ao consultar um CEP com formato válido, mas inexistente na base de dados', () => {
    cy.verificarDisponibilidadeAPI("/");
    cy.retornarErroCepFormatoValidoMasInexistente()
});
});
