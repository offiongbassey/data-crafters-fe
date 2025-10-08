declare global {
    interface Window {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      webkitSpeechRecognition: any;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      SpeechRecognition: any;
    }
  
    interface SpeechRecognition extends EventTarget {
      lang: string;
      continuous: boolean;
      interimResults: boolean;
      start: () => void;
      stop: () => void;
      onresult: (event: SpeechRecognitionEvent) => void;
      onend: () => void;
    }
  
    interface SpeechRecognitionEvent {
      results: {
        [key: number]: {
          [key: number]: {
            transcript: string;
          };
        };
      };
    }
  }
  
  export {};