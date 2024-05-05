import React, { useState, useEffect, useRef } from 'react';

const SpeechToText = () => {
  const [listening, setListening] = useState(false);
  const [synthesizing, setSynthesizing] = useState(false);
  const spokenTextRef = useRef('');

  useEffect(() => {
    // @ts-ignore
    let recognition = null;

    const startRecognition = () => {
      // @ts-ignore
      recognition = new window.webkitSpeechRecognition();
      recognition.lang = 'pl-PL';

      recognition.onstart = () => {
        console.log('Rozpoczęto nasłuchiwanie.');
      };
// @ts-ignore
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        spokenTextRef.current = transcript;
      };

      recognition.onend = () => {
        console.log('Zakończono nasłuchiwanie.');
        if (listening) {
          startRecognition();
        }
      };
// @ts-ignore
      recognition.onerror = (event) => {
        console.error('Błąd rozpoznawania mowy:', event.error);
      };

      recognition.start();
    };

    const stopRecognition = () => {
      // @ts-ignore
      if (recognition) {
        recognition.stop();
      }
    };

    if (listening) {
      startRecognition();
    } else {
      stopRecognition();
    }

    return () => {
      stopRecognition();
    };
  }, [listening]);

  const toggleListening = () => {
    setListening(!listening);
  };

  const speakText = () => {
    setSynthesizing(true);
    const speech = new SpeechSynthesisUtterance('random tekst');
    speech.onend = () => {
      setSynthesizing(false);
    };
    speech.onstart = () => {
      spokenTextRef.current = ''; // Resetujemy spokenText, gdy syntezator rozpoczyna odtwarzanie tekstu
    };
    window.speechSynthesis.speak(speech);
  };

  return (
    <div>
      <h1>Reaktywne przetwarzanie mowy</h1>
      <button onClick={toggleListening}>
        {listening ? 'Zatrzymaj nasłuchiwanie' : 'Rozpocznij nasłuchiwanie'}
      </button>
      <button onClick={speakText} disabled={synthesizing}>
        Przetwórz na mowę
      </button>
      <p>{spokenTextRef.current}</p>
    </div>
  );
};

export default SpeechToText;