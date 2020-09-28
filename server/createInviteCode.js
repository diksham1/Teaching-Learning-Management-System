module.exports = async function () {
	const choices = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
	let uniqueCode = "";

	for (i = 0; i < 7; i++) {
		const choiceIndex = Math.floor(Math.random() * 1000) % 62
		uniqueCode += choices[choiceIndex]		
	}
	return uniqueCode;
}
