import './commands.js'


Cypress.Commands.add('verificarDisponibilidadeAPI', (baseUrl) => {
    cy.request("GET", baseUrl).should((response) => {
      expect(response.status).to.eq(200);
    });
  });

  Cypress.Commands.add('verificarTempoDeRespostaDaAPI', (baseUrl) => {
    const cep = "01311000";
    cy.request("GET", `${baseUrl}/ws/${cep}/json/`).then(
      (response) => {
        expect(response.duration).to.be.lessThan(500);
      }
    );
  });

  Cypress.Commands.add('verificarInformacoesCorretasCepValido', (baseUrl) => {
    const cepValido = "01311000";
    cy.request("GET", `${baseUrl}/ws/${cepValido}/json/`).should((response) => {
  
        expect(response.body).to.deep.equal({
          cep: "01311-000",
          logradouro: "Avenida Paulista",
          complemento: "até 609 - lado ímpar",
          bairro: "Bela Vista",
          localidade: "São Paulo",
          uf: "SP",
          ibge: "3550308",
          gia: "1004",
          ddd: "11",
          siafi: "7107",
        });
      }
    );
    cy.log("CEP válido: " + cepValido);
  });

  Cypress.Commands.add('verificarInformacoesCepDiferentesRegioes', (baseUrl) => {
    const ceps = ['01001000', '30130010', '40100110', '60000000'];

    ceps.forEach((cep) => {
      cy.request('GET', `${baseUrl}/ws/${cep}/json/`).then((response) => {
          if (response.body.erro) {
              cy.log(`CEP ${cep} não encontrado.`);
              expect(response.body).to.have.property('erro', true);
          } else {
              expect(response.body).to.have.property('cep');
              expect(response.body).to.have.property('logradouro');
              expect(response.body).to.have.property('bairro');
              expect(response.body).to.have.property('localidade');
              expect(response.body).to.have.property('uf');
          }
      });
  });
  });

  Cypress.Commands.add('verificarCepCom8Digitos', (baseUrl) => {
    const cep = '53441500';
    cy.request({
      method: 'GET',
      url: `${baseUrl}/ws/${cep}/json/`,
    }).then((response) => {
      
      // Verifica se o campo 'cep' existe na resposta
      expect(response.body).to.have.property('cep');

      const cepRetornado = response.body.cep;
      
      // Remove quaisquer caracteres não numéricos (por exemplo, hífens)
      const cepSomenteNumeros = cepRetornado.replace(/\D/g, '');
      
      // Verifica se o CEP tem exatamente 8 dígitos
      expect(cepSomenteNumeros).to.have.lengthOf(8);

    });
  });

  Cypress.Commands.add('retornarErro400CepInvalido', (baseUrl) => {
    const cepInvalido = '123456789'; // Um CEP inválido com mais de 8 dígitos

    cy.request({
      method: 'GET',
      url: `${baseUrl}/ws/${cepInvalido}/json/`,
      failOnStatusCode: false // Não falha no status de código 400
    }).then((response) => {
      expect(response.status).to.eq(400); // Verifica se o status é 400
      expect(response.body).to.contain('Bad Request'); // Verifica se a mensagem de erro está no corpo da resposta
    });
  });

  Cypress.Commands.add('retornarErro400CepAlfanumerico', (baseUrl) => {
    const isAlphanumeric = (str) => {
      return /[^\d]/.test(str); // Verifica se a string contém algum caractere que não seja número
  };
  const cepInvalido = 'abcd1234';
  
    // Verifica se o CEP contém caracteres alfanuméricos antes de continuar
    if (isAlphanumeric(cepInvalido)) {
      cy.request({
          method: 'GET',
          url: `${baseUrl}/ws/${cepInvalido}/json/`,
          failOnStatusCode: false,
      }).then((response) => {
          expect(response.status).to.eq(400);
          expect(response.body).to.contain('Bad Request');
      });
  } else {
      throw new Error('O CEP não contém caracteres alfanuméricos');
  }

  
});

Cypress.Commands.add('retornarErroCepFormatoValidoMasInexistente', (baseUrl) => {
  const cepInexistente = '99999999';
  cy.request('GET', `${baseUrl}/ws/${cepInexistente}/json/`)
      .then((response) => {
        expect(response.body).to.have.property('erro', true)
      })
  })
