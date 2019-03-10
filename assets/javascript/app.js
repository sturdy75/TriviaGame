$(document).ready(function () {
    var options = [
        {
            question: "Is there, in fact, an underground bunker at DIA?",
            choice: ["True", "False"],
            answer: 0,
            photo: "assets/images/dia.jpg"
        },
        {
            question: "Did we ever actually land on the moon?",
            choice: ["True", "False"],
            answer: 0,
            photo: "assets/images/moon.jpg"
        },
        {
            question: "Did Columbus discover the americas?",
            choice: ["True", "False"],
            answer: 1,
            photo: "assets/images/columbus.jpg"
        },
        {
            question: "Is the earth really flat?",
            choice: ["True", "False"],
            answer: 1,
            photo: "assets/images/flatearth.jpg"
        },
        {
            question: "Are tacos kinda, like, the best?",
            choice: ["True", "False"],
            answer: 0,
            photo: "assets/images/tacos.jpg"
        },
        {
            question: "Sundried tomatoes are delicious!",
            choice: ["True", "False"],
            answer: 1,
            photo: "assets/images/sundried.jpg"
        },
        {
            question: "Do toilets flush the opposite way in Australia?",
            choice: ["True", "False"],
            answer: 1,
            photo: "assets/images/toilet.jpg"
        },
        {
            question: "Is the fishing this summer going to be amazing?",
            choice: ["True", "False"],
            answer: 0,
            photo: "assets/images/trout.jpg"

        },
        {
            question: "You are wearing a shirt.",
            choice: ["True", "False"],
            answer: 0,
            photo: "assets/images/shirt.jpg"

        },
        {
            question: "Too many people in this town?",
            choice: ["True", "False"],
            answer: 0,
            photo: "assets/images/toomanypeople.jpg"
        },
        {


        }];

    var correctCount = 0;
    var wrongCount = 0;
    var unanswerCount = 0;
    var timer = 15;
    var intervalId;
    var userGuess = "";
    var running = false;
    var qCount = options.length;
    var pick;
    var index;
    var newArray = [];
    var holder = [];



    $("#reset").hide();

    $("#start").on("click", function () {
        $("#start").hide();
        displayQuestion();
        runTimer();
        for (var i = 0; i < options.length; i++) {
            holder.push(options[i]);
        }
    })

    function runTimer() {
        if (!running) {
            intervalId = setInterval(decrement, 1000);
            running = true;
        }
    }

    function decrement() {
        $("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");
        timer--;

        if (timer === 0) {
            unanswerCount++;
            stop();
            $("#answerblock").html("<p>Outta time, buddy! The answer we were looking for is: " + pick.choice[pick.answer] + "</p>");
            hidepicture();
        }
    }

    function stop() {
        running = false;
        clearInterval(intervalId);
    }

    function displayQuestion() {
        index = Math.floor(Math.random() * options.length);
        pick = options[index];


        $("#questionblock").html("<h2>" + pick.question + "</h2>");
        for (var i = 0; i < pick.choice.length; i++) {
            var userChoice = $("<div>");
            userChoice.addClass("answerchoice");
            userChoice.html(pick.choice[i]);

            userChoice.attr("data-guessvalue", i);
            $("#answerblock").append(userChoice);

        }




        $(".answerchoice").on("click", function () {
            userGuess = parseInt($(this).attr("data-guessvalue"));

            if (userGuess === pick.answer) {
                stop();
                correctCount++;
                userGuess = "";
                $("#answerblock").html("<p>Exactamundo!</p>");
                hidepicture();

            } else {
                stop();
                wrongCount++;
                userGuess = "";
                $("#answerblock").html("<p>Incorrect! The right answer is : " + pick.choice[pick.answer] + "</p>");
                hidepicture();
            }
        })
    }


    function hidepicture() {
        $("#answerblock").append("<img src=" + pick.photo + ">");
        newArray.push(pick);
        options.splice(index, 1);

        var hidpic = setTimeout(function () {
            $("#answerblock").empty();
            timer = 15;

            //run the score screen if all questions answered
            if ((wrongCount + correctCount + unanswerCount) === qCount) {
                $("#questionblock").empty();
                $("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
                $("#answerblock").append("<h4> Correct: " + correctCount + "</h4>");
                $("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>");
                $("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>");
                $("#reset").show();
                correctCount = 0;
                wrongCount = 0;
                unanswerCount = 0;

            } else {
                runTimer();
                displayQuestion();

            }
        }, 3000);
    }
    $("#reset").on("click", function () {
        $("#reset").hide();
        $("#answerblock").empty();
        $("#questionblock").empty();
        for (var i = 0; i < holder.length; i++) {
            options.push(holder[i]);
        }
        runTimer();
        displayQuestion();
    })

})




