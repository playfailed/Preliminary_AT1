function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
  
function randomchoice(Choices) {
    let Choosen = randomIntFromInterval(0, Choices.length-1)
    return Choices[Choosen]
}

function Factorable_Quadratic(table) {
    let root1 = randomIntFromInterval(table.root1min, table.root1max);
    let root2 = randomIntFromInterval(table.root2min, table.root2max);
    let pm = Math.round(Math.random()) % 2 === 0 ? -1 : 1;
    
	var a = pm * randomIntFromInterval(table.amin, table.amax);
    var b = a * -root1 + a * -root2;
    var c = a * root1 * root2;

    return {a, b, c, root1, root2};
}

function Non_Fraction_Quadratic(table) {
    var obj = Factorable_Quadratic(table);
    
    while (!Number.isInteger(obj.c)) {
        var obj = Factorable_Quadratic(table);
    }

    return obj
}

function FormatNumber(num, constant) {
    let str = num.toString(); // Convert the number to a string
    
    if (num === 0) {
        return "";
    }

    if (num === 1 && constant !== "") {
        str = str.replace('1', '');
    }
    else if (num === -1 && constant !== "") {
        str = str.replace('-1', '-');
    }

    if (constant !== "x<sup>2</sup>" && constant !== "(" && constant !== "x(") {
        str = "+" + str 
    }
    
    str = str + constant;

    return str;
}

function saveQuizResults(data) {
    var csrftoken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
    fetch('/eduprod/save_quiz_results', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            // Include CSRF token if you're using Django's CSRF protection
            'X-CSRFToken': csrftoken,
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        return response.json();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function hideElements(SectionCatergory) {
    var allElements = document.body.getElementsByTagName('*');
    for (var i = 0; i < allElements.length; i++) {
        allElements[i].style.display = 'none';
    }

    const body = document.querySelector('body');
    const quizelement = document.createElement("div");
    quizelement.classList.add("grid-container");
    body.appendChild(quizelement);
    
    var answers = []

    var user = document.querySelector('meta[name="user"]').getAttribute('content');

    for (var i = 1; i <= 15; i++) {
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

        form.appendChild(label0);
        form.appendChild(ans0input);
        form.appendChild(label1);
        form.appendChild(ans1input);
        form.appendChild(label2);
        form.appendChild(ans2input);
        form.appendChild(label3);
        form.appendChild(submitButton);

        questionsectionselement.appendChild(form);

        submitButton.addEventListener('click', function(event) {
            event.preventDefault();
        
            var IsCorrect = false
            var question = questionelement.innerText
            var questionnumber = submitButton.id
            var ans0Value = ans0input.value; 
            var ans1Value = ans1input.value; 
            var ans2Value = ans2input.value; 
            var useranswer;
            var answer;

            if (instructionelement.innerText === 'Solve for x') {
                let conition1 = Number(ans1Value) === answers[questionnumber-1].root1 && Number(ans2Value) === answers[questionnumber-1].root2
                var conition2 = Number(ans2Value) === answers[questionnumber-1].root1 && Number(ans1Value) === answers[questionnumber-1].root2

                useranswer = "Root1: " + ans1Value + " Root2: " + ans2Value
                answer = "Root1: " + answers[questionnumber-1].root1  + " Root2: " + answers[questionnumber-1].root2 

                if (conition1 || conition2) {
                    IsCorrect = true;
                    questionsectionselement.style.backgroundColor = "green";
                } else {
                    questionsectionselement.style.backgroundColor = "red";
                    questionelement.innerHTML = "Answer was x = " + answers[questionnumber-1].root1 + " or " + answers[questionnumber-1].root2
                }
            } else if (instructionelement.innerText === 'Factorise Fully') {
                var conition1 = Number(ans1Value) === -answers[questionnumber-1].root1 && Number(ans2Value) === -answers[questionnumber-1].root2
                var conition2 = Number(ans1Value) === -answers[questionnumber-1].root2 && Number(ans2Value) === -answers[questionnumber-1].root1

                useranswer = FormatNumber(ans0Value) + "(x+("+FormatNumber(ans1Value)+"))(x+("+FormatNumber(ans2Value)+")";
                answer = FormatNumber(answers[questionnumber-1].a,"(") + "x" + FormatNumber(-answers[questionnumber-1].root1,"") + ")(x" + FormatNumber(-answers[questionnumber-1].root2,"") + ")";

                console.log()

                if (Number(ans0Value) === answers[questionnumber-1].a && (conition1 || conition2)) {
                    IsCorrect = true;
                    questionsectionselement.style.backgroundColor = "green";
                } else {
                    questionsectionselement.style.backgroundColor = "red";
                    questionelement.innerHTML = "Answer was " + FormatNumber(answers[questionnumber-1].a,"(") + "x" + FormatNumber(-answers[questionnumber-1].root1,"") + ")(x " + FormatNumber(-answers[questionnumber-1].root2,"") + ")"
                }
            } else if (instructionelement.innerText == 'Factorise using complete the square') {
                var d = answers[questionnumber-1].b/(2 * answers[questionnumber-1].a);
                var e = answers[questionnumber-1].c - ((answers[questionnumber-1].b ** 2)/(4 * answers[questionnumber-1].a));
                
                useranswer = ans0Value + "(x" + ans1Value + ")^2 " + ans2Value
                answer = FormatNumber(answers[questionnumber-1].a,"(") + "x" + FormatNumber(d,"") + ")^2 " + FormatNumber(e,"")

                if (Number(ans0Value) === answers[questionnumber-1].a && Number(ans1Value) === d && Number(ans2Value) == e) {
                    questionsectionselement.style.backgroundColor = "green";
                    IsCorrect = true;
                } else {
                    questionsectionselement.style.backgroundColor = "red";
                    questionelement.innerHTML = "Answer was " + FormatNumber(answers[questionnumber-1].a,"(") + "x " + FormatNumber(d,"") + ")<sup>2</sup> " + FormatNumber(e,"")
                }
            } else if (instructionelement.innerText == 'Solve for x with ±') {
                var M = ((-answers[questionnumber-1].b)/(2 * answers[questionnumber-1].a))/answers[questionnumber-1].a;
                var D = M**2 - answers[questionnumber-1].c
                var Imginary = D < 0
                D = Math.abs(D)
                var U = (D)**0.5;
                var issimplifedroot = Number.isInteger(U);
                
                useranswer = "Constant: " + ans0Value + ". Difference: " + ans1Value
                answer = M + " ± " + (issimplifedroot ? U : "√"+D);

                if (Number(ans0Value) === M && (ans1Value === "√"+D || ans1Value === U) && ans2Value.includes('i') == Imginary) {
                    questionsectionselement.style.backgroundColor = "green";
                    IsCorrect = true;
                } else {
                    questionsectionselement.style.backgroundColor = "red";
                    questionelement.innerHTML = "Answer was " + M + " ± " + (issimplifedroot ? U : "√<root>"+D+"</root>") + (Imginary ? "i" : "");
                }
            } else if (instructionelement.innerText == 'Find the mid point of the equation') {
                var M = ((answers[questionnumber-1].root1 + answers[questionnumber-1].root2)/2);
                useranswer = "Midpoint: " + ans1Value
                answer = M

                console.log(M,ans1Value)

                if (Number(ans1Value) === Number(M)) {
                    IsCorrect = true;
                    questionsectionselement.style.backgroundColor = "green";
                } else {
                    questionsectionselement.style.backgroundColor = "red";
                    questionelement.innerHTML = "Answer was " + M;
                }
            }
            
            ans0input.disabled = true;
            ans1input.disabled = true;
            ans2input.disabled = true;
            submitButton.disabled = true;

            saveQuizResults({
                question_text: question,
                answer_text: answer,
                users: user,
                iscorrect: true,
                useranswer: useranswer,
                category: SectionCatergory,
                subcategory: instructionelement.innerText,
            });

            var isdone = true

            for (const child of quizelement.children) {
                var form = child.querySelector('form');
                for (const input of form.children) {
                    if (input.disabled === false) {
                        isdone = false
                        break
                    }
                }
            }

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

        var quadratic = Non_Fraction_Quadratic({
            amin: 1,
            amax: Math.ceil(i/3),
            root1min: -i*3,
            root1max: i*3,
            root2min: -i*3,
            root2max: i*3,
        });

        var questionsubcategory;

        if (SectionCatergory == "Factorise") {
            questionsubcategory = randomchoice(['Solve for x','Factorise Fully'])
        } else if (SectionCatergory == "Complete") {
            questionsubcategory = randomchoice(['Solve for x with ±','Factorise using complete the square'])   
        } else if (SectionCatergory == "Formula") {
            var quadratic = Factorable_Quadratic({
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

        instructionelement.innerText = questionsubcategory

        if (questionsubcategory === 'Solve for x') {
            questionelement.innerHTML = FormatNumber(quadratic.a,'x<sup>2</sup>') + ' ' + FormatNumber(quadratic.b, 'x') + ' ' + FormatNumber(quadratic.c,'') + ' = 0';
            label1.innerHTML = "x = ";
            label2.innerHTML = " or ";
        } else if (questionsubcategory === 'Factorise Fully') {
            questionelement.innerHTML = FormatNumber(quadratic.a,'x<sup>2</sup>') + ' ' + FormatNumber(quadratic.b, 'x') + ' ' + FormatNumber(quadratic.c,'');
            ans0input.style.display = "inline";
            label1.innerHTML = "(x+";
            label2.innerHTML = ")(x+";
            label3.innerHTML = ")";
        } else if (questionsubcategory === 'Solve for x with ±') {
            questionelement.innerHTML = FormatNumber(quadratic.a,'x<sup>2</sup>') + ' ' + FormatNumber(quadratic.b, 'x') + ' ' + FormatNumber(quadratic.c,'') + ' = 0';
            ans0input.style.display = "inline";
            label0.innerHTML = "x = ";
            ans0input.setAttribute('placeholder', 'α');
            label1.innerHTML = " ± ";
            ans1input.setAttribute('placeholder', 'β');
            ans2input.setAttribute('placeholder', 'add i if √-1');
        } else if (questionsubcategory === 'Factorise using complete the square') {
            questionelement.innerHTML = FormatNumber(quadratic.a,'x<sup>2</sup>') + ' ' + FormatNumber(quadratic.b, 'x') + ' ' + FormatNumber(quadratic.c,'');
            ans0input.style.display = "inline";
            label1.innerHTML = "(x ";
            label2.innerHTML = ")<sup>2</sup> ";
        } else if (questionsubcategory === 'Find the mid point of the equation') {
            questionelement.innerHTML = FormatNumber(quadratic.a,'x<sup>2</sup>') + ' ' + FormatNumber(quadratic.b, 'x') + ' ' + FormatNumber(quadratic.c,'') + ' = 0';
            label1.innerHTML = "x = ";
            ans1input.setAttribute('placeholder', 'Mid Point Value');
            ans2input.style.display = "none";
        }

        answers.push({
            root1: quadratic.root1,
            root2: quadratic.root2, 
            a: quadratic.a,
            b: quadratic.b,
            c: quadratic.c,
        }); 
    }   
}
