// Creates a random 4 letter string composed of lowercase and uppercase letters
// for the creation of room ID

function generateRandomString(): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
  let str = '';
  for (let i = 0; i < 4; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    str += characters[randomIndex];
  }
  return str;
}

export default generateRandomString;