import type { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import { convertStringToArray, getRandonWord, initWordToDisplay } from '../server/functions'
import Head from 'next/head'

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
    <div className="p-5 mx-10 my-5 border-solid border-2 border-gray-400 rounded-md">
      <Head>
        <title>Jogo da Forca</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <h1 className="text-sky-500 font-serif text-4xl font-medium italic leading-8 text-center mt-0 mx-0 mb-12">
        Bem vindo ao Jogo da Forca
      </h1>

      <main className="border-double border-4 border-indigo-600 p-5 mb-5 rounded-md">
        <div className="flex flex-row gap-[5%] md:mb-20 mb-10 content-center justify-center">
          {getUserWord.map((letter, index) => {
            return (
              <div 
                key={index}
                className="md:text-6xl text-2xl font-medium leading-4 font-sans text-slate-700"
              >
                {letter}
              </div>
            )
          })}
        </div>

        <div className="flex flex-col items-center space-y-5">
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
                            w-full border border-slate-300 rounded-md p-2
                            shadow-sm focus:outline-none focus:border-sky-500
                            focus:ring-sky-500 focus:ring-1 text-2xl md:text-6xl"
                />

                <button 
                  className="px-4 py-2 font-semibold text-2xl rounded-full bg-indigo-500
                            text-white shadow-sm ring-1 ring-slate-900/5
                            border-2 border-solid disabled:opacity-50 hover:opacity-90"
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
                  <p className="underline decoration-green-500 text-xl">
                    Parabéns, você acertou a palavra completa!
                  </p>
                  :
                  <p className="text-xl">
                    <span className="underline decoration-pink-500">Que pena, você foi enforcado.</span> 
                    {` A palavra era `}
                    <span className="text-pink-500 font-medium text-lg">
                      &apos;{getSecretWord.join('')}&apos;
                    </span>. 
                  </p>
                }
                <button 
                  className="px-4 py-2 font-semibold text-2xl rounded-full bg-indigo-500
                  text-white rounded-md shadow-sm ring-1 ring-slate-900/5
                  border-2 border-solid disabled:opacity-50 hover:opacity-90"
                  onClick={() => setRestart(!restart)}
                >
                  Reiniciar o jogo
                </button>
              </>
            )
          }
        </div>

      </main>

      
      <div className="flex flex-col text-2xl">
        <p className="font-bold underline mb-5">Informações da partida</p>
        <p className="font-light">{`Letras erradas: `} 
          <span className="font-bold text-yellow-500">
            {`${getWrongLetters.length > 0 ? `[${getWrongLetters}]` : 0}`}
          </span>
        </p>
        <p className="font-light">{`Tentativas erradas: `}
          <span className={
            classnames("font-bold", 
              {"text-green-600": countAllErrors === 1 },
              {"text-emerald-600": countAllErrors === 2 },
              {"text-yellow-500": countAllErrors === 3 },
              {"text-orange-500": countAllErrors === 4 },
              {"text-red-600": countAllErrors === 5 },
            )}
          >
            {`${countAllErrors}`}
          </span>
        </p>
        <p className="font-light">{`Limite de erros: `}
          <span className="font-bold">
            {`${maxErrors}`}
          </span>
        </p>
      </div>
      
    </div>
  )
}

export default Home
