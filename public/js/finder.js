document.addEventListener('DOMContentLoaded', (evt) => {
	document.querySelectorAll('a[href="#"][data-target]').forEach((a) => {
		console.log(a);
		let body = JSON.stringify({
			path: a.dataset.target
		}, null, '\t');
		console.log(body);
		a.addEventListener('click', (evt) => {
			fetch('/play/now', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: body
			}).then((res) => {
				window.location = '/remote';
			}).catch((err) => {
				console.log(err);
			});
			// TODO send user to /remote
		});
	});
});
