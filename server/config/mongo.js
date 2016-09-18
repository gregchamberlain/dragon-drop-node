module.exports = process.env.NODE_ENV === 'production' ?
'mongodb://admin:chester131@ds033106.mlab.com:33106/dragon-drop' :
'mongodb://localhost/dragon-drop';
