
const { Router } = require('express');
const ejercicios = Router();

ejercicios.get('/samples/vem', (req, res) => {
    const bibliotecas = [
        {
            address_name: "Calle Velarde 43, 41460 Navas de la ConcepciÃ³n (Las) (Sevilla)",
            identifier: 872,
            locality_id: 160,
            locality_name: "Navas de la ConcepciÃ³n (Las)",
            modified: 25/08/2021,
            municipality_id: 6123,
            municipaity_ine: 41066,
            municipality_name: "Navas de la ConcepciÃ³n (Las)",
            name: "Biblioteca Pública Municipal de Las Navas de la ConcepciÃ³n",
            postcode: 41460,
            province_name: "Sevilla"
        },{
            address_name: "Avenida Loreto 4, 41804 Olivares (Sevilla)",
            identifier: 873,
            locality_id: 161,
            locality_name: "Olivares",
            modified: 28/02/2021,
            municipality_id: 6124,
            municipaity_ine: 41067,
            municipality_name: "Olivares",
            name: "Biblioteca PÃºblica Municipal Poeta JosÃ© MarÃ­a Romero MartÃ­nez de Olivares",
            postcode: 41804,
            province_name: "Sevilla"
        }, {
            address_name: "Calle Sevilla 22, 41640 Osuna (Sevilla)",
            identifier: 874,
            locality_id: 162,
            locality_name: "Osuna",
            modified: 27/01/2021,
            municipality_id: 6125,
            municipaity_ine: 41068,
            municipality_name: "Osuna",
            name: "Biblioteca PÃºblica Municipal de Osuna",
            postcode: 41640,
            province_name: "Sevilla"
        }, {
            address_name: "Plaza de AndalucÃ­a 2, 41720 Palacios y Villafranca (Los) (Sevilla)",
            identifier: 875,
            locality_id: 166,
            locality_name: "Palacios y Villafranca (Los)",
            modified: 29706/2021,
            municipality_id: 6126,
            municipaity_ine: 41069,
            municipality_name: "Palacios y Villafranca (Los)",
            name: 'Biblioteca PÃºblica Municipal "Obispo Ramos de Lora" de los Palacios y Villafranca',
            postcode: 41720,
            province_name: "Sevilla"
        }, {
            address_name: "Calle Loma Verdejena 1, 41928 Palomares del RÃ­o (Sevilla)",
            identifier: 876,
            locality_id: 168,
            locality_name: "Palomares del RÃ­o",
            modified: 26/03/2021,
            municipality_id: 6127,
            municipaity_ine: 41070,
            municipality_name: "Palomares del RÃ­o",
            name: "Biblioteca PÃºblica Municipal, Manuel Casado Moreno, de Palomares del RÃ­o",
            postcode: 41928,
            province_name: "Sevilla"
        },{
            address_name: "Calle Larga 54, 41610 Paradas (Sevilla)",
            identifier: 877,
            locality_id: 172,
            locality_name: "Paradas",
            modified: 30/05/2021,
            municipality_id: 6128,
            municipaity_ine: 41071,
            municipality_name: "Paradas",
            name: "Biblioteca PÃºblica Municipal de Paradas",
            postcode: 41610,
            province_name: "Sevilla"
        },{
            address_name:"Calle JazmÃ­n 1, 41566 Pedrera (Sevilla)",
            identifier: 878,
            locality_id: 173,
            locality_name: "Pedrera",
            modified: 22/01/2021,
            municipality_id: 6129,
            municipaity_ine: 41072,
            municipality_name: "Pedrera",
            name: 'Biblioteca PÃºblica Municipal "San Indalecio" de Pedrera',
            postcode: 41566,
            province_name: "Sevilla"
        },{
            address_name: "Calle Cervantes s/n, 41360 Pedroso (El) (Sevilla)",
            identifier: 879,
            locality_id: 177,
            locality_name: "Pedroso (El)",
            modified: 26/04/2021,
            municipality_id: 6130,
            municipaity_ine: 41073,
            municipality_name: "Pedroso (El)",
            name: 'Biblioteca PÃºblica Municipal de El Pedroso "JosÃ© Manuel Lara Bosch"',
            postcode: 41360,
            province_name: "Sevilla"
        }, {
            address_name: "Calle MÃ¡laga s/n, 41470 PeÃ±aflor (Sevilla)",
            identifier: 880,
            locality_id: 178,
            locality_name: "PeÃ±aflor",
            modified: 17/11/2021,
            municipality_id: 6131,
            municipaity_ine: 41074,
            municipality_name: "PeÃ±aflor",
            name: "Biblioteca PÃºblica Municipal de PeÃ±aflor",
            postcode: 41470,
            province_name: "Sevilla"
        },{
            address_name: "Calle Antonio Becerril 22, 41840 Pilas (Sevilla)",
            identifier: 881,
            locality_id: 181,
            locality_name: "Pilas",
            modified: 21/09/2021,
            municipality_id: 6132,
            municipaity_ine: 41075,
            municipality_name: "Pilas",
            name: "Biblioteca PÃºblica Municipal de Pilas",
            postcode: 41840,
            province_name: "Sevilla"
        },
        {
            address_name: "Calle Antonio Becerril 22, 41840 Pilas (Sevilla)",
            identifier: 881,
            locality_id: 181,
            locality_name: "Pilas",
            modified: 21/09/2021,
            municipality_id: 6132,
            municipaity_ine: 41075,
            municipality_name: "Pilas",
            name: "Biblioteca PÃºblica Municipal de Pilas",
            postcode: 41840,
            province_name: "Almería"
        },
        {
            address_name: "Calle Antonio Becerril 22, 41840 Pilas (Sevilla)",
            identifier: 881,
            locality_id: 181,
            locality_name: "Pilas",
            modified: 21/09/2021,
            municipality_id: 6132,
            municipaity_ine: 41075,
            municipality_name: "Pilas",
            name: "Biblioteca PÃºblica Municipal de Pilas",
            postcode: 41840,
            province_name: "Granada"
        },{
            address_name: "Calle Antonio Becerril 22, 41840 Pilas (Sevilla)",
            identifier: 881,
            locality_id: 181,
            locality_name: "Pilas",
            modified: 21/09/2021,
            municipality_id: 6132,
            municipaity_ine: 41075,
            municipality_name: "Pilas",
            name: "Biblioteca PÃºblica Municipal de Pilas",
            postcode: 41840,
            province_name: "Almería"
        }
    ]

    var mediaId = 0;

    bibliotecas.filter(b => b.province_name == "Sevilla").forEach((b) =>{
        mediaId += b.locality_id;
        
        let filtro = bibliotecas.filter(b=>b.province_name == "Sevilla");

        total = mediaId/filtro.length;

    });
    res.json('La media de la id de las localidades es: ' + total);

})

module.exports = ejercicios;
/*var bibliotecas = [
    {
        address_name: "Calle Velarde 43, 41460 Navas de la ConcepciÃ³n (Las) (Sevilla)",
        identifier: 872,
        locality_id: 160,
        locality_name: "Navas de la ConcepciÃ³n (Las)",
        modified: 25/08/2021,
        municipality_id: 6123,
        municipaity_ine: 41066,
        municipality_name: "Navas de la ConcepciÃ³n (Las)",
        name: "Biblioteca Pública Municipal de Las Navas de la ConcepciÃ³n",
        postcode: 41460,
        province_name: "Sevilla"
    },{
        address_name: "Avenida Loreto 4, 41804 Olivares (Sevilla)",
        identifier: 873,
        locality_id: 161,
        locality_name: "Olivares",
        modified: 28/02/2021,
        municipality_id: 6124,
        municipaity_ine: 41067,
        municipality_name: "Olivares",
        name: "Biblioteca PÃºblica Municipal Poeta JosÃ© MarÃ­a Romero MartÃ­nez de Olivares",
        postcode: 41804,
        province_name: "Sevilla"
    }, {
        address_name: "Calle Sevilla 22, 41640 Osuna (Sevilla)",
        identifier: 874,
        locality_id: 162,
        locality_name: "Osuna",
        modified: 27/01/2021,
        municipality_id: 6125,
        municipaity_ine: 41068,
        municipality_name: "Osuna",
        name: "Biblioteca PÃºblica Municipal de Osuna",
        postcode: 41640,
        province_name: "Sevilla"
    }, {
        address_name: "Plaza de AndalucÃ­a 2, 41720 Palacios y Villafranca (Los) (Sevilla)",
        identifier: 875,
        locality_id: 166,
        locality_name: "Palacios y Villafranca (Los)",
        modified: 29706/2021,
        municipality_id: 6126,
        municipaity_ine: 41069,
        municipality_name: "Palacios y Villafranca (Los)",
        name: 'Biblioteca PÃºblica Municipal "Obispo Ramos de Lora" de los Palacios y Villafranca',
        postcode: 41720,
        province_name: "Sevilla"
    }, {
        address_name: "Calle Loma Verdejena 1, 41928 Palomares del RÃ­o (Sevilla)",
        identifier: 876,
        locality_id: 168,
        locality_name: "Palomares del RÃ­o",
        modified: 26/03/2021,
        municipality_id: 6127,
        municipaity_ine: 41070,
        municipality_name: "Palomares del RÃ­o",
        name: "Biblioteca PÃºblica Municipal, Manuel Casado Moreno, de Palomares del RÃ­o",
        postcode: 41928,
        province_name: "Sevilla"
    },{
        address_name: "Calle Larga 54, 41610 Paradas (Sevilla)",
        identifier: 877,
        locality_id: 172,
        locality_name: "Paradas",
        modified: 30/05/2021,
        municipality_id: 6128,
        municipaity_ine: 41071,
        municipality_name: "Paradas",
        name: "Biblioteca PÃºblica Municipal de Paradas",
        postcode: 41610,
        province_name: "Sevilla"
    },{
        address_name:"Calle JazmÃ­n 1, 41566 Pedrera (Sevilla)",
        identifier: 878,
        locality_id: 173,
        locality_name: "Pedrera",
        modified: 22/01/2021,
        municipality_id: 6129,
        municipaity_ine: 41072,
        municipality_name: "Pedrera",
        name: 'Biblioteca PÃºblica Municipal "San Indalecio" de Pedrera',
        postcode: 41566,
        province_name: "Sevilla"
    },{
        address_name: "Calle Cervantes s/n, 41360 Pedroso (El) (Sevilla)",
        identifier: 879,
        locality_id: 177,
        locality_name: "Pedroso (El)",
        modified: 26/04/2021,
        municipality_id: 6130,
        municipaity_ine: 41073,
        municipality_name: "Pedroso (El)",
        name: 'Biblioteca PÃºblica Municipal de El Pedroso "JosÃ© Manuel Lara Bosch"',
        postcode: 41360,
        province_name: "Sevilla"
    }, {
        address_name: "Calle MÃ¡laga s/n, 41470 PeÃ±aflor (Sevilla)",
        identifier: 880,
        locality_id: 178,
        locality_name: "PeÃ±aflor",
        modified: 17/11/2021,
        municipality_id: 6131,
        municipaity_ine: 41074,
        municipality_name: "PeÃ±aflor",
        name: "Biblioteca PÃºblica Municipal de PeÃ±aflor",
        postcode: 41470,
        province_name: "Sevilla"
    },{
        address_name: "Calle Antonio Becerril 22, 41840 Pilas (Sevilla)",
        identifier: 881,
        locality_id: 181,
        locality_name: "Pilas",
        modified: 21/09/2021,
        municipality_id: 6132,
        municipaity_ine: 41075,
        municipality_name: "Pilas",
        name: "Biblioteca PÃºblica Municipal de Pilas",
        postcode: 41840,
        province_name: "Sevilla"
    },
    {
        address_name: "Calle Antonio Becerril 22, 41840 Pilas (Sevilla)",
        identifier: 881,
        locality_id: 181,
        locality_name: "Pilas",
        modified: 21/09/2021,
        municipality_id: 6132,
        municipaity_ine: 41075,
        municipality_name: "Pilas",
        name: "Biblioteca PÃºblica Municipal de Pilas",
        postcode: 41840,
        province_name: "Almería"
    },
    {
        address_name: "Calle Antonio Becerril 22, 41840 Pilas (Sevilla)",
        identifier: 881,
        locality_id: 181,
        locality_name: "Pilas",
        modified: 21/09/2021,
        municipality_id: 6132,
        municipaity_ine: 41075,
        municipality_name: "Pilas",
        name: "Biblioteca PÃºblica Municipal de Pilas",
        postcode: 41840,
        province_name: "Granada"
    },{
        address_name: "Calle Antonio Becerril 22, 41840 Pilas (Sevilla)",
        identifier: 881,
        locality_id: 181,
        locality_name: "Pilas",
        modified: 21/09/2021,
        municipality_id: 6132,
        municipaity_ine: 41075,
        municipality_name: "Pilas",
        name: "Biblioteca PÃºblica Municipal de Pilas",
        postcode: 41840,
        province_name: "Almería"
    }
]


function mediaFiltrada(province, bibliotecas) {
    let filtro = bibliotecas.filter(x => x.province_name == province);
    total = 0;
    filtro.forEach(x => {
        total += x.locality_id;
    });

    return total / filtro.length;
}

console.log("La media del id de las localidades es: " + mediaFiltrada("Sevilla", bibliotecas))*/
