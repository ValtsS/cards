/// <reference types="cypress" />

describe('Navigation checks', () => {
  const TEXT_FORM = 'Form';
  const TEXT_MAIN = 'Main';
  const TEXT_ABOUT = 'About us';
  const TEXT_BACK2MAIN = 'Go back to the main page';

  const allLinkTexts = [TEXT_ABOUT, TEXT_FORM, TEXT_MAIN];

  beforeEach(() => {
    cy.visit('/');
  });

  it('check that 404 works', function () {
    cy.visit('/404nonexistant');
    cy.get('a').contains(TEXT_BACK2MAIN).should('exist');
  });

  it('check that main page loaded', function () {
    cy.url().should('match', /\/$/);
    getActiveMain();
    checkPresenceOfLinks();
  });

  it('check header link presence and main page', function () {
    cy.url().should('match', /\/$/);
    const activeLink = getActiveMain();

    activeLink.click();

    getActiveMain();

    const formLink = cy.get('header a').contains(TEXT_FORM);
    formLink.should('exist');

    const aboutLink = cy.get('header a').contains(TEXT_ABOUT);
    aboutLink.should('exist');
    checkPresenceOfLinks();
  });

  it('check if navigation to form works', function () {
    const formLink = cy.get('header a').contains(TEXT_FORM);
    formLink.should('exist');

    formLink.click();

    const link = getActiveLink();
    link.should('have.text', TEXT_FORM);
    checkPresenceOfLinks();
  });

  it('check if navigation to about works', function () {
    const aboutLink = cy.get('header a').contains(TEXT_ABOUT);
    aboutLink.should('exist');
    aboutLink.click();

    const link = getActiveLink();
    link.should('have.text', TEXT_ABOUT);
    checkPresenceOfLinks();
  });

  function getActiveLink() {
    const activeLink = cy.get('header a.active');
    activeLink.should('exist');
    return activeLink;
  }

  function checkPresenceOfLinks() {
    allLinkTexts.forEach((text) => {
      cy.get('header a').contains(text).should('exist');
    });
  }

  function getActiveMain() {
    const activeLink = getActiveLink();
    activeLink.should('exist').and('have.text', TEXT_MAIN);
    activeLink.should('have.length', 1);
    return activeLink;
  }
});
