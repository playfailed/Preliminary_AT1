// Utility functions
function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomchoice(Choices) {
    let Choosen = randomIntFromInterval(0, Choices.length - 1);
    return Choices[Choosen];
}

// Create a random Quadratic Equation that has is customisable range
function Create_Quadratic_Equation(table) {
    let root1 = randomIntFromInterval(table.root1min, table.root1max);
    let root2 = randomIntFromInterval(table.root2min, table.root2max);
    let pm = Math.round(Math.random()) % 2 === 0 ? -1 : 1;
    var a = pm * randomIntFromInterval(table.amin, table.amax);
    var b = a * -root1 + a * -root2;
    var c = a * root1 * root2;
    return {a, b, c, root1, root2};
}

// Rolling for a new Quadtraic until the Quadratic has integer roots
function Non_Fraction_Quadratic(table) {
    var obj = Create_Quadratic_Equation(table);
    while (!Number.isInteger(obj.c)) {
        obj = Create_Quadratic_Equation(table);
    }
    return obj;
}

// Function to format numbers
function FormatNumber(num, constant) {
    let str = num.toString();
    if (num === 0) {
        return "";
    }
    if (num === 1 && constant !== "") {
        str = str.replace('1', '');
    } else if (num === -1 && constant !== "") {
        str = str.replace('-1', '-');
    }
    if (constant !== "x<sup>2</sup>" && constant !== "(" && constant !== "x(" && str.indexOf("-")) {
        str = "+" + str;
    }
    str = str + constant;
    return str;
}

// Function to save user input to Results Database
function saveQuizResults(data) {
    var csrftoken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    fetch('/eduprod/save_quiz_results', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .catch((error) => console.error('Error:', error));
}

// Main function to generate and display quiz questions
function hideElements(SectionCatergory) {
    // Hide Current Elements
    var allElements = document.body.getElementsByTagName('*');
    for (var i = 0; i < allElements.length; i++) {
        allElements[i].style.display = 'none';
    }

    // Create a question list
    const body = document.querySelector('body');
    const quizelement = document.createElement("div");
    quizelement.classList.add("grid-container");
    body.appendChild(quizelement);
    
    // Create an arry to track answers
    var answers = []

    // Create 15 quadratic questions
    for (var i = 1; i <= 15; i++) {
        // Create elements for question 
        const questionsectionselement = document.createElement('ul');
        questionsectionselement.classList.add('points');
        questionsectionselement.style.listStyleType = 'none';
        questionsectionselement.style.float = 'left';

        const questionelement = document.createElement('li');
        questionelement.style.textAlign = 'center';
        const instructionelement = document.createElement('li');
        instructionelement.setAttribute('id', i);

        questionsectionselement.appendChild(instructionelement);
        questionsectionselement.appendChild(questionelement);
        quizelement.appendChild(questionsectionselement);

        const form = document.createElement('form');
        const ans0input = document.createElement('input');
        const ans1input = document.createElement('input');
        const ans2input = document.createElement('input');
        const label0 = document.createElement('label');
        const label1 = document.createElement('label');
        const label2 = document.createElement('label');
        const label3 = document.createElement('label');
        const submitButton = document.createElement('input');
        
        form.setAttribute("action","/eduprod/save_quiz_results")
        form.setAttribute("method","POST")
        ans0input.setAttribute('type', 'text');
        ans1input.setAttribute('type', 'text');
        ans2input.setAttribute('type', 'text');
        ans0input.setAttribute('name', i + 'answer0'); 
        ans1input.setAttribute('name', i + 'answer1'); 
        ans2input.setAttribute('name', i + 'answer2');  
        ans0input.setAttribute('placeholder', 'a');
        ans1input.setAttribute('placeholder', 'α');
        ans2input.setAttribute('placeholder', 'β');
        submitButton.setAttribute('id', i);
        submitButton.setAttribute('type', 'submit');
        submitButton.setAttribute('value', 'Check');
        ans0input.style.display = "none";
        submitButton.style.float = "right";

        // Display elements on the html page
        form.appendChild(label0);
        form.appendChild(ans0input);
        form.appendChild(label1);
        form.appendChild(ans1input);
        form.appendChild(label2);
        form.appendChild(ans2input);
        form.appendChild(label3);
        form.appendChild(submitButton);

        questionsectionselement.appendChild(form);

        // Create a event for the sumbit button
        submitButton.addEventListener('click', function(event) {
            event.preventDefault();
            
            // Some Common Variables.
            var IsCorrect = false
            var question = questionelement.innerText
            var questionnumber = submitButton.id
            var ans0Value = ans0input.value; 
            var ans1Value = ans1input.value; 
            var ans2Value = ans2input.value; 
            var bgcolour;
            var useranswer;
            var answer;

            // Each If statment here basically checks for an answer for each question category type
            if (instructionelement.innerText === 'Solve for x') {
                let conition1 = Number(ans1Value) === answers[questionnumber-1].root1 && Number(ans2Value) === answers[questionnumber-1].root2
                var conition2 = Number(ans2Value) === answers[questionnumber-1].root1 && Number(ans1Value) === answers[questionnumber-1].root2

                useranswer = "Root1: " + ans1Value + " Root2: " + ans2Value
                answer = "Root1: " + answers[questionnumber-1].root1  + " Root2: " + answers[questionnumber-1].root2 

                if (conition1 || conition2) {
                    IsCorrect = true;
                    bgcolour = "green";
                } else {
                    bgcolour = "red";
                    questionelement.innerHTML = "Answer was x = " + answers[questionnumber-1].root1 + " or " + answers[questionnumber-1].root2
                }
            } else if (instructionelement.innerText === 'Factorise Fully') {
                var conition1 = Number(ans1Value) === -answers[questionnumber-1].root1 && Number(ans2Value) === -answers[questionnumber-1].root2
                var conition2 = Number(ans1Value) === -answers[questionnumber-1].root2 && Number(ans2Value) === -answers[questionnumber-1].root1

                useranswer = FormatNumber(ans0Value,"(") + "x"+FormatNumber(ans1Value,"")+")(x"+FormatNumber(ans2Value,"")+")";
                answer = FormatNumber(answers[questionnumber-1].a,"(") + "x" + FormatNumber(-answers[questionnumber-1].root1,"") + ")(x" + FormatNumber(-answers[questionnumber-1].root2,"") + ")";

                if (Number(ans0Value) === answers[questionnumber-1].a && (conition1 || conition2)) {
                    IsCorrect = true;
                    bgcolour = "green";
                } else {
                    bgcolour = "red";
                    questionelement.innerHTML = "Answer was " + FormatNumber(answers[questionnumber-1].a,"(") + "x" + FormatNumber(-answers[questionnumber-1].root1,"") + ")(x " + FormatNumber(-answers[questionnumber-1].root2,"") + ")"
                }
            } else if (instructionelement.innerText == 'Factorise using complete the square') {
                var d = answers[questionnumber-1].b/(2 * answers[questionnumber-1].a);
                var e = answers[questionnumber-1].c - ((answers[questionnumber-1].b ** 2)/(4 * answers[questionnumber-1].a));
                
                useranswer = FormatNumber(ans0Value,"(") + "x" + FormatNumber(ans1Value,"") + ")^2" + FormatNumber(ans2Value,"")
                answer = FormatNumber(answers[questionnumber-1].a,"(") + "x" + FormatNumber(d,"") + ")^2 " + FormatNumber(e,"")

                console.log(d,e)

                if (Number(ans0Value) === answers[questionnumber-1].a && Number(ans1Value) === d && Number(ans2Value) == e) {
                    bgcolour = "green";
                    IsCorrect = true;
                } else {
                    bgcolour = "red";
                    questionelement.innerHTML = "Answer was " + FormatNumber(answers[questionnumber-1].a,"(") + "x" + FormatNumber(d,"") + ")<sup>2</sup> " + FormatNumber(e,"")
                }
            } else if (instructionelement.innerText == 'Solve for x with ±') {
                var M = ((-answers[questionnumber-1].b)/(2 * answers[questionnumber-1].a));
                var D = (M*M) - answers[questionnumber-1].c/answers[questionnumber-1].a

                var Imginary = D < 0
                D = Math.abs(D)
                var U = (D)**0.5;
                var issimplifedroot = Number.isInteger(U);

                useranswer = "Constant: " + ans0Value + ". Difference: " + ans1Value + ans2Value
                answer = M + " ± " + (issimplifedroot ? U : "√"+D) + (Imginary ? "i" : "");

                if (Number(ans0Value) === M && (ans1Value === "√"+D || Number(ans1Value) === Number(U)) && ans2Value.includes('i') == Imginary) {
                    bgcolour = "green";
                    IsCorrect = true;
                } else {
                    bgcolour = "red";
                    questionelement.innerHTML = "Answer was " + M + " ± " + (issimplifedroot ? U : "√<root>"+D+"</root>") + (Imginary ? "i" : "");
                }
            } else if (instructionelement.innerText == 'Find the mid point of the equation') {
                var M = ((answers[questionnumber-1].root1 + answers[questionnumber-1].root2)/2);
                useranswer = "Midpoint: " + ans1Value
                answer = M

                if (Number(ans1Value) === Number(M)) {
                    IsCorrect = true;
                    bgcolour = "green";
                } else {
                    bgcolour = "red";
                    questionelement.innerHTML = "Answer was " + M;
                }
            }

            // Changes the question elements to have user feedback.
            ans0input.disabled = true;
            ans1input.disabled = true;
            ans2input.disabled = true;
            submitButton.disabled = true;
            questionsectionselement.style.backgroundColor = bgcolour;

            // Saves User Input to Results Database
            saveQuizResults({
                question_text: question,
                answer_text: answer,
                users: document.querySelector('meta[name="user"]').getAttribute('content'),
                iscorrect: IsCorrect,
                useranswer: useranswer,
                category: SectionCatergory,
                subcategory: instructionelement.innerText,
            });

            // A Boolean flag to check if user is done
            var isdone = true

            // Checking if there is any input still available
            for (const child of quizelement.children) {
                var form = child.querySelector('form');
                for (const input of form.children) {
                    if (input.disabled === false) {
                        isdone = false
                        break
                    }
                }
            }

            // Create an exit button if user is done
            if (isdone) {
                const endblock = document.createElement('ul');
                endblock.classList.add('points');
                quizelement.appendChild(endblock);
                
                const exit = document.createElement('a');
                exit.innerText = "Exit";
                exit.style.color = "black";
                exit.style.padding = "0px";
                exit.style.margin = "auto";
                exit.style.float = "rightl";
                exit.setAttribute('href', "");
                endblock.appendChild(exit);
            }
        });

        // Create a quadratic equation
        var quadratic = Non_Fraction_Quadratic({
            amin: 1,
            amax: Math.ceil(i/3),
            root1min: -i*3,
            root1max: i*3,
            root2min: -i*3,
            root2max: i*3,
        });

        // Create a random selected question type
        var questionsubcategory;

        // A dynamic question type depending what section the user is at
        if (SectionCatergory == "Factorise") {
            questionsubcategory = randomchoice(['Solve for x','Factorise Fully'])
        } else if (SectionCatergory == "Complete") {
            questionsubcategory = randomchoice(['Solve for x with ±','Factorise using complete the square'])   
        } else if (SectionCatergory == "Formula") {
            var quadratic = Create_Quadratic_Equation({
                amin: 1,
                amax: i,
                root1min: -i*i,
                root1max: i*i,
                root2min: -i*i,
                root2max: i*i,
            });
            questionsubcategory = randomchoice(['Solve for x with ±',"Solve for x","Find the mid point of the equation"])
        } else if (SectionCatergory == "Test") {
            questionsubcategory = randomchoice(['Solve for x','Factorise Fully','Factorise using complete the square','Solve for x with ±',"Solve for x","Find the mid point of the equation"])
        }

        // Format the question depending the question type
        if (questionsubcategory === 'Solve for x') {
            questionelement.innerHTML = FormatNumber(quadratic.a,'x<sup>2</sup>') + FormatNumber(quadratic.b, 'x') + FormatNumber(quadratic.c,'') + ' = 0';
            label1.innerHTML = "x = ";
            label2.innerHTML = " or ";
        } else if (questionsubcategory === 'Factorise Fully') {
            questionelement.innerHTML = FormatNumber(quadratic.a,'x<sup>2</sup>') + FormatNumber(quadratic.b, 'x') + FormatNumber(quadratic.c,'');
            ans0input.style.display = "inline";
            label1.innerHTML = "(x+";
            label2.innerHTML = ")(x+";
            label3.innerHTML = ")";
        } else if (questionsubcategory === 'Solve for x with ±') {
            questionelement.innerHTML = FormatNumber(quadratic.a,'x<sup>2</sup>') + FormatNumber(quadratic.b, 'x') + FormatNumber(quadratic.c,'') + ' = 0';
            ans0input.style.display = "inline";
            label0.innerHTML = "x = ";
            ans0input.setAttribute('placeholder', 'α');
            label1.innerHTML = " ± ";
            ans1input.setAttribute('placeholder', 'β');
            ans2input.setAttribute('placeholder', 'add i if √-1');
        } else if (questionsubcategory === 'Factorise using complete the square') {
            questionelement.innerHTML = FormatNumber(quadratic.a,'x<sup>2</sup>') + FormatNumber(quadratic.b, 'x') + FormatNumber(quadratic.c,'');
            ans0input.style.display = "inline";
            label1.innerHTML = "(x ";
            label2.innerHTML = ")<sup>2</sup> ";
        } else if (questionsubcategory === 'Find the mid point of the equation') {
            questionelement.innerHTML = FormatNumber(quadratic.a,'x<sup>2</sup>') + FormatNumber(quadratic.b, 'x') + FormatNumber(quadratic.c,'') + ' = 0';
            label1.innerHTML = "x = ";
            ans1input.setAttribute('placeholder', 'Mid Point Value');
            ans2input.style.display = "none";
        }

        // Display the question type
        instructionelement.innerText = questionsubcategory

        // Save the answers to an array 
        answers.push({
            root1: quadratic.root1,
            root2: quadratic.root2, 
            a: quadratic.a,
            b: quadratic.b,
            c: quadratic.c,
        }); 
    }   
}
