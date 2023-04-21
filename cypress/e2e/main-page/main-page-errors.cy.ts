/// <reference types="cypress" />

describe('Main page', () => {
  it('it should throw errors', function () {
    cy.intercept('POST', '**/graphql', (req) => {
      req.destroy();
    });
    cy.visit('/');
    cy.get('.errorfloater').should('be.visible');
  });
});
