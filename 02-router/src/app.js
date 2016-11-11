import $ from 'jquery'
import router from './router'
import homeTpl from './templates/home.hbs'
import contactTpl from './templates/contact.hbs'
import notFoundTpl from './templates/not-found.hbs'
import magnusTpl from './templates/magnus.hbs'
import sergeyTpl from './templates/sergey.hbs'

const $app = $('#app') // <main> .. contains the main content of the document

function index() {
  $app.html(homeTpl())
}

function contact() {
  $app.html(contactTpl())
}

function notFound() {
  $app.html(notFoundTpl())
}

function playerMagnus() {
  $app.html(magnusTpl())
}

function playerSergey() {
  $app.html(sergeyTpl())
}

router('/', index)
router('/contact', contact)
router('/players/:player', function(playerName) {
  switch(playerName) {
    case 'magnus':
        playerMagnus();
      break;
    case 'sergey':
        playerSergey();
      break;
    default:
      console.log('Unknown player "' + playerName + '".')
      notFound();
  }
});
router('*', notFound)
router()
