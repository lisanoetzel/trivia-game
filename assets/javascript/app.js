
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
            q5: 'Wolfgang Amadeus Mozart is best known for which style of opera?'
            q6: 'Who was the last and only castrato to be recorded?'
        },
        //options
         options: {   
            q1: ['Giuseppe Verdi', 'Jacopo Peri', 'Claudio Monteverdi'],
            q2: [1598, 1698, 1798],
            q3: ['Pagliaccio', 'Orfeo', 'Dafne'],
            q4: ['Hercules', 'Venus and Adonis','Dido and Aeneas']
            q5: ['Opera comica', 'Opera seria', 'Opera nuova']
            q6: ['Farinelli', 'Senesino', 'Moreschi']
        },
        //answers
        answers: {
            q1: 'Jacopo Peri',
            q2: 1598,
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
                clearInterval(timerId);

            //Display game
            $('#game').show();

            //Empty results
            $('#results').text('');
            
            //Display timer
            $('#timer').text(trivia.timer);

            //Hide the start game button
            $('#start-game').hide();

            //Display remaining time
            $('#remaining-time').show();

            }
        

    }