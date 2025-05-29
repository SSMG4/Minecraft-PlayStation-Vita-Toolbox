function toggleBlackMode() {
    var button = document.getElementById("theme-button");
    var body = document.body;

    // Cambiar el tema y el texto del botón
    body.classList.toggle("black-mode");

    if (body.classList.contains("black-mode")) {
      button.textContent = "Black Mode";
    } else {
      button.textContent = "Grey Mode";
    }
  }

  function adaptar_idioma() {
    var idioma = navigator.language || navigator.userLanguage;

    if (idioma.startsWith('es')) {
        // Configurar interfaz en español
        document.getElementById('etiqueta').innerText = '';
    } else if (idioma.startsWith('ja')) {
        // Configurar interfaz en japonés
        document.getElementById('etiqueta').innerText = '';
    } else {
        // Configurar interfaz en inglés (por defecto)
        document.getElementById('etiqueta').innerText = '';
    }
}

function button1_Click() {
    var text = "8234628D";
    var text2 = "";
    var text3 = "$0200 " + text + " ";
    var num = 0;

    function bin2hex(text) {
        var result = "";
        for (var i = 0; i < text.length; i++) {
            var hex = text.charCodeAt(i).toString(16).toUpperCase();
            result += ("00" + hex).slice(-2);
        }
        return result;
    }

    function hex2dec(hex_str) {
        return parseInt(hex_str, 16);
    }

    function dec2hex(num) {
        return num.toString(16).toUpperCase();
    }

    var textBox1 = document.getElementById('textBox1');
    var textBox2 = document.getElementById('textBox2');

    var matches = bin2hex(textBox1.value).match(/../g);
    for (var i = 0; i < matches.length; i++) {
        num++;
        if (num === 5) {
            var num2 = hex2dec(text) + 4;
            text = dec2hex(num2);
            if (text === "823462A1") {
                alert("Some of them appear truncated due to the large number of characters.");
                text3 += text2;
                text2 = "";
                break;
            }
            text3 += text2 + "\n$0200 " + text + " ";
            num = 1;
            text2 = "";
        }
        text2 = matches[i] + text2;
    }

    if (text2 !== "") {
        text3 += "0".repeat(8 - text2.length) + text2;
    }

    textBox2.value = "_V0 " + document.getElementById('textBox3').value + "\n" + text3;
}

function button2_Click() {
    var textBox2 = document.getElementById('textBox2');
    textBox2.select();
    document.execCommand("copy");
}

function button3_Click() {
    var selectBox = document.getElementById("savefile");
    var selectedOption = selectBox.options[selectBox.selectedIndex].value;

    var fileName = selectedOption + ".psv";
    var textBox2 = document.getElementById("textBox2");
    var fileContent = "#" + selectedOption + "\n\n" + textBox2.value;
    var blob = new Blob([fileContent], { type: "text/plain;charset=utf-8" });
    saveAs(blob, fileName);
}



function button4_Click() {
    document.getElementById('textBox1').value = '';
    document.getElementById('textBox2').value = '';
    document.getElementById('textBox3').value = '';
}

function changeLanguage() {
    var selected_language = document.querySelector('.language-dropdown').value;
    var label3 = document.querySelector('.container > label');
    var label1 = document.querySelectorAll('.container > label')[1];
    var label2 = document.querySelectorAll('.container > label')[2];
    var button1 = document.querySelectorAll('.container > button')[0];
    var button2 = document.querySelectorAll('.container > button')[1];
    var button3 = document.querySelectorAll('.container > button')[2];
    var button4 = document.querySelectorAll('.container > button')[3];

    if (selected_language === "English") {
        label3.innerText = "Name";
        label1.innerText = "New ID";
        label2.innerText = "Code";
        button1.innerText = "Generate Code";
        button2.innerText = "Copy";
        button3.innerText = "Save";
        button4.innerText = "Clear All";
    } else if (selected_language === "Español") {
        label3.innerText = "Nombre";
        label1.innerText = "Nuevo ID";
        label2.innerText = "Código";
        button1.innerText = "Generar Código";
        button2.innerText = "Copiar";
        button3.innerText = "Guardar";
        button4.innerText = "Eliminar todo";
    } else if (selected_language === "日本語") {
        label3.innerText = "コード";
        label1.innerText = "名前";
        label2.innerText = "新しいID";
        button1.innerText = "コードを生成";
        button2.innerText = "コピー";
        button3.innerText = "保存";
        button4.innerText = "全てクリア";
    }
}
document.addEventListener("DOMContentLoaded", function () {
    const btnBloque = document.getElementById("btnBloque");
    const bloqueCombo = document.getElementById("bloqueCombo");
    const btnObjeto = document.getElementById("btnObjeto");
    const objetoCombo = document.getElementById("objetoCombo");
    const btnCrearTruco = document.getElementById("btnCrearTruco");
    const resultadoTexto = document.getElementById("resultadoTexto");

    let bloqueSeleccionado = "";
    let objetoSeleccionado = "";

    btnBloque.addEventListener("click", function () {
        bloqueSeleccionado = "834D810C";
    });

    btnObjeto.addEventListener("click", function () {
        const selectedObjeto = objetoCombo.options[objetoCombo.selectedIndex].value;
        if (selectedObjeto === "Portal de Nether") {
            objetoSeleccionado = "0000005A";
        } else if (selectedObjeto === "Otra opción") {
            objetoSeleccionado = "00000089";
        } else {
            objetoSeleccionado = "000000A5";
        }
    });

    btnCrearTruco.addEventListener("click", function () {
        const truco = `_V0 Remplace cheat\n$0200 ${bloqueSeleccionado} ${objetoSeleccionado}`;
        resultadoTexto.value = truco;
    });
});


  
