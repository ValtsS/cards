/// <reference types="cypress" />

import { contains } from 'cypress/types/jquery';

describe('About page', () => {
  beforeEach(() => {
    cy.visit('/about');
  });

  it('check that important parts are present', function () {
    const img = cy.get('img.logo.react');
    img.should('exist');
    img.should('have.attr', 'src', '/src/assets/react.svg');
  });
});
