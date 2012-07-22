
/*
 * Primary pages
 */

exports.index = function(req, res){
	res.render('index', { title: 'Home' })
};

exports.about = function(req, res){
	res.render('page', { title: 'About' })
};

exports.play = function(req, res){
	res.render('page', { title: 'Play' })
};