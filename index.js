const respuestaPositiva = "si";

function elegirColor (){
        let pregunta = prompt("¿Te gustaría cambiar el color de tu notebook?");

        if (pregunta == respuestaPositiva) {
                alert("Colores disponibles en la web: rojo, azul, verde, rosa, negro, blanco");
        }else {
                alert("Lo siento, no hago más que eso.");
                return
        }

        const nuevoColor = prompt("¿Qué color te gustaría para tu notebook?");

        switch (nuevoColor) {
        case "rojo":
                alert("El color de tu notebook a cambiado a rojo!")
                break;
        case "azul":
                alert("El color de tu notebook a cambiado a azul!")
                break;
        case "verde":
                alert("El color de tu notebook a cambiado a verde!")
                break;
        case "rosa":
                alert("El color de tu notebook a cambiado a rosa!")
                break;        
        case "negro":
                alert("El color de tu notebook a cambiado a negro!")
                break;
        case "blanco":
                alert("El color de tu notebook a cambiado a blanco!")
                break;
        default:
                alert("No tenemos ese color!");
                break;
        }
}

elegirColor();