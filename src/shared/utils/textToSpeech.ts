export const textToSpeech = (text: string, lang = 'en-US') => {
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang;
  window.speechSynthesis.speak(utter);
};
