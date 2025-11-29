// Theme logic
document.addEventListener("DOMContentLoaded", function () {
    const body = document.body;
    const button = document.getElementById("theme-button");
    const savedTheme = localStorage.getItem("theme-mode");

    body.classList.remove("white-mode", "black-mode", "amoled-mode");

    if (savedTheme === "white-mode") {
        body.classList.add("white-mode");
        button.textContent = "White Mode";
    } else if (savedTheme === "black-mode") {
        body.classList.add("black-mode");
        button.textContent = "Black Mode";
    } else if (savedTheme === "amoled-mode") {
        body.classList.add("amoled-mode");
        button.textContent = "AMOLED Mode";
    } else {
        button.textContent = "Grey Mode";
    }
});

function toggleThemeMode() {
    const body = document.body;
    const button = document.getElementById("theme-button");
    let theme;

    if (!body.classList.contains("white-mode") &&
        !body.classList.contains("black-mode") &&
        !body.classList.contains("amoled-mode")) {
        body.classList.add("white-mode");
        button.textContent = "White Mode";
        theme = "white-mode";
    } else if (body.classList.contains("white-mode")) {
        body.classList.remove("white-mode");
        body.classList.add("black-mode");
        button.textContent = "Black Mode";
        theme = "black-mode";
    } else if (body.classList.contains("black-mode")) {
        body.classList.remove("black-mode");
        body.classList.add("amoled-mode");
        button.textContent = "AMOLED Mode";
        theme = "amoled-mode";
    } else if (body.classList.contains("amoled-mode")) {
        body.classList.remove("amoled-mode");
        button.textContent = "Grey Mode";
        theme = "grey";
    }

    localStorage.setItem("theme-mode", theme);
}

// Language logic
function adaptar_idioma() {
    var idioma = navigator.language || navigator.userLanguage;
    document.getElementById('etiqueta').innerText = '';
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
        label3.innerText = "Name (Vitacheat Label)";
        label1.innerText = "Custom ID";
        label2.innerText = "Generated Code";
        button1.innerText = "Generate Code";
        button2.innerText = "Copy";
        button3.innerText = "Save";
        button4.innerText = "Erase";
    } else if (selected_language === "Español") {
        label3.innerText = "Nombre (Etiqueta de Vitacheat)";
        label1.innerText = "Personalizada ID";
        label2.innerText = "Código Generado";
        button1.innerText = "Generar Código";
        button2.innerText = "Copiar";
        button3.innerText = "Guardar";
        button4.innerText = "Borrar";
    } else if (selected_language === "Français") {
        label3.innerText = "Nom (sur Vitacheat)";
        label1.innerText = "ID Personalisée";
        label2.innerText = "Code Généré";
        button1.innerText = "Générer le Code";
        button2.innerText = "Copier";
        button3.innerText = "Sauvegarder";
        button4.innerText = "Effacer";
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

// --- ID Changer logic: SUPPORT SPECIAL CHARACTERS ---
function button1_Click() {
    // Now supports ALL UTF-8 characters (including #, $, &, etc.)
    var text = "8234628D";
    var text2 = "";
    var text3 = "$0200 " + text + " ";
    var num = 0;

    // Use encodeURIComponent for wide coverage, then convert to bytes
    function strToHex(str) {
        let hex = '';
        for (let i = 0; i < str.length; i++) {
            let code = str.codePointAt(i);
    
            // Explicit fix for § symbol
            if (str[i] === '§') {
                hex += "A7";
                continue;
            }
    
            if (code <= 0xFF) {
                hex += code.toString(16).toUpperCase().padStart(2, '0');
            } else if (code <= 0xFFFF) {
                hex += code.toString(16).toUpperCase().padStart(4, '0');
            } else {
                hex += code.toString(16).toUpperCase();
            }
        }
        return hex;
    }

    function hex2dec(hex_str) {
        return parseInt(hex_str, 16);
    }

    function dec2hex(num) {
        return num.toString(16).toUpperCase();
    }

    var textBox1 = document.getElementById('textBox1');
    var textBox2 = document.getElementById('textBox2');
    var customID = textBox1.value;

    // Use strToHex instead of bin2hex
    var matches = strToHex(customID).match(/../g);
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

// --- Replace Tool Logic: WORKING MOD MENU STYLE CONVERSIONS ---
document.addEventListener("DOMContentLoaded", function () {
    // Only run if replace tool exists
    if (!document.getElementById("btnBloque") || !document.getElementById("btnObjeto")) return;

    const btnBloque = document.getElementById("btnBloque");
    const bloqueCombo = document.getElementById("bloqueCombo");
    const btnObjeto = document.getElementById("btnObjeto");
    const objetoCombo = document.getElementById("objetoCombo");
    const btnCrearTruco = document.getElementById("btnCrearTruco");
    const resultadoTexto = document.getElementById("resultadoTexto");

    let bloqueSeleccionadoNombre = "";
    let objetoSeleccionadoNombre = "";
    let bloqueSeleccionado = "";
    let objetoSeleccionado = "";

    // List of obtainable items (expand as needed)
    const obtainableItems = {
        "Crafting Table": {
            hex: "83568758",
            name: "Crafting Table"
        },
        "Slime Block": {
            hex: "835684E4",
            name: "Slime Block"
        }
        // Add more obtainable items as needed
    };

    // List of unobtainable items and their full cheats (expand as needed)
    // Use the mod menu format here!
    const unobtainableItems = {
        "Command Block": {
            name: "Command Block",
            codes: [
                "$5200 8399A634 83568758",
                "$0200 8399A62C 00000040"
                // Add more lines if needed for full conversion
            ]
        },
        "Nether Portal": {
            name: "Nether Portal",
            codes: [
                "$5200 8399C4A4 83568ACC",
                "$0200 8399C49C 00000040"
                // Example, expand for real menu
            ]
        }
        // Add more unobtainable items (with full codes array) as needed
    };

    // Block selection
    btnBloque.addEventListener("click", function () {
        const selectedBloqueText = bloqueCombo.options[bloqueCombo.selectedIndex].text;
        bloqueSeleccionado = obtainableItems[selectedBloqueText]?.hex || "";
        bloqueSeleccionadoNombre = obtainableItems[selectedBloqueText]?.name || selectedBloqueText;
    });

    // Object selection
    btnObjeto.addEventListener("click", function () {
        const selectedObjetoText = objetoCombo.options[objetoCombo.selectedIndex].text;
        objetoSeleccionadoNombre = unobtainableItems[selectedObjetoText]?.name || selectedObjetoText;
        objetoSeleccionado = selectedObjetoText;
    });

    // Cheat generation: name is "[from] to [to]", codes use unobtainable item mod menu section
    btnCrearTruco.addEventListener("click", function () {
        if (!bloqueSeleccionadoNombre) {
            const selectedBloqueText = bloqueCombo.options[bloqueCombo.selectedIndex].text;
            bloqueSeleccionado = obtainableItems[selectedBloqueText]?.hex || "";
            bloqueSeleccionadoNombre = obtainableItems[selectedBloqueText]?.name || selectedBloqueText;
        }
        if (!objetoSeleccionadoNombre) {
            const selectedObjetoText = objetoCombo.options[objetoCombo.selectedIndex].text;
            objetoSeleccionadoNombre = unobtainableItems[selectedObjetoText]?.name || selectedObjetoText;
            objetoSeleccionado = selectedObjetoText;
        }
    
        const unobtainable = unobtainableItems[objetoSeleccionado];
        if (!unobtainable) {
            resultadoTexto.value = "Unobtainable item codes not found.";
            return;
        }
    
        const trucoName = `${bloqueSeleccionadoNombre} → ${objetoSeleccionadoNombre}`;
        let codeBlock = `_V0 ${trucoName}\n`;
    
        // Registry + inventory patch
        codeBlock += unobtainable.codes.map(line => {
            return line.replace(/(\$5200\s+[0-9A-F]+\s+)([0-9A-F]{8})/i, (_, pre) => {
                return pre + bloqueSeleccionado;
            });
        }).join("\n");
    
        // Add creative inventory patch (ensures menu shows correct block)
        codeBlock += `\n$0200 ${bloqueSeleccionado} 00000040`;
    
        resultadoTexto.value = codeBlock;
    });
});


