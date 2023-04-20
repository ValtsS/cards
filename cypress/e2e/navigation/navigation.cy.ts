/// <reference types="cypress" />

describe('Navigation checks', () => {
  const textForm = 'Form';
  const textMain = 'Main';
  const textAbout = 'About us';

  const allLinkTexts = [textAbout, textForm, textMain];

  beforeEach(() => {
    cy.visit('/');
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

    const formLink = cy.get('header a').contains(textForm);
    formLink.should('exist');

    const aboutLink = cy.get('header a').contains(textAbout);
    aboutLink.should('exist');
    checkPresenceOfLinks();
  });

  it('check if navigation to form works', function () {
    const formLink = cy.get('header a').contains(textForm);
    formLink.should('exist');

    formLink.click();

    const link = getActiveLink();
    link.should('have.text', textForm);
    checkPresenceOfLinks();
  });

  it('check if navigation to about works', function () {
    const aboutLink = cy.get('header a').contains(textAbout);
    aboutLink.should('exist');
    aboutLink.click();

    const link = getActiveLink();
    link.should('have.text', textAbout);
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
    activeLink.should('exist').and('have.text', textMain);
    activeLink.should('have.length', 1);
    return activeLink;
  }
});
