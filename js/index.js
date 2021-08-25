



function pushEvent(event) { //  cuando hacen click en los bonones esta funcion carga el html en CONTENT y agrega el id al address bar.

    let id = event.target.id; // guarda el atributo id del boton clickeado 

    makeActive(id);

    loadContent(id); //carga en content el html llamado

    // releer esto
    window.history.pushState({ id }, `${id}`,
        `${id}`);
}

window.onload = event => {
    //asigna los eventos click a los botones, ejecuta la funcion pushEvent       
    window["home"].addEventListener("click",
        event => pushEvent(event))
    window["carrito"].addEventListener("click",
        event => pushEvent(event))
    window["turnos"].addEventListener("click",
        event => pushEvent(event))
    window["productos"].addEventListener("click",
        event => pushEvent(event))
    window["admin"].addEventListener("click",
        event => pushEvent(event))
}
//se queda esperando el popstate event, 
// Necesario para que funciones los botones "adelante" y "atras"
window.addEventListener("popstate", event => {
    // Grab the history state id
    let stateId = event.state.id;
    // Load content for this tab/page

    makeActive(stateId);

    loadContent(stateId);
});

function makeActive(id) {
    document.querySelectorAll(".nav-link").forEach(item => {
        item.classList.remove("active");
    });
    document.getElementById(id).classList.add("active");
}

async function loadContent(id) { //con el id toma el HTML buscado y lo pone en la seccion content
    try {
        let nodeMain = document.getElementById("content");
        let response = await fetch(`/${id}.html`);
        if (response.ok) {
            let newContent = await response.text();   //content es solo texto, necesito un nodo para usarlo en nodeSriptReplace        
            let node = document.createElement("SECTION"); //creo un nodo section
            node.innerHTML = newContent;   //le agregor el contenido de content al nodo (queda definito un nodo section con el contenido en texto del content)           
            node = nodeScriptReplace(node);   //  busco los scrips que estan en texto y reemplazo por nodos <scrip> funcionales               
            removeAllChildNodes(nodeMain); //borro todo de node main
            nodeMain.appendChild(node); //agrego el nodo con los scrips funcionales

        }
        else {
            alert("se exploto todo, LOAD CONTENT respponse no OK");
        }
    }
    catch (error) {
        alert("ERROR CATCH loadContent");
    }
}

function nodeScriptReplace(node) { // ingresa un nodo texto y busca hasta encontrar todos los scrips en y los cambia por un nodo clon.
    // esta es una funcion recursiva, se llama a si misma para ir recorriendo los nodos de padres a hijos buscando los scrips
    if (nodeScriptIs(node) === true) {// si el node es un scrip               
        node.parentNode.replaceChild(nodeScriptClone(node), node); //esta linea cambia el scrip texto y lo agrega un clon node 
    }
    else {// si el nodo no es un scrip busca en los hijos
        let i = 0, children = node.childNodes;
        while (i < children.length) {
            nodeScriptReplace(children[i]);
            i++
        }
    }
    return node;
}



function nodeScriptClone(node) { //crea un nodo clon pero con createElement y agregandole los atributos
    let script = document.createElement("script");
    script.text = node.innerHTML;
    let i = 0, attrs = node.attributes, attr;
    while (i < attrs.length) {
        attr = attrs[i];
        script.setAttribute(attr.name, attr.value);
        i++;
    }
    return script;
}

function nodeScriptIs(node) {  // te dice si un nodo es un script
    return node.tagName === 'SCRIPT';
}

function removeAllChildNodes(parent) {  // me borra los nodos hijos del nodo padre
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}