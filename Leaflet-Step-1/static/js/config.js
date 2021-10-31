var ajax = function(config) { 
	var xhr = new XMLHttpRequest();
	xhr.open(config.method, config.url, true);
	xhr.setRequestHeader('Content-Type', 'application/json');
	xhr.onload = function (e) {
		if (xhr.readyState === 4) {
			config.callback({
				status: xhr.status,
				response: xhr.responseText
			});
		}
	};

	xhr.onerror = function (e) {
		config.callback({
			status: xhr.statusText,
			response: xhr.statusText
		});
	};

	xhr.send(config.data);
};

function handleResponse(data) {
	if (data.status === 200)
		console.log('Yeah! Sucesso');
	else
		console.log('Oh no! Error ' + data.status);
}

var config = {
	method: 'GET',
	url: 'https://api.github.com/users/davidalves1',
	data: {},
	callback: handleResponse
}

ajax(config);