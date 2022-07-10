export default async function requestActionPage(hostname, pageNum, pageSize, sortBy, authorId, tags) {
	let url = `${hostname}/actions?pageNum=${pageNum}&pageSize=${pageSize}&sortBy=${sortBy}`;
	if (authorId) url += `&authorId=${authorId}`;
	if (tags) url += `&tags=${tags}`;
	let headers = [];
	if (localStorage.getItem('token')) headers.push(['Authorization', `Bearer ${localStorage.getItem('token')}`]);
	try {
		const response = await fetch(url, {
			method: 'GET',
			headers,
		});
		if (response.ok) return await response.json();
	} catch (error) {
		console.log(error);
	}

}