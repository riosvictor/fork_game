import React, { useEffect, useRef, useState } from 'react'
import type { NextPage } from 'next'
import Head from 'next/head'
import classnames from 'classnames'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { convertStringToArray, getRandonWord, initWordToDisplay } from '../server/functions'
import Toggle from '../components/Toggle'
import HideLetter from '../components/HideLetter'
import ButtonAction from '../components/ButtonAction'

const Home: NextPage = () => {
  const maxErrors = 5
  const [getSecretWord, setSecretWord] = useState<string[]>([])
  const [getUserWord, setUserWord] = useState<string[]>([])
  const [getWrongLetters, setWrongLetters] = useState<string[]>([])
  const [countAllErrors, setAllErrors] = useState(0)
  const [userLetter, setUserLetter] = useState('')
  const [restart, setRestart] = useState(false)
  const [isDark, setDark] = useState(false)
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


  /// functions
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

      toast('Você acertou!')
    } else {
      setWrongLetters(oldLetters => {
        return [...oldLetters, userLetter]
      })
      setAllErrors(countAllErrors + 1)

      toast('Você errou!')
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

  /// page
  return (
    <div className={
      classnames(
        "p-5 m-1 my-5 border-solid border-2 border-gray-400 rounded-md",
        {
          "bg-stone-900": isDark
        }
      )}
    >
      <Head>
        <title>Jogo da Forca</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <ToastContainer />

      <h1 className="text-indigo-500 font-serif text-4xl font-medium italic leading-8 text-center mt-0 mx-0 mb-12">
        Bem vindo ao Jogo da Forca
      </h1>

      <div className="flex justify-end items-center gap-2">
        <span
          className={
            classnames(
              {
                "text-white": isDark
              }
            )}
        >
          Dark Mode
        </span>
        <Toggle isActive={isDark} setValue={setDark} />
      </div>
      

      <main className="border-double border-4 border-indigo-600 p-5 mb-5 rounded-md">
        <div className="flex flex-row gap-[5%] md:mb-20 mb-10 content-center justify-center">
          {getUserWord.map((letter, index) => 
            <HideLetter key={index} isDark={isDark}> {letter} </HideLetter>
          )}
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

                <ButtonAction 
                  onClick={() => doKick()}
                  disabled={finishGame}
                  labelButton="Chutar"
                />
              </>
            ) :
            (
              <>
                {isAssertAll ? 
                  <p 
                    className={
                      classnames(
                        "underline decoration-green-500 text-xl",
                        {
                          "text-white": isDark
                        }
                      )}
                  >
                    Parabéns, você acertou a palavra completa!
                  </p>
                  :
                  <p 
                    className={
                      classnames(
                        "text-xl",
                        {
                          "text-white": isDark
                        }
                      )}
                  >
                    <span className="underline decoration-pink-500">Que pena, você foi enforcado(a).</span> 
                    {` A palavra era `}
                    <span className="text-pink-500 font-medium text-lg">
                      &apos;{getSecretWord.join('')}&apos;
                    </span>. 
                  </p>
                }
                <ButtonAction 
                  onClick={() => setRestart(!restart)}
                  labelButton="Reiniciar o jogo"
                />
              </>
            )
          }
        </div>

      </main>

      
      <div className="flex flex-col text-2xl">
        <p 
          className={
            classnames(
              "font-bold underline decoration-indigo-500 mb-5",
              {
                "text-white": isDark
              }
            )}
        >
          Informações da partida</p>
        <p 
          className={
            classnames(
              "font-light",
              {
                "text-white": isDark
              }
            )}
        >
          {`Letras erradas: `} 
          <span className="font-bold text-yellow-500">
            {`${getWrongLetters.length > 0 ? `[${getWrongLetters}]` : 0}`}
          </span>
        </p>
        <p 
          className={
            classnames(
              "font-light",
              {
                "text-white": isDark
              }
            )}
        >
          {`Tentativas erradas: `}
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
        <p 
          className={
            classnames(
              "font-light",
              {
                "text-white": isDark
              }
            )}
        >
          {`Limite de erros: `}
          <span className="font-bold">
            {`${maxErrors}`}
          </span>
        </p>
      </div>
      
    </div>
  )
}

export default Home
