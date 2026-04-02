import { useState, useEffect } from "react";

interface UseTypingAnimationProps {
  texts: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseBeforeDelete?: number;
  pauseBetweenTexts?: number;
}

interface TypingState {
  displayText: string;
  isDeleting: boolean;
  textIndex: number;
  showCursor: boolean;
}

export const useTypingAnimation = ({
  texts,
  typingSpeed = 50,
  deletingSpeed = 30,
  pauseBeforeDelete = 2000,
  pauseBetweenTexts = 500,
}: UseTypingAnimationProps) => {
  const [state, setState] = useState<TypingState>({
    displayText: "",
    isDeleting: false,
    textIndex: 0,
    showCursor: true,
  });

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const currentText = texts[state.textIndex];

    if (!state.isDeleting) {
      // Typing phase
      if (state.displayText.length < currentText.length) {
        timer = setTimeout(() => {
          setState((prev) => ({
            ...prev,
            displayText: currentText.slice(0, prev.displayText.length + 1),
          }));
        }, typingSpeed);
      } else {
        // Pause before deleting
        timer = setTimeout(() => {
          setState((prev) => ({
            ...prev,
            isDeleting: true,
          }));
        }, pauseBeforeDelete);
      }
    } else {
      // Deleting phase
      if (state.displayText.length > 0) {
        timer = setTimeout(() => {
          setState((prev) => ({
            ...prev,
            displayText: prev.displayText.slice(0, -1),
          }));
        }, deletingSpeed);
      } else {
        // Move to next text
        timer = setTimeout(() => {
          setState((prev) => ({
            ...prev,
            textIndex: (prev.textIndex + 1) % texts.length,
            isDeleting: false,
          }));
        }, pauseBetweenTexts);
      }
    }

    return () => clearTimeout(timer);
  }, [state, texts, typingSpeed, deletingSpeed, pauseBeforeDelete, pauseBetweenTexts]);

  // Cursor blink effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setState((prev) => ({
        ...prev,
        showCursor: !prev.showCursor,
      }));
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  return {
    displayText: state.displayText,
    showCursor: state.showCursor,
  };
};
