const palavras = [
  'banana', 
  'cachorro', 
  'pirulito', 
  'galinha', 
  'batatinha',
  'pneu',
  'cavalo',
  'chiclete',
  'melancia',
  'padaria',
  'chocolate',
  'cacau',
  'pomada',
  'papelaria',
  'geladeira',
  'pimenta',
  'palmeira',
  'vinagre',
  'tomate',
  'cereal',
  'coelho',
  'churrasco',
  'serpente',
  'tomada',
  'futebol',
  'camiseta',
  'casaco',
  'adrenalina',
  'berimbau',
  'dentista',
  'elefante',
  'flanela',
  'igreja',
  'jornal',
  'lentilha',
  'nervoso',
  'orangotango',
  'queijadinha',
  'ratoeira',
  'umidade',
  'vulnerabilidade'
]

function randomNumber(init: number, end: number){
  return Math.floor(Math.random() * end) + init;
}

export function getRandonWord(): string {
  return palavras[randomNumber(0, palavras.length-1)]
}

export function convertStringToArray(str: string) {
  return str.split('')
}

export function initWordToDisplay(keywordSize: number){
  const userWord: string[] = []

  for (let i = 0; i < keywordSize; i++) {
    userWord.push("_")
  }

  return userWord
}