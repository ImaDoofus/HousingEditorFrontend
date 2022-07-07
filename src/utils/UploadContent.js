export default class UploadContent {
	/**
	 * Returns max upload size for the user in kilobytes
	 * 
	 * @param {Object} user User to get max upload size for
	 * @returns {number} Max upload size in kilobytes
	 */
	static getMaxUpload(user) {
		return {
			'action': 100, // 100kb
			'item': 100, // 100kb
		}
	}

	/**
	 * Returns an object saying if the content being uploaded is valid
	 * 
	 * @param {Object} workspace Workspace to check
	 * @param {Object} content Content to check
	 * @param {string} contentType Content type to check
	 * @param {Object} user User to check for
	 * @returns {Object} Object e.g. { valid: true } or { valid: false, error: 'error message' }
	 */
	static clientSideValidation(workspace, content, contentType, user) {
		const maxSize = UploadContent.getMaxUpload(user)[contentType];
		const maxSizeBytes = maxSize * 1024;
		
		let amassedSize = 0;
		amassedSize += JSON.stringify(workspace).length;
		if (contentType === 'action') amassedSize += JSON.stringify(content).length;
		console.log(amassedSize, maxSizeBytes);
		if (amassedSize > maxSizeBytes) {
			return { isValid: false, error: `Content exceeds size limit of ${maxSize}kb` };
		}
		return { isValid: true };
	}

	/**
	 * Attempts to upload user content to backend and returns result
	 * 
	 * @param {Object} workspace Workspace to upload
	 * @param {Object} content Content to upload
	 * @param {Object} user User that is uploading
	 * @param {string} id ID of the workspace to upload to (if not provided, will be created)
	 * @param {strong} hostname Hostname of the server
	 * @returns {Object} Object e.g. { success: true } or { success: false, error: 'error message' }
	 */
	static async uploadAction(workspace, content, user, id, hostname) {
		const validated = UploadContent.clientSideValidation(workspace, content, 'action', user);
		if (!validated.isValid) return { success: false, message: validated.error };

		const payload = {
			workspace,
			content: content.content,
			title: content.title,
		}

		try {
			const response = await fetch(`${hostname}/actions${id ? '/' + id : ''}`, {
				method: id ? 'PUT' : 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${user.token}`
				},
				body: JSON.stringify(payload)
			});
	
			const contentType = response.headers.get('content-type');
			if (contentType?.indexOf('application/json') === -1) return { success: false, message: response.statusText };
	
			const json = await response.json();
			if (!response.ok) return { success: false, message: json.message };
	
			return { success: true, message: json.message, id: json.id };
		} catch (error) {
			console.log(error);
			return { success: false, message: error.message };
		}
	}

	/**
	 * Attempts to upload user content to backend and returns result
	 * 
	 * @param {Object} workspace Workspace to upload
	 * @param {Object} user User that is uploading
	 * @param {string} id ID of the workspace to upload to (if not provided, will be created)
	 * @param {strong} hostname Hostname of the server
	 * @returns {Object} Object e.g. { success: true, message: 'success message', id: 'id' } or { success: false, message: 'error message' }
	 */
	static async uploadItem(workspace, user, id, hostname) {
		const validated = UploadContent.clientSideValidation(workspace, '', 'item', user);
		if (!validated.isValid) return { success: false, message: validated.error };

		const payload = {
			workspace,
		}

		try {
			const response = await fetch(`${hostname}/items${id ? '/' + id : ''}`, {
				method: id ? 'PUT' : 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${user.token}`
				},
				body: JSON.stringify(payload)
			});
	
			const contentType = response.headers.get('content-type');
			if (contentType?.indexOf('application/json') === -1) return { success: false, message: response.statusText };
	
			const json = await response.json();
			if (!response.ok) return { success: false, message: json.message };
	
			return { success: true, message: json.message, id: json.id };
		} catch (error) {
			console.log(error);
			return { success: false, message: error.message };
		}
	}
}