/* Author: Soixante circuits
2012
*/
"use strict";
var quizz={};
quizz.score = 0;
quizz.total = questions.questions.length;
quizz.start = 1;
quizz.journey = function(){
  var date = new Date();
  if( (date.getHours() <13 ) && (date.getHours() > 5)){
    return "matinée";
  }else if( (date.getHours() < 5) || (date.getHours() > 18)){
    return "soirée";
  }else{
    return "journée";
  }
};

$(function(){
  if(window._gaq!==undefined)
    _gaq.push(['_trackEvent', 'Quizz', 'Start', ' ']);
  
  $('#main').hide();

  var source   = $("#questions-tpl").html();
  var template = Handlebars.compile(source);
  var content = template(questions);
  var correct = false;
  var current_question = quizz.start;

  $("h1").html(questions.title);
  $("#main").html(content);

  $("#main").find('.next-reply').each(function(){

    $(this).click(function(){
      var no_check = true;
      $("#question-group-"+current_question+" input:radio['']").each(function(){
        if($(this).attr('checked') === "checked"){
          no_check = false;
          correct = $(this).attr('correct');
        }
      });
      if(no_check){
        alert("Désolé mais vous devez selectionner une réponse pour continuer.");
        return false;
      }else{
        var cls = '';
        var msg = '';
        if(correct){
          console.log('bravo');
          msg = 'Bien joué ! Bonne réponse !';
          cls = 'alert-success';
          quizz.score++;
        }else{
          msg = 'Mauvaise réponse !';
          cls = 'alert-error'
        }
        $("#reply-"+current_question).addClass(cls);
        $("#reply-"+current_question).html(msg);     
      }
      $(this).parents('.question').hide();
      $(this).parents('.question_container').find('.reply').show();
    });
  });

  $("#main").find('.next-question').each(function(){
    $(this).click(function(){
      $("#question-group-"+current_question).fadeOut();
      if(current_question !== quizz.total){
        current_question++;
        $("#question-group-"+current_question).find(".question").show();
        $("#question-group-"+current_question).fadeIn();
        console.log("Next-question");  
      }else{
        $("#main").hide();
        if(window._gaq!==undefined)
          _gaq.push(['_trackEvent', 'Quizz', 'Finished', 'score : ' + quizz.score]);
        var text = "<p>"+questions.end+quizz.journey()+".</p>"+"<p>Votre score est de : "+quizz.score+"/"+quizz.total+"</p><button class='restart btn btn-inverse'>Recommencer</button>";
        var twitter_share = '<a href="https://twitter.com/intent/tweet?screen_name=J\'ai obtenu '+quizz.score+' bonnes réponses au quizz #hairscience de @l\'oreal - Me battrez-vous ? URL" class="twitter-mention-button" data-related="loreal">Tweet to @loreal</a><script>!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src="//platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");</script>'
        $("#score").html(text + "<br/>" + twitter_share).fadeIn();

        $(".restart").click(function(){
          current_question = quizz.start;
          quizz.score = 0;
          $("#score").fadeOut();
          $(".reply").hide();

          $("input:radio['']").each(function(){
            $(this).prop('checked', false);
          });
          $("#question-group-"+current_question).find(".question").show();
          $("#question-group-"+current_question).fadeIn();
          $("#main").fadeIn();
        });
      }
    });
  });

  $("#question-group-"+current_question).fadeIn();
  $("#main").fadeIn();
});