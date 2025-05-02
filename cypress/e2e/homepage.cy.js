describe('Homepage', () => {
  it('should load the homepage successfully', () => {
    cy.visit('/');
    cy.get('title').should('contain', 'Gophercamp');
    cy.log('[DEBUG_LOG] Homepage title contains "Gophercamp"');
  });

  it('should have navigation menu', () => {
    cy.visit('/');
    cy.get('nav').should('be.visible');
    cy.log('[DEBUG_LOG] Navigation menu is visible');
  });
});