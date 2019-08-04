/// <reference types="Cypress" />
import * as faker from "faker";

describe("User registration", function() {
	context("Valid data", function() {
		before(function () {
			cy.wrap(
				faker.name.firstName().toLowerCase()
			).as('username');
		});

		it("should register user providing valid data", function() {
			cy.registerUser(
				this.username,
				faker.internet.email(),
				faker.internet.password()
			);
			cy
				.get('[data-test="logged-user"]')
				.should('have.text', this.username);
		});
	});

	context('Invalid data', () => {
		it('should not register user providing invalid data', () => {
			cy.registerUser(
				'@username',
				'incorrectEmail@email',
				'a'
			);
			cy.contains('username is invalid');
			cy.contains('email is invalid');
		});
	});
});
