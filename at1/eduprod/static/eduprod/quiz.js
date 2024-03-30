function randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}
  
function Factorable_Quadratic(table) {
    let root1 = randomIntFromInterval(table.root1min, table.root1max);
    let root2 = randomIntFromInterval(table.root2min, table.root2max);
    let pm = Math.round(Math.random()) % 2 === 0 ? -1 : 1;
    
	var a = pm * randomIntFromInterval(table.amin, table.amax);
    var b = a * root1 + a * root2;
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
    else if (num === -1 && !constant !== "") {
        str = str.replace('-1', '-');
    }

    if (str.includes("-")) {
        str = str.replace('-', '- ')
    } 
    else if (constant !== "x<sup>2</sup>") {
        str = "+ " + str 
    }
    
    str = str + constant;
    
    return str;
}

function hideElements(Catergory) {
    var allElements = document.body.getElementsByTagName('*');
    for (var i = 0; i < allElements.length; i++) {
        allElements[i].style.display = 'none';
    }


    const body = document.querySelector('body');
    const quizelement = document.createElement("div");
    body.appendChild(quizelement);
    
    for (var i = 1; i <= 15; i++) {
        const questionsectionselement = document.createElement('ul');
        questionsectionselement.classList.add('points');
        questionsectionselement.style.listStyleType = 'none';
        questionsectionselement.style.float = 'left';

        const questionelement = document.createElement('li');

        questionsectionselement.appendChild(questionelement);
        quizelement.appendChild(questionsectionselement);

        if (Catergory == "Factorise") {
            var quadratic = Non_Fraction_Quadratic({
                amin: 1,
                amax: Math.ceil(i/3),
                root1min: -i*3,
                root1max: i*3,
                root2min: -i*3,
                root2max: i*3,
            });

            questionelement.innerHTML = FormatNumber(quadratic.a,'x<sup>2</sup>') + ' ' + FormatNumber(quadratic.b, 'x') + ' ' + FormatNumber(quadratic.c,'') + '';
            
            console.log(quadratic.a,quadratic.b,quadratic.c,quadratic.root1,quadratic.root2);
        }
    }   
}
