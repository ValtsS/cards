/// <reference types="cypress" />

describe('Main page', () => {
  it('it should throw errors', function () {
    cy.intercept('POST', '**/graphql', (req) => {
      req.destroy();
    });
    cy.visit('/');
  });

  it('it should throw errors on modal', function () {
    cy.intercept('POST', '**/graphql').as('getCards');
    cy.visit('/');

    waitForQuery();

    cy.intercept('POST', '**/graphql', (req) => {
      req.destroy();
    });

    const firstCard = cy.get('main .card-container > .card').first().should('exist');
    firstCard.click();
    cy.get('[data-testid="spinner"]').should('be.visible');
    cy.get('.errorfloater').should('be.visible');
  });

  function waitForQuery() {
    cy.wait('@getCards').wait(250);

    getApiReady().then((val) => {
      const trimmedVal = val.toLowerCase().trim();
      expect(trimmedVal).to.be.oneOf(['succeeded', 'idle']);
    });
  }

  function getApiReady() {
    return cy.get('.api-state-container > :nth-child(1) > span').should('exist').invoke('text');
  }
});
