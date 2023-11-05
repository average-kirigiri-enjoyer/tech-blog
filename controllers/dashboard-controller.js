//importing packages, models, & utils
const router = require('express').Router();
const {Post} = require('../models');
const loggedInAuth = require('../utils/loggedInAuth');
require('dotenv').config();
//==============================================================

//GET route to view the user's dashboard page
// =============================================================
router.get('/', loggedInAuth, async (req, res) =>
{
	try
	{
		const postData = await Post.findAll(
		{
			where:
			{
				user_id: req.session.user_id,
			},
		});
		const posts = postData.map((post) => post.get({plain: true}));

		console.log(posts);

		res.status(200).render('dashboard',
		{
			posts,
			logged_in: req.session.logged_in,
			user_id: req.session.user_id,
		});
	}
	catch (err)
	{
		res.status(500).json(err);
	}
});
//==============================================================

//GET route to render the blog post edit page
//==============================================================
router.get('/edit/:id', async (req, res) =>
{
	const blogPostData = await Post.findByPk(req.params.id, {include: [{model: Comment}]});
	const blogPost = blogPostData.get({plain: true});

	console.log(blogPostData);
	console.log(blogPost);

	res.render('new-post',
	{
		blogPost,
		loggedIn: req.session.loggedIn
	});
});
//==============================================================

module.exports = router;