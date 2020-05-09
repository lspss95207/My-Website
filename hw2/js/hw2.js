let gameArea = document.getElementById("game-area");

let num_table = 6;


//create table
let htmlStr = "";
let mask = 1;
for (let i = 0; i < num_table; i++) {
    if (i % 3 == 0) { htmlStr += "<div class=\"row\">"; }
    htmlStr += `<label for="card${(i + 1)}"><table>`;
    htmlStr += `<tr>
                    <td colspan="8"> 
                        Card No.${(i + 1).toString()}
                        <input type="checkbox" id="card${(i + 1)}" name="card[]">
                    </td>
                </tr>`

    let number = 1;
    for (let j = 0; j < 32; j++) {

        while ((number & mask) == 0) {
            number++;
        }



        if (j % 8 == 0) { htmlStr += "<tr>"; }
        htmlStr += `<td>${number.toString()}</td>`;
        if ((j + 1) % 8 == 0) { htmlStr += "<tr>"; }

        number++;
    }
    htmlStr += "</table></label>";
    if ((i + 1) % 3 == 0) { htmlStr += "</div>"; }

    mask <<= 1;
}
gameArea.innerHTML = htmlStr;



document.getElementById("start").onclick = function (event) {
    let input_array = document.getElementsByName('card[]');
    let answer = 0;
    for (let i = 0; i < input_array.length; i++) {
        answer += (input_array[i].checked ? 1 : 0) * 2 ** i;
    }
    if (answer == 0) {
        alert("Please select some card!");
        return;
    }

    //play animation
    let id = setInterval(frame, 100);
    let n = 70;
    let audio = new Audio('./sound/wheel.wav');
    audio.play();
    function frame() {
        if (n <= 0) {
            audio = new Audio('./sound/success.wav');
            audio.play();
            SelectionInTable(answer);
            clearInterval(id);
        }else if(n < 20 && n%4 != 0){
            n--
        } else {
            SelectionInTable(Math.floor(Math.random()*62)+1);
            n--;
        }
    }
    

}

function SelectionInTable(selection) {
    let td_array = document.getElementsByTagName("td");
    for (let i = 0; i < td_array.length; i++) {
        let td = td_array[i];
        if (td.innerText == selection) {
            td.style.backgroundColor = "orange";
        } else {
            td.style.backgroundColor = null;
        }
    }
}






