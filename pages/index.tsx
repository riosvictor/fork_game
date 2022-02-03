import type { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import { convertStringToArray, getRandonWord, initWordToDisplay } from '../server/functions'

const Home: NextPage = () => {
  const maxErrors = 5
  const [getSecretWord, setSecretWord] = useState<string[]>([])
  const [getUserWord, setUserWord] = useState<string[]>([])
  const [getWrongLetters, setWrongLetters] = useState<string[]>([])
  const [countAllErrors, setAllErrors] = useState(0)
  const [userLetter, setUserLetter] = useState('')
  const [restart, setRestart] = useState(false)
  const inputEl = useRef<HTMLInputElement>(null);

  const finishGame = countAllErrors === maxErrors || !getUserWord.includes('_')
  const isAssertAll = !getUserWord.includes('_')

  useEffect(() => {
    const word = getRandonWord()
    const arrayWord = convertStringToArray(word)

    setSecretWord(arrayWord)
    setUserWord(initWordToDisplay(word.length))

    setAllErrors(0)
    setWrongLetters([])
    setUserLetter('')
  }, [restart])


  ///

  function doKick() {
    const acertouLetra = getSecretWord.includes(userLetter.toLowerCase())

    if (acertouLetra){
      getSecretWord.forEach((letra, index) => {
        if (userLetter.toLowerCase() === letra.toLowerCase()){
          setUserWord(oldLetters => {
            const newArray = [...oldLetters]

            newArray[index] = letra

            return newArray
          })
          
        }
      })

      alert('Você acertou!')
    } else {
      setWrongLetters(oldLetters => {
        return [...oldLetters, userLetter]
      })
      setAllErrors(countAllErrors + 1)

      alert('Você errou!')
    }

    setUserLetter('')
    inputEl.current?.focus();
  }

  function handleUserLetter(event: React.ChangeEvent<HTMLInputElement>) {
    const {value} = event.target

    const isValid = !/[^a-z]/i.test(value);

    if(isValid) {
      setUserLetter(value)
    } else {
      alert('Informe uma letra válida!')
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      doKick()
    }
  }

  ///
  
  return (
    <div className="p-10">
      <h1 className="text-sky-500 font-serif text-4xl font-medium italic leading-8 text-center mt-0 mx-0 mb-12">
        Bem vindo ao Jogo da Forca
      </h1>

      <div className="flex flex-row gap-10 mb-20 content-center justify-center">
        {getUserWord.map((letter, index) => {
          return (
            <div 
              key={index}
              className="text-6xl font-medium leading-4 font-sans text-slate-700"
            >
              {letter}
            </div>
          )
        })}
      </div>

      <div className="flex flex-col mb-10 items-center">
        {
          !finishGame ? 
          (
            <>
              <input 
                type="text" 
                maxLength={1} 
                placeholder="Escreva uma letra..."
                value={userLetter}
                onChange={(event) => handleUserLetter(event)}
                onKeyDown={(event) => handleKeyDown(event)}
                ref={inputEl}
                className="placeholder:italic placeholder:text-slate-400 block bg-white
                          w-full border border-slate-300 rounded-md py-2 pl-9 pr-3
                          shadow-sm focus:outline-none focus:border-sky-500
                          focus:ring-sky-500 focus:ring-1 text-6xl mb-10"
              />

              <button 
                className="rounded-full bg-indigo-500 w-[120px] h-[40px] disabled:opacity-50 hover:opacity-90 font-medium text-white text-2xl"
                onClick={() => doKick()}
                disabled={finishGame}
              >
                Chutar
              </button>
            </>
          ) :
          (
            <>
              {isAssertAll ? 
                <p>Parabéns, você acertou a palavra completa!</p>
                :
                <p>Que pena, você foi enforcado. 
                  A palavra era &apos;{getSecretWord.join('')}&apos;
                </p>
              }
              <button 
                className="rounded-full bg-indigo-500 w-[220px] h-[40px] disabled:opacity-50 hover:opacity-90 font-medium text-white text-2xl mt-10"
                onClick={() => setRestart(!restart)}
              >
                Reiniciar o jogo
              </button>
            </>
          )
        }
      </div>

      <div className="flex flex-col text-2xl">
        <p className="font-bold underline mb-10">Informações da partida</p>
        <p className="font-light">{`Letras erradas: ${getWrongLetters.length > 0 ? getWrongLetters : 0}`}</p>
        <p className="font-light">{`Tentativas erradas: ${countAllErrors}`}</p>
        <p className="font-light">{`Limite de erros: ${maxErrors}`}</p>
      </div>
      
    </div>
  )
}

export default Home
