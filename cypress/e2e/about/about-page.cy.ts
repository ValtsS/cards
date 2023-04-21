/// <reference types="cypress" />

import { DISCLAIMER_INFO, TEST_MESSAGE, WELCOME_MESSAGE } from './about-page.texts';

describe('About page', () => {
  beforeEach(() => {
    cy.visit('/about').wait(200);
  });

  it('check that important parts are present', function () {
    cy.get('div.infofloater').should('be.visible').and('contain.text', TEST_MESSAGE);
    const img = cy.get('img.logo.react');
    img.should('exist');
    img.should('have.attr', 'src', '/src/assets/react.svg');

    cy.contains(DISCLAIMER_INFO).should('exist');
    cy.contains(WELCOME_MESSAGE).should('exist');
  });
});
