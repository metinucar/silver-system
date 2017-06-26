'use strict';

var $             = require('jquery'),
    phase         = $('.phase'),
    phaseHeader   = $('.phase__header'),
    phaseControl  = $('.phase__controls a'),
    cards         = $('.cards'),
    fibSequence   = ['0', '1', '2', '3', '5', '8', '13', '21', '34', '55', '89'];

// Show notification
var showNotification = function(cardIndex){

  if($('body .notification').length > 0) {
    $('.notification strong').text(cardIndex);
  } else {
    var cardNotification = $('<a href="#" class="notification">You have chosen card no. <strong>'+ cardIndex +'</strong></a>');
    cardNotification.appendTo('body').fadeIn().delay(5000).queue(function(){
      $(this).fadeOut().remove();
    });
  }

}

// Pick and assign random numbers to cards
var randomNumbers = function() {
  cards.find('a').each(function(){
    var number = fibSequence[Math.floor(fibSequence.length * Math.random())];
    $(this).attr('data-number', number);
  });
}

$(function() {

  // Assign random numbers
  randomNumbers();

  // Phase: Choosing a card
  cards.find('a').on('click', function(event){
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var cardIndex = $(this).index() + 1;
    if ($(this).hasClass('user-selected')) {
      $(this).removeClass('user-selected');
      $(document).find('.notification').trigger('click');
    } else {
      $(this).siblings('.user-selected').toggleClass('user-selected');
      $(this).toggleClass('user-selected');
      phase.attr('data-phase', '1');
      showNotification(cardIndex);
    }
  });

  // Phase: Waiting
  $(document).on('click', '[data-phase-next=2]', function(event) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    $(document).find('.notification').trigger('click');
    phase.attr('data-phase', '2');
    phaseControl.text('Please wait...').addClass('disabled').attr('data-phase-next', '3');
    phaseHeader.find('h2').text('Waiting for others');
    phaseHeader.find('p').text('Please wait while others choose their cards');
    cards.find('a').each(function(){
      var self = $(this);
      self.addClass('disabled');
    });

    // Simulate card selection for others
    var interval = setInterval(function () {
      var cardList = cards.find('a:not(.user-selected)');
      var element = cardList.eq(Math.floor(Math.random() * cardList.length));

      setTimeout( function() {
        element.addClass('others-selected');
      }, 300 );

      if ( cards.find('a.others-selected').length == cardList.length ) {
        clearInterval(interval);
        phaseControl.text('Reveal your card').removeClass('disabled');
      }

    }, 300 );

  });

  // Phase: Reveal (User)
  $(document).on('click', '[data-phase-next=3]', function(event) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var userCard = cards.find('a.user-selected'),
        userNumber = userCard.attr('data-number');
    userCard.find('span').text(userNumber);
    phaseControl.text('Reveal others').attr('data-phase-next', '4');
    phaseHeader.find('h2').text('Revealing cards');
    phaseHeader.find('p').text('The cards chosen in step one are revealed');
  });

  // Phase: Reveal (Others)
  $(document).on('click', '[data-phase-next=4]', function(event) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    var otherCards = cards.find('a.others-selected');
    otherCards.each(function(){
      var self = $(this);
      var otherNumber = self.attr('data-number');
      self.find('span').text(otherNumber);
    });

    phaseControl.text('Start over').attr('data-phase-next', '5');
  });

  // Phase: Start over
  $(document).on('click', '[data-phase-next=5]', function(event) {
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    phase.attr('data-phase', '0');
    phaseControl.text('Next').attr('data-phase-next', '2');
    phaseHeader.find('h2').text('Choose a card');
    phaseHeader.find('p').text('Please choose a card in order to proceed');
    randomNumbers();
    cards.find('a').each(function(){
      var self = $(this);
      self.removeAttr('class');
      self.find('span').text('?');
    });
  });

  // Close notification
  $(document).on('click', '.notification', function(event){
    event.preventDefault ? event.preventDefault() : event.returnValue = false;
    $(this).fadeOut().remove();
  });

});
