adminOnInit(); 

function adminOnInit() { // tenia probremas, se cargaban los scripts mas de una vez y al cambiar de html se querian volver a definir variables previamente cargadas
                                           
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Defino funciones de API                                                                                                                 //
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 
    let url ="https://60ccc42c71b73400171f8899.mockapi.io/api/baseDeDatos/1/";

    async function getArrayReservasApi(){   // Devuelve el un array reservas sacando Info de la Api seccion Reservas
        let reservas;
        try{              
            let res = await fetch(`${url}reservas`);        
            reservas = await res.json();            

            if(res.ok){
                console.log(reservas);
            }    
            else{
                alert("error, respuesta NO OK Obtener reservas")
                reservas =[];
            }
        }            
        catch(error){
            alert("ERROR CATCH OBTENER RESERVAS")
            reservas= [];
        }
        return reservas;
    }

    async function postItemPreciosApi(item){  // sube a la Api seccion precios un item  

        try{     
            let res = await fetch(`${url}precios`,{
                "method":"POST",
                "headers":{"Content-type":"application/json"},
                "body":JSON.stringify(item)
            });
            if( res.status === 201){            
                console.log(res);       
            }
        }
        catch(e){
            alert("ERROR CATCH POST PRECIOS")
        }
    }
    
    async function getArrayPreciosApi(){ // esto me guarda un array items cn los datos de la api seccion precios
        let items;
        try{              
            let res = await fetch(`${url}precios`);        
            items = await res.json();                   
            if(res.ok){
                console.log(items);
            }    
            else{
                alert("error, respuesta NO OK Obtener precios");
                items=[];
            }       
                        
        }            
        catch(error){
            alert("ERROR CATCH OBTENER PRECIOS");
            items=[];
        }    
        return items; 
        
    }

    async function deleteItemApi(id){ // borra un item de la api seccion precios
        try{
            let res = await fetch(`${url}precios/${id}`,{
                "method":"DELETE"
            });
            if (res.status == 200){
                alert("eliminado con exito de la API");
            }
            else{
                alert("respuesta no OK delete");
            }

        }
        catch(error){
            alert("Error captch Delete");
        }
    }

    async function editItemApi(id, item){ // edita un item de la api seccion precios
        try{
            let res = await fetch(`${url}precios/${id}`,{
                "method":"PUT",
                "headers": {"Content-type": "application/json"},
                "body": JSON.stringify(item)
            });
            if (res.status == 200){
                alert("editado con exito de la API");
            }
            else{
                alert("respuesta no OK edit");
            }
        }
        catch(error){
            alert("Error captch edit");
        }
    }    
    async function arrayFilterApi(elementoAFiltrar){  // devuelve un array con los elemntos filtrados segun la variable ingresada elementoAFiltrar, desde la Api seccion precios
        let items;
        try{              
            let res = await fetch(`${url}precios?search=${elementoAFiltrar}`);        
            items = await res.json(); 
                              
            if(res.ok){
                console.log(items);

            }    
            else{
                alert("RESPUESA NO OK FILTER");
                items=[];
            }       
                        
        }            
        catch(error){
            alert("ERROR CATCH FILTRAR PRECIOS");
            items=[];
        }    
        return items; 
    }
    

    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Defino funciones de admin, toman las funciones de la Api y me crean la visual en admin.HTML                                                                                                           // 
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 


    // CARGA TITUTULOS //
    function cargaTitulos(){      
        cargaTitulosTableTurnos();
        cargaTitulosTablePrice();                  
    }

    function cargaTitulosTableTurnos(){
        tableTurnos.innerHTML +=  `
                                    <thead>
                                        <tr>
                                            <th scope="col">NOMBRE</th>
                                            <th scope="col">EMAIL</th>
                                            <th scope="col">TELEFONO</th>
                                        </tr>
                                    </thead>`
    }

    function cargaTitulosTablePrice(){

        tablePrice.innerHTML +=  `
                                <thead>
                                    <tr>
                                        <th scope="col">FILA</th>
                                        <th scope="col">NOMBRE</th>
                                        <th scope="col">PRECIO</th>
                                    </tr>
                                </thead>`              
    }

    // TURNOS //

    async function cargaFilasTableTurnos(){ //carga todas las filas de la tableTurnos cuando se carga la pag
        try{
            arrayTurnos = await getArrayReservasApi();
            if(arrayTurnos.length != 0){
                for (let index = 0; index < arrayTurnos.length; index++) {        
                    cargaFilaTableTurnos(arrayTurnos[index]);
                }  
            }
            else{
                alert("No hay reservas");
            }
        }
        catch(e){
            alert("error catch cargaTableFilasTurnos");
        }         
    }


    function cargaFilaTableTurnos(turno){ //carga filas de a una en la tableTurnos

                let name = turno.name;
                let email = turno.email;
                let phone = turno.phone;                
                let date = new Date(turno.date); 
                        
                tableTurnos.innerHTML +=  `<tr>
                                            <td>${name}</td>
                                            <td>${email}</td>
                                            <td>${phone}</td>                                          
                                        </tr>`;                            
    }    


    // PRECIOS //
            
    async function cargaFilasTablePrecios(){    //carga todas las filas en la tablePrice al iniar la pagina
        try{        
            arrayPrecios = await getArrayPreciosApi();
            if (arrayPrecios.length != 0){   
                for (let index = 0; index < arrayPrecios.length; index++) {        
                    cargaFilaTablePrecios(arrayPrecios[index], index+1);
                }
            }
            else{
                alert("carga filas precios no OK");
            }
        }
        catch(error){
            alert("carga filas precios error catch");
            arrayPrecios =[];
        }    
    }
                
    function cargaFilaTablePrecios(item, fila){  // carga fila de aun en tablePrice    
        
        let name = item.name;
        let price = item.price;    

        tablePrice.innerHTML +=  `<tr>                            
                                    <td>${fila}</td>
                                    <td>${name}</td>
                                    <td>${price}</td>                                                                
                                </tr>`  
    }

    function itemArrayPrecios(){ //capura lo del formPrecios cuando se hace un submit en un boton del form
        
        let formData = new FormData(formPrecios);  
        
        let name = formData.get('name');
        let price = formData.get('price');

        let item = {
            "name": name,
            "price": price
        }

        return item;
    }
    function add3(e){
        e.preventDefault();
        for (let i = 1; i <= 3; i++) {
            let item = itemArrayPrecios();
            arrayPrecios.push(item);   
            postItemPreciosApi(item); 
            cargaFilaTablePrecios(item, arrayPrecios.length);              
        }
    }

    function addItemPrecio(e){  // agrega a la visual en tablePrecios y manda un item a la api
        e.preventDefault(); 
        let item = itemArrayPrecios();
        arrayPrecios.push(item);   
        postItemPreciosApi(item); 
        cargaFilaTablePrecios(item, arrayPrecios.length);   
    }

    function idSeleccionada(selector){ //obteniendo el dato fila del input borrrarOEditar, me devuelve el id de la api   
        let fila = document.querySelector(selector).value;
        id = arrayPrecios[fila-1].id;     
        return id;
    }
    async function deleteItem(){    //elimina de la visual y de la api un item precio
        await deleteItemApi(idSeleccionada("#borrar"));
        tablePrice.innerHTML = ""; 
        cargaTitulosTablePrice();   
        cargaFilasTablePrecios();
    }

    async function editItem(){  // edita de la visual y lo edita en la api
        let itemEditado = itemArrayPrecios();
        await editItemApi(idSeleccionada("#editar"), itemEditado);
        tablePrice.innerHTML = "";
        cargaTitulosTablePrice(); 
        cargaFilasTablePrecios ();
    }

    async function filtrarItem(){ // pone el arreglo ya filtrado en tablePrice en la visual
        try{
            let elementoAFiltrar = document.querySelector("#filtrar").value;
            arrayPrecios = await arrayFilterApi(elementoAFiltrar);
            tablePrice.innerHTML="";
             cargaTitulosTablePrice();    
                       
            if (arrayPrecios.length != 0 ){
                for (let index = 0; index < arrayPrecios.length; index++) {        
                    cargaFilaTablePrecios(arrayPrecios[index], index+1);
                }
            }
            else{
                alert("No hay elementos con ese nombre");
            }
        }
        catch{

        }
    }

    
    /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Ejecuto codigo de admin                                                                                                                 // 
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// 

    let formPrecios = document.querySelector("#formPrice");
    formPrecios.addEventListener("submit", addItemPrecio); 

    btn_x3.addEventListener("click", add3);
    btn_delete.addEventListener("click", deleteItem);
    btn_edit.addEventListener("click", editItem);
    btn_filtrar.addEventListener("click", filtrarItem);

    var tableTurnos = document.querySelector("#tableTurnos");
    var tablePrice = document.querySelector("#tablePrecios"); 

    let arrayPrecios;

    cargaTitulos();
    cargaFilasTablePrecios();
    cargaFilasTableTurnos();
}




