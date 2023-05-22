const contacts = require("./contacts");
const { Command } = require("commander");

const program = new Command();
program
	.option("-a, --action <type>", "choose action")
	.option("-i, --id <type>", "user id")
	.option("-n, --name <type>", "user name")
	.option("-e, --email <type>", "user email")
	.option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

// TODO: рефакторить
async function invokeAction({ action, id, name, email, phone }) {
	switch (action) {
		case "list":
			result = await contacts.listContacts();
			console.table(result);
			break;

		case "get":
			if (id) {
				result = await contacts.getContactById(id);
				console.table(result || `Contact with id = ${id}  not found`);
			} else
				console.warn("Use command: node index --action|-a get -i|--id <id>");

			break;

		case "add":
			if (name && email && phone) {
				result = await contacts.addContact(name, email, phone);
				console.log("Contact added.");
				console.table(result);
			} else
				console.log(
					"Not all parameters are specified.Use command: node index --action|-a add -n|--name <user name> -e|--email <user email> -p|--phone <user phone>"
				);
			break;

		case "remove":
			if (id) {
				result = await contacts.removeContact(id);
				if (result) {
					console.log(`The contact with id=${id} was removed`);
					console.table(result);
				} else console.warn(`Contact with id = ${id} not found`);
			} else
				console.info("Use command: node index --action|-a remove -i|--id <id>");
			break;

		default:
			console.warn("Unknown action type!");
	}
}

invokeAction(argv);

//  # Отримуємо і виводимо весь список контактів у вигляді таблиці (console.table)
// node index.js --action="list"

// # Отримуємо контакт по id
// node index.js --action="get" --id 05olLMgyVQdWRwgKfg5J6

// # Додаємо контакт
// node index.js --action="add" --name Mango --email mango@gmail.com --phone 322-22-22

// # Видаляємо контакт
// node index.js --action="remove" --id qdggE76Jtbfd9eWJHrssH
