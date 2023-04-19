/// <reference types="cypress" />

describe('Navigation checks', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('check that main page loaded', function () {
    cy.url().should('match', /\/$/);
    getActiveMain();
  });

  it('navigate', function () {
    cy.url().should('match', /\/$/);
    const activeLink = getActiveMain();

    activeLink.click();

    getActiveMain();
  });

  function getActiveMain() {
    const activeLink = cy.get('header a.active');
    activeLink.should('exist').and('have.text', 'Main');
    return activeLink;
  }
});
