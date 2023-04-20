/// <reference types="cypress" />

describe('Navigation checks', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('check that main page loaded', function () {
    cy.url().should('match', /\/$/);
    getActiveMain();
  });

  it('check header link presence and main page', function () {
    cy.url().should('match', /\/$/);
    const activeLink = getActiveMain();

    activeLink.click();

    getActiveMain();

    const formLink = cy.get('header a').contains('Form');
    formLink.should('exist');

    const aboutLink = cy.get('header a').contains('About us');
    aboutLink.should('exist');
  });

  it('check if navigation to form works', function () {
    const formLink = cy.get('header a').contains('Form');
    formLink.should('exist');

    formLink.click();

    const link = getActiveLink();
    link.should('have.text', 'Form');
  });

  it('check if navigation to about works', function () {
    const aboutLink = cy.get('header a').contains('About us');
    aboutLink.should('exist');
    aboutLink.click();

    const link = getActiveLink();
    link.should('have.text', 'About us');
  });

  function getActiveLink() {
    const activeLink = cy.get('header a.active');
    activeLink.should('exist');
    return activeLink;
  }

  function getActiveMain() {
    const activeLink = getActiveLink();
    activeLink.should('exist').and('have.text', 'Main');
    return activeLink;
  }
});
