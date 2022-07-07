export default async function requestActionPage(hostname, pageNum, pageSize, sortBy, authorId) {
	let url = `${hostname}/items?pageNum=${pageNum}&pageSize=${pageSize}&sortBy=${sortBy}`;
	if (authorId) url += `&authorId=${authorId}`;
	try {
		const response = await fetch(url, {
			headers: [
				['Authorization', 'Bearer ' + localStorage.getItem('token')],
			]
		});
		if (response.ok) return await response.json();
	} catch (error) {
		console.log(error);
	}

}