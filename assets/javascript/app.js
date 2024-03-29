
//This loads HTML, CSS before JavaScript & jQuery
    $(document).ready(function() {

//This hides the remaining time; listens for the START GAME click; activates guess checker
    $('#remaining-time').hide();
    $('#start-game').on('click', trivia.startGame);
    $(document).on('click', '.option', trivia.guessChecker);
    })

//These are global variables for trivia
    var trivia = {
        //baseline properties
        correct: 0,
        incorrect: 0,
        unanswered: 0,
        currentSet: 0,
        timer: 10,
        timerOn: false,
        timerId: '',
        //questions
        questions: {
            q1: 'Who is the inventor of opera?',
            q2: 'When did opera first appear?',
            q3: 'What was the very first opera?',
            q4: 'What was the first English-language opera?',
            q5: 'Wolfgang Amadeus Mozart is best known for which style of opera?',
            q6: 'Who was the last and only castrato to be recorded?'
        },
        //options
         options: {   
            q1: ['Giuseppe Verdi', 'Jacopo Peri', 'Claudio Monteverdi'],
            q2: ['1598', '1698', '1798'],
            q3: ['Pagliaccio', 'Orfeo', 'Dafne'],
            q4: ['Hercules', 'Venus and Adonis','Dido and Aeneas'],
            q5: ['Opera comica', 'Opera seria', 'Opera nuova'],
            q6: ['Farinelli', 'Senesino', 'Moreschi']
        },
        //answers
        answers: {
            q1: 'Jacopo Peri',
            q2: '1598',
            q3: 'Dafne',
            q4: 'Venus and Adonis',
            q5: 'Opera comica',
            q6: 'Moreschi'
        },
        //Functions(Methods) to start the game
            startGame: function() {
                trivia.currentSet = 0;
                trivia.correct = 0;
                trivia.incorrect = 0;
                trivia.unanswered = 0;
                clearInterval(trivia.timerId);

            //Display game
            $('#game').show();

            //Empty results
            $('#results').text('');
            
            //Display timer
            $('#timer').text(trivia.timer);

            //Hide the start game button
            $('#start-game').hide();

            //Hide the text "are you a music buff, etc."
            $('#card-text').hide();

            //Display questions
            $('#questions').show();

            //Display remaining time
            $('#remaining-time').show();

            //Trigger first question
            trivia.nextQuestion();

            },

        //Function(Method) to loop through trivia questions
            nextQuestion: function(){

            //Sets timer for 10 seconds
            trivia.timer= 10;
            $('#timer').removeClass('last-seconds');
            $('#timer').text(trivia.timer);
            
            // to prevent timer speed up
            if(!trivia.timerOn){
              trivia.timerId = setInterval(trivia.timerRunning, 1000);
            }
            
            // gets all the questions then indexes the current questions
            var questionContent = Object.values(trivia.questions)[trivia.currentSet];
            $('#questions').text(questionContent);
            
            // an array of all the user options for the current question
            var questionOptions = Object.values(trivia.options)[trivia.currentSet];
            
            // creates all the trivia guess options in the html
            $.each(questionOptions, function(index, key){
              $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
            })
            
          },
          // method to decrement counter and count unanswered if timer runs out
          timerRunning : function(){
            // if timer still has time left and there are still questions left to ask
            if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
              $('#timer').text(trivia.timer);
              trivia.timer--;
                if(trivia.timer === 4){
                  $('#timer').addClass('last-seconds');
                }
            }
            // the time has run out and increment unanswered, run result
            else if(trivia.timer === -1){
              trivia.unanswered++;
              trivia.result = false;
              clearInterval(trivia.timerId);
              resultId = setTimeout(trivia.guessResult, 1000);
              $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
            }
            // if all the questions have been shown end the game, show results
            else if(trivia.currentSet === Object.keys(trivia.questions).length){
              
              // adds results of game (correct, incorrect, unanswered) to the page
              $('#results')
                .html('<h3>Thank you for playing!</h3>'+
                '<p>Correct: '+ trivia.correct +'</p>'+
                '<p>Incorrect: '+ trivia.incorrect +'</p>'+
                '<p>Unaswered: '+ trivia.unanswered +'</p>'+
                '<p>Please play again!</p>');
              
              // hide game sction
              $('#game').hide();
              
              // show start button to begin a new game
              $('#start').show();
            }
            
          },
          // method to evaluate the option clicked
          guessChecker : function() {
            
            // timer ID for gameResult setTimeout
            var resultId;
            
            // the answer to the current question being asked
            var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
            
            // if the text of the option picked matches the answer of the current question, increment correct
            if($(this).text() === currentAnswer){
              // turn button green for correct
              $(this).addClass('btn-success').removeClass('btn-info');
              
              trivia.correct++;
              clearInterval(trivia.timerId);
              resultId = setTimeout(trivia.guessResult, 1000);
              $('#results').html('<h3>Correct Answer!</h3>');
            }
            // else the user picked the wrong option, increment incorrect
            else{
              // turn button clicked red for incorrect
              $(this).addClass('btn-danger').removeClass('btn-info');
              
              trivia.incorrect++;
              clearInterval(trivia.timerId);
              resultId = setTimeout(trivia.guessResult, 1000);
              $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
            }
            
          },
          // method to remove previous question results and options
          guessResult : function(){
            
            // increment to next question set
            trivia.currentSet++;
            
            // remove the options and results
            $('.option').remove();
            $('#results h3').remove();
            
            // begin next question
            trivia.nextQuestion();
             
          }
        
        }