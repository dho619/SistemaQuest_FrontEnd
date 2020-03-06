export function criptografar(obj) {
	try {
		let newObj = encodeURIComponent(JSON.stringify(obj))
		return newObj
	} catch (error) {
		return {}
	}
}

export function descriptografar(string) {
	try {
		let newObj = JSON.parse(decodeURIComponent(string))
		return newObj
	} catch (error) {
		return {}
	}
}