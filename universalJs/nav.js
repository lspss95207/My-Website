let style_button = document.getElementById("style_selector")
let stylelink = document.getElementsByTagName("link")

style_button.onclick = function(event) {
    var target = event.target;
    stylesheet = '../universalStyle/' + event.target.id + ".css";
    console.log(stylesheet)
    stylelink[1].setAttribute('href',stylesheet);
    for(var i = 0;i < 10;i++){
        var item = document.getElementById('style'+i.toString());
        if(item){
            item.parentElement.setAttribute('class','')
        }
    }
    document.getElementById(event.target.id).parentElement.setAttribute('class','active')
};  
