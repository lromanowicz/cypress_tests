import { utc } from "moment";

describe('Post actions', function() {
	beforeEach(function() {
		cy
			.fixture('user')
			.as('user');
	});

	beforeEach(function() {
		cy.loginApi(this.user.email, this.user.password);
		cy.deleteUserPosts(this.user.username);
	});

	context('invalid data', function() {
		it('should not be able to create an empty post', () => {
			cy.createPostApi(
				'',
				'',
				'',
				[]
			).then(response => {
				expect(response.status).to.not.eq(200);
			});
		});

		it('should not be able to add an empty comment to the post', () => {
			cy.createPostApi(
				'Sample Title',
				'Sample Description',
				'Sample Content',
				'Sample Tag'
			).then(response => {
				cy
					.createComment(response.body.article.slug, '')
					.then(response => expect(response.status).to.not.eq(200));
			});
		})
	})
});