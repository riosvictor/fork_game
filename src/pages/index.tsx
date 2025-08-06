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
import GameIcon from '../components/GameIcon'

const Home: NextPage = () => {
  const maxErrors = 5
  const [getSecretWord, setSecretWord] = useState<string[]>([])
  const [getUserWord, setUserWord] = useState<string[]>([])
  const [getWrongLetters, setWrongLetters] = useState<string[]>([])
  const [countAllErrors, setAllErrors] = useState(0)
  const [userLetter, setUserLetter] = useState('')
  const [restart, setRestart] = useState(false)
  const [isDark, setDark] = useState(false)
  const [isKeyboardOpen, setKeyboardOpen] = useState(false)
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

  // Detectar quando o teclado virtual abre/fecha
  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        const windowHeight = window.innerHeight
        const documentHeight = document.documentElement.clientHeight
        
        // Se a altura da janela for muito menor que a altura do documento, assume que o teclado está aberto
        const keyboardThreshold = 300
        setKeyboardOpen(documentHeight - windowHeight > keyboardThreshold)
      }
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }
  }, [])

  function doKick() {
    if (!userLetter) {
      toast('Digite uma letra antes de chutar.', {type: 'warning'})
      return
    }

    const userLetterValid = userLetter.toLowerCase()

    const alreadyUsed = getUserWord.includes(userLetterValid) || getWrongLetters.includes(userLetterValid)
    if (alreadyUsed) {
      toast('Essa letra já foi usada!', {type: 'warning'})
      setUserLetter('')
      inputEl.current?.focus();
      return
    }
    
    const acertouLetra = getSecretWord.includes(userLetterValid)

    if (acertouLetra){
      getSecretWord.forEach((letra, index) => {
        if (userLetterValid === letra.toLowerCase()){
          setUserWord(oldLetters => {
            const newArray = [...oldLetters]

            newArray[index] = letra

            return newArray
          })
          
        }
      })

      toast('Você acertou!', {type: 'success'})
    } else {
      setWrongLetters(oldLetters => {
        return [...oldLetters, userLetterValid]
      })
      setAllErrors(countAllErrors + 1)

      toast('Você errou!', {type: 'error'})
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
      toast('Informe uma letra válida!', {type: 'warning'})
    }
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      doKick()
    }
  }

  return (
    <div className={
      classnames(
        "mobile-container viewport-height w-full transition-all duration-300 ease-in-out safe-area-padding",
        {
          "bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900": isDark,
          "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50": !isDark,
          "keyboard-open": isKeyboardOpen
        }
      )}
    >
      <Head>
        <title>Jogo da Forca</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover, interactive-widget=resizes-content" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content={isDark ? "#1e293b" : "#6366f1"} />
        <meta name="description" content="Jogo da Forca - Descubra a palavra secreta antes que seja tarde!" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/game-icon.svg" />
      </Head>

      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={isDark ? "dark" : "light"}
        style={{ zIndex: 9999 }}
      />

      <div className="mobile-content px-4 py-2 md:py-6 max-w-4xl mx-auto w-full">
        {/* Header */}
        <header className={classnames(
          "text-center mobile-header fade-in",
          {
            "mb-4 md:mb-8": !isKeyboardOpen,
            "mb-2": isKeyboardOpen
          }
        )}>
          <div className="flex items-center justify-center mb-2 md:mb-4">
            <GameIcon size={48} className="mr-3 md:mr-4" />
            <h1 className={classnames(
              "text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r bg-clip-text text-transparent",
              {
                "from-purple-400 to-pink-400": isDark,
                "from-indigo-600 to-purple-600": !isDark
              }
            )}>
              Jogo da Forca
            </h1>
          </div>
          <p className={classnames(
            "text-sm sm:text-lg md:text-xl opacity-80",
            {
              "text-gray-300": isDark,
              "text-gray-600": !isDark
            }
          )}>
            Descubra a palavra secreta antes que seja tarde!
          </p>
        </header>

        {/* Toggle Dark Mode */}
        <div className="flex justify-end items-center gap-3 mb-3 md:mb-6">
          <span className={classnames(
            "text-xs sm:text-sm font-medium transition-colors",
            {
              "text-gray-300": isDark,
              "text-gray-700": !isDark
            }
          )}>
            🌙 Modo Escuro
          </span>
          <Toggle isActive={isDark} setValue={setDark} />
        </div>

        {/* Main Game Area */}
        <main className={classnames(
          "rounded-xl md:rounded-2xl shadow-xl md:shadow-2xl p-4 md:p-8 mobile-spacing transition-all duration-300 backdrop-blur-sm",
          {
            "bg-slate-800/80 border border-slate-700": isDark,
            "bg-white/80 border border-white/20": !isDark
          }
        )}>
          {/* Word Display */}
          <div className="flex flex-wrap justify-center items-center gap-1 sm:gap-2 md:gap-4 mb-4 md:mb-8 min-h-[60px] sm:min-h-[80px] md:min-h-[120px]">
            {getUserWord.map((letter, index) => 
              <div key={index} className="bounce-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <HideLetter isDark={isDark}>{letter}</HideLetter>
              </div>
            )}
          </div>

          {/* Game Input/Results */}
          <div className="flex flex-col items-center space-y-3 md:space-y-6">
            {!finishGame ? (
              <div className="w-full max-w-sm md:max-w-md space-y-3 md:space-y-4">
                <input 
                  type="text" 
                  maxLength={1} 
                  placeholder="Digite uma letra..."
                  value={userLetter}
                  onChange={(event) => handleUserLetter(event)}
                  onKeyDown={(event) => handleKeyDown(event)}
                  ref={inputEl}
                  className={classnames(
                    "mobile-input w-full text-center text-xl sm:text-2xl md:text-4xl p-3 md:p-4 rounded-lg md:rounded-xl border-2 transition-all duration-200 focus:outline-none focus:ring-4 font-bold uppercase shadow-lg",
                    {
                      "bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-purple-500 focus:ring-purple-500/30": isDark,
                      "bg-white border-gray-300 text-gray-800 placeholder-gray-400 focus:border-indigo-500 focus:ring-indigo-500/30": !isDark
                    }
                  )}
                />
                <ButtonAction 
                  onClick={() => doKick()}
                  disabled={finishGame}
                  labelButton="🎯 Chutar"
                />
              </div>
            ) : (
              <div className="text-center space-y-3 md:space-y-6 fade-in">
                {isAssertAll ? (
                  <div className="space-y-2 md:space-y-4">
                    <div className="text-4xl md:text-6xl mb-2 md:mb-4">🎉</div>
                    <p className={classnames(
                      "text-xl sm:text-2xl md:text-3xl font-bold",
                      {
                        "text-green-400": isDark,
                        "text-green-600": !isDark
                      }
                    )}>
                      Parabéns! Você venceu!
                    </p>
                    <p className={classnames(
                      "text-sm sm:text-lg",
                      {
                        "text-gray-300": isDark,
                        "text-gray-600": !isDark
                      }
                    )}>
                      Você descobriu a palavra completa!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 md:space-y-4">
                    <div className="text-4xl md:text-6xl mb-2 md:mb-4">💀</div>
                    <p className={classnames(
                      "text-xl sm:text-2xl md:text-3xl font-bold",
                      {
                        "text-red-400": isDark,
                        "text-red-600": !isDark
                      }
                    )}>
                      Game Over!
                    </p>
                    <p className={classnames(
                      "text-sm sm:text-lg",
                      {
                        "text-gray-300": isDark,
                        "text-gray-600": !isDark
                      }
                    )}>
                      A palavra era:{' '}
                      <span className={classnames(
                        "font-bold text-lg sm:text-xl",
                        {
                          "text-purple-400": isDark,
                          "text-purple-600": !isDark
                        }
                      )}>
                        &apos;{getSecretWord.join('')}&apos;
                      </span>
                    </p>
                  </div>
                )}
                <ButtonAction 
                  onClick={() => setRestart(!restart)}
                  labelButton="🔄 Jogar Novamente"
                />
              </div>
            )}
          </div>
        </main>

        {/* Game Stats */}
        <div className={classnames(
          "mobile-stats rounded-lg md:rounded-xl p-4 md:p-6 transition-all duration-300 mt-4 md:mt-8",
          {
            "bg-slate-800/60 border border-slate-700": isDark,
            "bg-white/60 border border-white/20": !isDark
          }
        )}>
          <h2 className={classnames(
            "text-lg sm:text-xl md:text-2xl font-bold mb-3 md:mb-4 flex items-center gap-2",
            {
              "text-purple-400": isDark,
              "text-indigo-600": !isDark
            }
          )}>
            📊 Estatísticas da Partida
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {/* Wrong Letters */}
            <div className={classnames(
              "p-3 md:p-4 rounded-lg",
              {
                "bg-slate-700/50": isDark,
                "bg-gray-50": !isDark
              }
            )}>
              <p className={classnames(
                "text-xs sm:text-sm font-medium mb-1",
                {
                  "text-gray-400": isDark,
                  "text-gray-600": !isDark
                }
              )}>
                Letras Erradas
              </p>
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-yellow-500">
                {getWrongLetters.length > 0 ? getWrongLetters.join(', ').toUpperCase() : '—'}
              </p>
            </div>

            {/* Error Count */}
            <div className={classnames(
              "p-3 md:p-4 rounded-lg",
              {
                "bg-slate-700/50": isDark,
                "bg-gray-50": !isDark
              }
            )}>
              <p className={classnames(
                "text-xs sm:text-sm font-medium mb-1",
                {
                  "text-gray-400": isDark,
                  "text-gray-600": !isDark
                }
              )}>
                Tentativas Erradas
              </p>
              <p className={classnames(
                "text-lg sm:text-xl md:text-2xl font-bold",
                {
                  "text-green-500": countAllErrors <= 2,
                  "text-yellow-500": countAllErrors === 3,
                  "text-orange-500": countAllErrors === 4,
                  "text-red-500": countAllErrors >= 5
                }
              )}>
                {countAllErrors} / {maxErrors}
              </p>
            </div>

            {/* Progress */}
            <div className={classnames(
              "p-3 md:p-4 rounded-lg sm:col-span-2 md:col-span-1",
              {
                "bg-slate-700/50": isDark,
                "bg-gray-50": !isDark
              }
            )}>
              <p className={classnames(
                "text-xs sm:text-sm font-medium mb-1",
                {
                  "text-gray-400": isDark,
                  "text-gray-600": !isDark
                }
              )}>
                Progresso
              </p>
              <div className={classnames(
                "w-full bg-gray-200 rounded-full h-2 md:h-3 mb-2",
                {
                  "bg-gray-600": isDark
                }
              )}>
                <div 
                  className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2 md:h-3 rounded-full transition-all duration-500"
                  style={{ 
                    width: `${((getUserWord.filter(l => l !== '_').length) / getUserWord.length) * 100}%` 
                  }}
                ></div>
              </div>
              <p className={classnames(
                "text-xs sm:text-sm",
                {
                  "text-gray-400": isDark,
                  "text-gray-600": !isDark
                }
              )}>
                {getUserWord.filter(l => l !== '_').length} de {getUserWord.length} letras
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
