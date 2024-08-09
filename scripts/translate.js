function appendButton(element) {
    var buttonEl = document.createElement("a");
    buttonEl.type = "button"
    var buttonTextEl = document.createElement("span");
    buttonTextEl.className = "class";
    buttonTextEl.innerText = "Перевод";
    buttonEl.addEventListener('click', function () {
        _translate("en", "ru", element.innerText.replace("Перевод", "")).then(
            (value) => {
                showHideTranslatedText(element, value);
            },
            () => {
                showError(element);
            }
        );
    });
    buttonEl.appendChild(buttonTextEl);
    element.appendChild(buttonEl);

}

function _translate(src, tgt, text){
	var url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${src}&tl=${tgt}&dt=t&q=` + encodeURI(text);
	return fetch(url).then(x=>x.json()).then(x=>x[0].map(v=>v[0]) )
}

function showHideTranslatedText(element, translatedText) {
    _removeOldTranslationIfNeed();
    const textNode = document.createTextNode(translatedText.join("\n"));
    _appendNewChildInto(element, textNode);
}

function _removeOldTranslationIfNeed() {
    var translation = document.getElementById("#translation");
    if (translation) {
        translation.remove();
    }
}

function showError(element) {
    _removeOldTranslationIfNeed();
    const textNode = document.createTextNode("An error occured while trying to translate text");
    textNode.style.color = "red";
    _appendNewChildInto(element, textNode);
}

function _appendNewChildInto(element, child) {
    var translationDiv = document.createElement('div');
    translationDiv.id = "#translation";
    translationDiv.appendChild(child)
    element.appendChild(translationDiv);
}

document.addEventListener("DOMContentLoaded", function (event) {
    const nodeList = document.querySelectorAll(".col-md-8");
    for (let i = 0; i < nodeList.length; i++) {
        appendButton(nodeList[i]);
    }
});

