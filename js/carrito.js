/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// En este JS se busco crear un carrito desde el lado del cliente, no es funcional con una API! Se utilizo para la segunda entrega.                                                                                                             //
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



/***************************** Tabla CARRITO *********************************/
/*****************************               *********************************/
/*****************************               *********************************/

/**** BOTONES ****/
carritoOnInit();

function carritoOnInit() {

    document.querySelector("#btn-add").addEventListener("click", add);
    document.querySelector("#btn-add3").addEventListener("click", add3);
    document.querySelector("#btn-del").addEventListener("click", del);


    /**** JSONs ****/



    let listadoPrecios = [

        {
            name: "Serum",
            price: 780
        },
        {
            name: "Turbante",
            price: 1050
        },
        {
            name: "KitNatural",
            price: 3770
        },
        {
            name: "Guantes",
            price: 200
        },
        {
            name: "Promoter",
            price: 1360
        },
        {
            name: "Jade Roller",
            price: 2700
        }

    ];

    let shopCart = [
        {
            name: "Test",
            dni: "123456",
            payType: "Credit",
            price: 400
        }
    ];

    function addBuyItems() {
        let item = document.querySelector("#buyItem");
        for (let i = 0; i < listadoPrecios.length; i++) {
            item.innerHTML += `<option value= "${i}" > ${listadoPrecios[i].name}</option>`

        }
    }


    /*** FUNCIONES BOTONERA ****/

    async function add() {

        let nameNumber = document.querySelector("#buyItem").value;
        let dni = document.querySelector("#dni").value;
        let payType;

        if (document.querySelector("#efectivo").checked) {
            payType = document.querySelector("#efectivo").value;
        }
        else if (document.querySelector("#tarjeta").checked) {
            payType = document.querySelector("#tarjeta").value;
        }




        let newBuy = {
            name: listadoPrecios[nameNumber].name,
            dni: dni,
            payType: payType,
            price: listadoPrecios[nameNumber].price
        }
        shopCart.push(newBuy);
        show();
    }



    function add3() {
        for (let i = 0; i < 3; i++) {
            add()
        }
    }

    function del() {
        document.querySelector("#tableCart").innerHTML = '';
        shopCart = [];
        show()
        /**let len = shopCart.length;
        for (let i = 0; i < len; i++) {
            shopCart.pop();        
        }  
    */
    }




    function show() {
        let tableDom = document.querySelector("#tableCart");
        tableDom.innerHTML = '';
        tableDom.innerHTML += `
                                <thead>
                                    <tr>
                                        <th scope="col">NOMBRE</th>
                                        <th scope="col">DNI</th>
                                        <th scope="col">ABONA</th>
                                        <th scope="col">PRECIO</th>
                                    </tr>
                                </thead>`

        let total = 0;
        for (const item of shopCart) {
            let aux = '';
            let price = item.price;

            if (item.payType == "Efectivo") {
                aux = `class="resaltado"`;
                price = item.price * 0.9; // Oferta 10% por efectivo
            }
            total += price;

            tableDom.innerHTML += `<tr ${aux}>
                                        <td>${item.name}</td>
                                        <td>${item.dni}</td>
                                        <td>${item.payType}</td>
                                        <td>${price}</td>                                                                        
                                    </tr>`;
        }
        tableDom.innerHTML += `
                                <tfooter>
                                    <tr>
                                        <td colspan="3"></td> 
                                        <td>TOTAL</td>
                                    </tr>
                                    <tr id="total">
                                        <td colspan="3"></td>
                                        <td >${total}</td>                                 
                                    </tr>
                                <tfooter>`;

    }

    addBuyItems();

    show();


    let inventario = {
        "ropa": [
            {
                "categoria": "Pantalon Jean",
                "precio": 3000,
                "stock": 10,
            },
            {
                "categoria": "Camisa",
                "precio": 1500,
                "stock": 3,

            }
        ]
    }

    let itemNuevo = {
        "categoria": "Remera",
        "precio": 1300,
        "stock": 4,
    }

    inventario.ropa.push(itemNuevo);


}