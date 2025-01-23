


export async function createAccount(email: string, password: string): Promise<void> {
	const res = await fetch('/acnt/usr', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ email, password })
	});

	if (res.ok) {
		const data = await res.json();
		console.log(data);
	} else {
		console.error('Failed to create account');
	}
}