const randomLetter = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));

const randomId = () => `${Date.now()}${randomLetter()}${randomLetter()}${randomLetter()}`;

export default randomId;