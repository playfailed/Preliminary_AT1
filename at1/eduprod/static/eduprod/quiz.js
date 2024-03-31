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

    if (str.includes("-")) {
        str = str.replace('-', '- ')
    } 
    else if (constant !== "x<sup>2</sup>" && constant !== "(" && constant !== "x(") {
        str = "+ " + str 
    }
    
    str = str + constant;

    return str;
}

function hideElements(SectionCatergory) {
    var allElements = document.body.getElementsByTagName('*');
    for (var i = 0; i < allElements.length; i++) {
        allElements[i].style.display = 'none';
    }

    const body = document.querySelector('body');
    const quizelement = document.createElement("div");
    body.appendChild(quizelement);
    
    var answers = []

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
        const ans1input = document.createElement('input');
        const ans2input = document.createElement('input');
        const submitButton = document.createElement('input');

        ans1input.setAttribute('type', 'text');
        ans1input.setAttribute('name', i + 'answer1'); 
        ans1input.setAttribute('placeholder', 'Answer 1'); 
        ans2input.setAttribute('type', 'text');
        ans2input.setAttribute('name', i + 'answer2'); 
        ans2input.setAttribute('placeholder', 'Answer 2'); 
        submitButton.setAttribute('type', 'submit');
        submitButton.setAttribute('id', i);
        submitButton.setAttribute('value', 'Submit');

        form.appendChild(ans1input);
        form.appendChild(ans2input);
        form.appendChild(submitButton);

        questionsectionselement.appendChild(form);

        submitButton.addEventListener('click', function(event) {
            event.preventDefault();
        
            var questionnumber = submitButton.id
            var ans1Value = ans1input.value; 
            var ans2Value = ans2input.value; 

            if (instructionelement.innerText === 'Solve for x') {
                let conition1 = Number(ans1Value) === answers[questionnumber-1].root1 && Number(ans2Value) === answers[questionnumber-1].root2
                var conition2 = Number(ans2Value) === answers[questionnumber-1].root1 && Number(ans1Value) === answers[questionnumber-1].root2

                if (conition1 || conition2) {
                    questionsectionselement.style.backgroundColor = "green";
                } else {
                    questionsectionselement.style.backgroundColor = "red";
                    questionelement.innerHTML = "Answer was x = " + answers[questionnumber-1].root1 + " or " + answers[questionnumber-1].root2
                }
            } else if (instructionelement.innerText === 'Factorise Fully') {
                var conition1 = ans1Value === FormatNumber(answers[questionnumber-1].a,"(") + "x " + FormatNumber(-answers[questionnumber-1].root1,"") + ")(x " + FormatNumber(-answers[questionnumber-1].root2,"") + ")"
                var conition2 = ans1Value === FormatNumber(answers[questionnumber-1].a,"(") + "x " + FormatNumber(-answers[questionnumber-1].root2,"") + ")(x " + FormatNumber(-answers[questionnumber-1].root1,"") + ")"

                if (answers[questionnumber-1].root1 === answers[questionnumber-1].root2) {
                    conition2 = ans1Value === FormatNumber(answers[questionnumber-1].a,"(") + "x " + FormatNumber(-answers[questionnumber-1].root1,"") + "^2"
                }

                if (answers[questionnumber-1].root1 === 0) {
                    conition1 = ans1Value === FormatNumber(answers[questionnumber-1].a,"x(") + "x " + FormatNumber(-answers[questionnumber-1].root2,"") + ")";
                    conition2 = ans1Value === FormatNumber(answers[questionnumber-1].a,"(") + "x " + FormatNumber(-answers[questionnumber-1].root2,"") + ")x";
                } else if (answers[questionnumber-1].root2 === 0) {
                    conition1 = ans1Value === FormatNumber(answers[questionnumber-1].a,"x(z;") + "x " + FormatNumber(-answers[questionnumber-1].root1,"") + ")";
                    conition2 = ans1Value === FormatNumber(answers[questionnumber-1].a,"(") + "x " + FormatNumber(-answers[questionnumber-1].root1,"") + ")x";
                }

                if (conition1 || conition2) {
                    questionsectionselement.style.backgroundColor = "green";
                } else {
                    questionsectionselement.style.backgroundColor = "red";
                    questionelement.innerHTML = "Answer was " + FormatNumber(answers[questionnumber-1].a,"x(") + "x " + FormatNumber(-answers[questionnumber-1].root2,"") + ")";
                }
            }

            ans1input.disabled = true;
            ans2input.disabled = true;
            submitButton.disabled = true;

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
                body.appendChild(endblock);
                
                const exit = document.createElement('a');
                exit.innerText = "Exit"
                exit.style.color = "black"
                exit.setAttribute('href', "");
                endblock.appendChild(exit);
            }

            console.log(isdone, "final")
        });

        if (SectionCatergory == "Factorise") {
            var quadratic = Non_Fraction_Quadratic({
                amin: 1,
                amax: Math.ceil(i/3),
                root1min: -i*3,
                root1max: i*3,
                root2min: -i*3,
                root2max: i*3,
            });

            let questionsubcategory = randomchoice(['Solve for x','Factorise Fully'])
            instructionelement.innerText = questionsubcategory
            answers.push({
                root1: quadratic.root1,
                root2: quadratic.root2, 
                a: quadratic.a,
                b: quadratic.b,
                c: quadratic.c,
            });   
       
            if (questionsubcategory === 'Solve for x') {
                questionelement.innerHTML = FormatNumber(quadratic.a,'x<sup>2</sup>') + ' ' + FormatNumber(quadratic.b, 'x') + ' ' + FormatNumber(quadratic.c,'') + ' = 0';
            }
            else if (questionsubcategory === 'Factorise Fully') {
                questionelement.innerHTML = FormatNumber(quadratic.a,'x<sup>2</sup>') + ' ' + FormatNumber(quadratic.b, 'x') + ' ' + FormatNumber(quadratic.c,'');
                ans2input.style.display = "none";
                ans1input.setAttribute('placeholder', '- a(x ± α)(x ± β)');
            }

            
        }


        
    }   
}
