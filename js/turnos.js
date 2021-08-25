turnosOnInit();

function turnosOnInit() { //SUCEDE LO MISMO QUE CON LA FUNCION DEFINIDA EN ADMIN

    let url ="https://60ccc42c71b73400171f8899.mockapi.io/api/baseDeDatos/1/";

    let formTurnos = document.querySelector("#formTurnos");
    formTurnos.addEventListener("submit", postTurnosApi); //escucho el submit del form

    async function postTurnosApi(e){    // manda a la api seccion reservas los datos insertados en el formTurnos
        e.preventDefault();       
        let formData = new FormData(formTurnos);    
        
        let name = formData.get('name');
        let email = formData.get('email');
        let phone = formData.get('telefono');
           

        let turno = {
            "name" : name,
            "email" : email,
            "phone" : phone,
                    
        }     
                
        try{     
            console.log(turno);
            let res = await fetch(`${url}reservas`,{
                "method":"POST",
                "headers":{"Content-type":"application/json"},
                "body":JSON.stringify(turno)
            });
            if( res.status === 201){            
                alert("Enviado nuevo turno");        
            }
            else{
                alert("Respues NO OK obtener turnos")                
            }
            
        }
        
        catch(error){
            alert("ERROR CATCH POST TURNOS");
        }
    }
}        

