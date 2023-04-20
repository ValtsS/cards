/// <reference types="cypress" />

import { DISCLAIMER_INFO, WELCOME_MESSAGE } from './about-page.texts';

describe('About page', () => {
  beforeEach(() => {
    cy.visit('/about');
  });

  it('check that important parts are present', function () {
    const img = cy.get('img.logo.react');
    img.should('exist');
    img.should('have.attr', 'src', '/src/assets/react.svg');

    cy.contains(DISCLAIMER_INFO).should('exist');
    cy.contains(WELCOME_MESSAGE).should('exist');
  });
});
