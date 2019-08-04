/// <reference types="Cypress" />

describe('User authorization', () => {
	context('invalid credentials', () => {
		it('should  not login user with invalid credentials', () => {
			cy.login(
				'incorrectEmail@asd.com',
				'badPass'
			);
			cy.contains('email or password is invalid');
		});
	});
});