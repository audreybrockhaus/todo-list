var button = document.getElementById("add-button");
console.log(button)

function Item(tagName, text) {
    this.element = null;
    this.createElement(tagName);
    this.updateText(text);
    this.setEvents();
}

Item.prototype.updateText = function(text) {
    this.element.innerHTML = text;
};

Item.prototype.setEvents = function() {
    this.element.addEventListener("click", function() {
        console.log('clicked');
    });
};

Item.prototype.createElement = function(tagName) {
    this.element = document.createElement(tagName);
    document.body.appendChild(this.element);
};

Item.prototype.remove = function() {
    document.body.removeChild(this.element);
};

var el = new Item("h1", "hello");
var k = 10;

function run(index) {
    var el = new Item("h1", "Waaaa " + index);
    var second = 0;
    var timer = setInterval(function(){
      el.updateText("hello " + "-" + index + "- " + (1+second++));
        if (second===5) {
            clearInterval(timer);
            el.remove();
        }
    }, 1000);
}

while(k--){
    run(k);
}

