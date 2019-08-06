/// <reference types="Cypress" />

import * as faker from 'faker';

describe('User authorization', () => {
	context('Registration', () => {
		it('should not register user without password', () => {
			cy.registerUserApi(
				faker.name.firstName().toLowerCase(),
				faker.internet.email(),
				''
			).then(response => {
				expect(response.status).to.not.eq(200);
				expect(response.body.errors.password).to.eq('can\'t be blank');
			});
		});

		it('should not register user without username', () => {
			cy.registerUserApi(
				'',
				faker.internet.email(),
				faker.internet.password()
			).then(response => {
				expect(response.status).to.eq(422);
				expect(response.body.errors.username).to.eq('can\'t be blank');
			});
		});
	});
});