const { nanoid } = require("nanoid");
const fs = require("fs").promises;
const path = require("path");

/* Розкоментуйте і запиши значення */

const contactsPath = path.format({
	root: "./",
	dir: "db",
	base: "contacts.json",
});

async function listContacts() {
	const data = await fs.readFile(contactsPath);
	const result = JSON.parse(data);
	// console.log(result);
	return result;
}

async function getContactById(contactId) {
	const list = await listContacts();
	const contactIndex = list.findIndex((contact) => contact.id === contactId);
	let contact = null;
	if (contactIndex <= 0) contact = { ...list[contactIndex] };
	// console.log(contact);
	return contact;
}

async function removeContact(contactId) {
	const list = await listContacts();
	const contactIndex = list.findIndex(({ id }) => id === contactId.toString());
	let contact = null;
	if (contactIndex >= 0) {
		contact = list.splice(contactIndex, 1);
		await fs.writeFile(contactsPath, JSON.stringify(list, 0, 2));
	}
	return contact;
}

async function addContact(name, email, phone) {
	let contacts = await listContacts();
	const newContact = { id: nanoid(), name, email, phone };
	contacts = [...contacts, newContact];
	await fs.writeFile(contactsPath, JSON.stringify(contacts, 0, 2));
	return newContact;
}

module.exports = {
	listContacts,
	getContactById,
	removeContact,
	addContact,
};
