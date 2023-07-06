export function shuffleArray<Type>(array: Array<Type>) {
  var output: Array<Type> = new Array(); 
  for (let i = 0; i < array.length; ++i) {
    output.push(array[i]);
  }

  for (let i = output.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [output[i], output[j]] = [output[j], output[i]];
  }
  return output;
}
