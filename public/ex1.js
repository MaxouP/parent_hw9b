const renderConfirmation = (msg) => {
	document.getElementById("confirmation").append(msg);
};

const fetchFormData = async () => {
	const resp = await fetch("http://127.0.0.1:8080/api/form")
		.then((resp) => resp.json())
		.catch((err) => console.error(err));
	return resp;
};

const renderData = (data) => {
	document.getElementById("nameInput").value = data.nameInput;
	document.getElementById("emailInput").value = data.emailInput;
	const pay = document.getElementsByName("payment");
	pay.forEach((input) => {
		if (input.value == data.payment) {
			input.checked = true;
		}
	});
	document.getElementsByName("location")[0].value = data.location;
	document.getElementById("promotion").checked = data.promotion;
};

document.querySelector("form").addEventListener("submit", async (e) => {
	e.preventDefault();
	const data = Object.fromEntries(new FormData(e.target).entries());
	const response = await fetch("http://localhost:8080/api/form", {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
		.then((resp) => resp.json())
		.catch((err) => console.error(err));
	renderConfirmation(response);
});

fetchFormData().then((resp) => {
	renderData(resp);
});
