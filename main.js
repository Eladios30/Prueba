const list_el = document.getElementById("tasks");
const create_btn_el = document.getElementById("create");
const textInput = document.getElementById("agregar");
console.log(textInput);

let todos = [];

create_btn_el.addEventListener('click', CreateNewTodo);

function CreateNewTodo () {
	const item = {
		id: new Date().getTime(),
		text: "",
		complete: false
	}

	todos.unshift(item);

	const { item_el, input_el } = CreateTodoElement(item);

	list_el.prepend(item_el);

	input_el.value = textInput.value;

	textInput.value = "";

	input_el.removeAttribute("disabled");
	input_el.focus();
}

/* <div class="item">
	<input 
		type="text" 
		value="Todo content goes here" 
		disabled />
	<div class="actions">
		<button class="material-icons">edit</button>
		<button class="material-icons remove-btn">remove_circle</button>
	</div>
</div> */
function CreateTodoElement(item) {
	const item_el = document.createElement("div");
	item_el.classList.add("item");

	if (item.complete) {
		item_el.classList.add("complete");
	}

	const input_el = document.createElement("input");
	input_el.type = "text";
	input_el.value = item.text;
	input_el.setAttribute("disabled", "");

	const actions_el = document.createElement("div");
	actions_el.classList.add("acciones");

	const edit_btn_el = document.createElement("button");
	edit_btn_el.classList.add("material-symbols-outlined");
	edit_btn_el.innerText = "edit";

	const remove_btn_el = document.createElement("button");
	remove_btn_el.classList.add("material-symbols-outlined");
	remove_btn_el.innerText = "delete";

	actions_el.append(edit_btn_el);
	actions_el.append(remove_btn_el);

	item_el.append(input_el);
	item_el.append(actions_el);

	input_el.addEventListener("input", () => {
		item.text = input_el.value;
	});

	input_el.addEventListener("blur", () => {
		input_el.setAttribute("disabled", "");
	});

	edit_btn_el.addEventListener("click", () => {
		input_el.removeAttribute("disabled");
		input_el.focus();
	});

	remove_btn_el.addEventListener("click", () => {
		todos = todos.filter(t => t.id != item.id);

		item_el.remove();

	});

	return { item_el, input_el, edit_btn_el, remove_btn_el }
}