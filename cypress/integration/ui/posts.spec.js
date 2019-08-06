/// <reference types="Cypress" />

import * as faker from 'faker';

describe('Posts actions', function() {
	beforeEach(function() {
		cy.fixture('user').as('user');
		cy.wrap(faker.lorem.word()).as('articleTitle');
		cy.wrap(faker.lorem.words()).as('articleContent');
	});

	beforeEach(function () {
		cy.loginApi(this.user.email, this.user.password);
		cy.deleteUserPosts(this.user.username);
		cy.createPostApi(
			this.articleTitle,
			faker.lorem.sentence(),
			faker.lorem.words(),
			faker.random.word()
		).then(response => {
			cy.visit(`article/${response.body.article.slug}`);
		});
	});

	context('Managing posts', function() {
		it('should be able to delete post', function() {
			cy
				.get('button > .ion-trash-a')
				.click();
			cy
				.contains('Global Feed')
				.click();
			cy
				.get('.article-preview h1')
				.should('have.length.greaterThan', 0)
				.should('not.contain.text', this.articleTitle);
		});
	
		it('should be able to edit post', function() {
			cy
				.get('a > i.ion-edit')
				.click();
			cy
				.get('textarea')
				.clear()
				.type(this.articleContent);
			cy
				.get('button')
				.click();
			cy
				.get('.article-content p')
				.should('have.text', this.articleContent);
		});
	});

	context('Managing post comments', function() {
		it('should be able to delete a comment', function() {
			cy
				.get('.comment-form textarea')
				.type('Sample Post Comment');
			cy
				.get('.comment-form button')
				.click();
			cy
				.get('div.card p.card-text')
				.as('comment')
				.should('have.text', 'Sample Post Comment');
			cy
				.get('div.card i.ion-trash-a')
				.click();
			cy
				.get('@comment')
				.then(el => cy.wrap(el).should('not.exist'));
		});
	});

	context('Managing favourite posts', function() {
		it('should be able to add post to favourites', function() {
			cy.visit('/');
			cy
				.contains('Global Feed')
				.click();
			cy
				.get('button > i', {timeout: 10000})
				.first()
				.click();
			cy
				.get('button')
				.contains('1');
			cy
				.visit(`@${this.user.username}/favorites`);
			cy
				.get('div.article-preview h1')
				.then(elements => {
					expect(elements).to.have.length(1);
					expect(elements.text()).to.eq(this.articleTitle);
				});
		});
	});
});