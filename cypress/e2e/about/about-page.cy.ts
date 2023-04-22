/// <reference types="cypress" />

import { DISCLAIMER_INFO, TEST_MESSAGE, WELCOME_MESSAGE } from './about-page.texts';

describe('About page', () => {
  beforeEach(() => {
    cy.visit('/about');
  });

  it('check that important parts are present', function () {
    cy.get('div.infofloater').should('be.visible').and('contain.text', TEST_MESSAGE);
    const img = cy.get('img.logo.react');
    img.should('exist');
    img.should('have.attr', 'src');

    cy.contains(DISCLAIMER_INFO).should('exist');
    cy.contains(WELCOME_MESSAGE).should('exist');
    // should get hidden
    cy.wait(1000).get('div.infofloater').should('not.exist');
  });
});
