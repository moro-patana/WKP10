import faker from 'faker';
// Create wait function
function wait(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Grab elements
const tbody = document.querySelector('tbody');
const outerModal = document.querySelector('.outer-modal');
const innerModal = document.querySelector('.inner-modal');

// Create destroyPopup and remove the class list
async function destroyPopup(popup) {
	popup.classList.remove('open');
	await wait(1000);
	popup.remove();
	popup = null;
}
let persons = Array.from({ length: 10 }, () => {
	return {
		id: faker.random.uuid(),
		lastName: faker.name.lastName(),
		firstName: faker.name.firstName(),
		jobTitle: faker.name.jobTitle(),
		jobArea: faker.name.jobArea(),
		phone: faker.phone.phoneNumber(),
		picture: faker.image.avatar(100, 100),
	};
});

const displayList = data => {
	tbody.innerHTML = data
		.map(
			(person, index) => `
    <tr data-id="${person.id}" class="${index % 2 ? 'even' : ''}">
        <td><img src="${person.picture}" alt="${person.firstName + ' ' + person.lastName}"/></td>
        <td>${person.lastName}</td>
        <td>${person.firstName}</td>
        <td>${person.jobTitle}</td>
        <td>${person.jobArea}</td>
        <td>${person.phone}</td>
        <td>
            <button class="edit" value="${person.id}">
                <svg viewBox="0 0 20 20" fill="currentColor" class="pencil w-6 h-6"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
            </button>
            <button class="delete" value="${person.id}">
                <svg viewBox="0 0 20 20" fill="currentColor" class="trash w-6 h-6"><path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd"></path></svg>
            </button>
            </td>
    </tr>
`)
		.join('');
};
// Grab the edit button 
const editPartner = (e) => {
	const editBtn = e.target.closest('button.edit');
	if (editBtn) {
		e.preventDefault();
		const id = e.target.value;
		console.log(id);
		editPartnerPopup(id);
	}
}
// Create an form html to edit the parteners profile
const editPartnerPopup = (id) => {
	return new Promise(async function(resolve, reject) {
		const person = persons.find(person => person.id === id );
		console.log(id);
		const popup = document.createElement(`form`);
		popup.classList.add(`popup`);
		popup.innerHTML = `
		<h4>Edit Partener</h4>
	<fieldset>
		<label for="lastname">Lastname</label>
		<input
			type="text"
			required
			name="lastname"
			id="lastname"
			value
			="${person.lastName}"
		/>
	</fieldset>
	<fieldset>
		<label for="firstName">Firstname</label>
		<input
			type="text"
			required
			name="firstName"
			id="firstName"
			value
			="${person.firstName}"
		/>
	</fieldset>
	<fieldset>
		<label for="jobTitle">Job title</label>
		<input
			type="text"
			required
			name="jobTitle"
			id="jobTitle"
			value
			="${person.jobTitle}"
		/>
	</fieldset>
	<fieldset>
		<label for="jobArea">Job Area</label>
		<input
			type="text"
			required
			name="jobArea"
			id="jobArea"
			value
			="${person.jobArea}"
		/>
	</fieldset>
	<fieldset>
		<label for="phone">Phone Number</label>
		<input
			type="text"
			required
			name="phone"
			id="phone"
			value
			="${person.phone}"
		/>
	</fieldset>
	<button class="save">Save</button>`;
// Create skip button and appendchild it to the popup
	if (reject) {
		const skipBtn = document.createElement('button');
		skipBtn.type = 'button';
		skipBtn.textContent = "Cancel";
		skipBtn.classList.add("cancel");
		popup.appendChild(skipBtn);
		skipBtn.addEventListener('click', () => {
			resolve(null);
			destroyPopup(popup);
},
	{ once: true}
	)
	}
// Listen to the submit button to save the changes
	popup.addEventListener('submit', (e) => {
		e.preventDefault();
		// resolve(e.target.input.value);
		const newPerson = {};
		const form = e.currentTarget;
		id: id;
		lastName: form.value;
		firstName: form.value;
		jobTitle: form.value;
		jobArea: form.value;
		phone: form.value;
		console.log(newPerson);
	},
	{ once: true}
	)
		document.body.appendChild(popup);
		await wait(50);
		popup.classList.add('open');
	})
}
// Grab the button has class delete
const deletePartner = (e) => {
	const deleteBtn = e.target.closest('button.delete');
	if (deleteBtn) {
		e.preventDefault();
		const id = e.target.dataset.value;
		deletePartnerPopup(id);
	}
};

const deletePartnerPopup = () => {
	// create confirmation popup here
	return new Promise(async function(resolve) {
		const modal = document.createElement('div');
		modal.classList.add('modal');
		modal.innerHTML = `
			<p class="confirm">Doyou want to delete?</p>
			<div class="button">
			<button class="yes">Yes</buton>
			<button class="no">No</buton>
			</div>
		`;
		document.body.appendChild(modal);
		await wait(50);
		modal.classList.add('open');

	})
}


tbody.addEventListener('click', editPartner);
tbody.addEventListener('click', deletePartner);
 

displayList(persons);
