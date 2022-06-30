import { estados } from '/estados.js';
import { municipios } from '/municipios.js';

// INSERT INTO asistente VALUES(
//     'VECJ880326JBG', 'Jasso', 'Beltran', 'Gonzales', 'jasso@gmail.com', '1234', 7774332211, TO_DATE('2022-02-01','YYYY-MM-DD')
// );

// INSERT INTO cliente VALUES(
//     'VECJ880326JMV', 'Josafat', 'Muñoz', 'Valverde', 'josa@gmail.com', '1234', 7774332211, 'Morelos', 'Miacatlan',
//     62600, 'ASFAS', 'call', 2 ,'VECJ880326JBG'
// );

// INSERT INTO carro VALUES(
//     'AD22FDS', 'adsfas', 'Audi', 2010, 'Verde', 'Convertible', 'A000000', 'B00000', 'VECJ880326JMV'
// );

// INSERT INTO mecanico VALUES(
//     'VECJ880326CBG', 'Chony', 'Beltran', 'Gonzales',  'chony@gmail.com', '1234', 7772131222, TO_DATE('2022-02-01','YYYY-MM-DD')
// );

// INSERT INTO producto VALUES(
//     01, 'Aceite', 50, 'Aceite para motor', 5
// )

// INSERT INTO caja VALUES(
//     'VECJ880326JBG', 'Tortu', 'Beltran', 'Gonzales', 'jasso@gmail.com', '1234', 7774332211, TO_DATE('2022-02-01','YYYY-MM-DD')
// );

// INSERT INTO servicio VALUES(
//     01, 'Lavado de llantas', 500, 'Lava las llantas del carro','VECJ880326FBG'
// );

// INSERT INTO historial VALUES(
//     01, TO_DATE('2022-02-01','YYYY-MM-DD'), TO_DATE('2022-02-15','YYYY-MM-DD'), 'Finalizado', 01, 'AD22FDS',
//     'VECJ880326CBG'
// )

// INSERT INTO detalle VALUES(
//     01, 2, 100, 01, 01
// );

// INSERT INTO factura VALUES(
//     01, TO_DATE('2022-02-15','YYYY-MM-DD'), 600, 01, 'VECJ880326JBG'
// );

const getEstado = (id) => {
	const estado = estados.find((estado) => estado.id === id);
	return estado.name;
};

const getMunicipio = (id) => {
	const idMunicipio = Math.floor(Math.random() * (10 - 1) + 1);
	let municipio = municipios.find(
		(municipio) => municipio.state_id === id && municipio.id === idMunicipio
	);

	console.log(municipio);

	municipio === undefined &&
		municipios.find(
			(municipio) => municipio.state_id === id && municipio.id === 1
		);

	return municipio.name;
};

function makeid(length) {
	let result = '';
	let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(
			Math.floor(Math.random() * charactersLength)
		);
	}
	return result;
}

const createInsert = (tableName, data) => {
	let lastName = data.last_name;
	let secondName = lastName.slice(2, 3).toUpperCase();
	let firstName = data.first_name;
	let birth = data.date_of_birth;
	let monthBirth = birth.slice(5, 7);
	let dayBirth = birth.slice(8, 10);
	let key = makeid(3);

	const id = Math.floor(Math.random() * (32 - 1) + 1);

	const lastNameSlice = lastName.slice(0, 2).toUpperCase();
	const firstNameSlice = firstName.slice(0, 1).toUpperCase();
	const yearBirth = birth.slice(2, 4);
	const email = data.email;
	const password = data.password;
	const phoneNumber = data.phone_number;
	const estado = getEstado(id);
	const municipio = getMunicipio(id);
	const cp = data.address.zip_code;
	const colony = data.address.street_address;
	const street = data.address.street_name;
	const number = Math.floor(Math.random() * (20 - 1) + 1);

	// console.log(lastName);
	// console.log(firstName);
	// console.log(birth);
	// console.log(key);
	// console.log(email);
	// console.log(password);
	// console.log(phoneNumber);
	// console.log(estado);
	// console.log(municipio);
	// console.log(cp);
	// console.log(colony);
	// console.log(street);
	// console.log(number);

	// const firstName = data.firstName;
	const rfc = `${lastNameSlice}${secondName}${firstNameSlice}${yearBirth}${monthBirth}${dayBirth}${key}`;

	// console.log(rfc);

	const insert = `INSERT INTO ${tableName} VALUES(
        "${rfc}", "${firstName}", "${lastName}", "${secondName}", "${email}", "${password}", "${phoneNumber}", "${estado}",
        "${municipio}", "${cp}", "${colony}", "${street}", "${number}"
        );`;
	return insert;
};

const getData = async (size, table) => {
	const inserts = [];

	for (let i = 0; i < size; i++) {
		const response = await fetch(
			'https://random-data-api.com/api/users/random_user'
		);
		const data = await response.json();
		inserts.push(createInsert(table, data));
	}

	console.log(inserts);
	setData(inserts, table);
};

const setData = async (inserts) => {
	inserts.map((insert) => {
		const pTag = document.createElement('p');
		pTag.innerHTML = insert;
		const divTag = document.querySelector('div');
		divTag.appendChild(pTag);
	});
};

const formTag = document.querySelector('form');
const sizeInput = document.getElementById('size');
const tableInput = document.getElementById('table');

formTag.addEventListener('submit', (e) => {
	e.preventDefault();
	const size = sizeInput.value;
	const table = tableInput.value;

	getData(size, table);
});
