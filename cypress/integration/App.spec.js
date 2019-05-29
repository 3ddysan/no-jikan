describe('Acceptance Tests', () => {

    it('Start/Pause timer', () => {
        cy.visit('/');
        cy.clock();
        cy.get('[data-testid=startButton]').click()
        cy.tick(5000)
        cy.get(':nth-child(3) > .unit').should('have.text', '05')
    })
});

