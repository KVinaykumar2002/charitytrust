"use client";

import { createContext, useContext, useEffect, useState } from "react";

export type Language = {
  code: string;
  name: string;
  nativeName: string;
  flag: string;
};

export const languages: Language[] = [
  // Indian Languages
  { code: "en", name: "English", nativeName: "English", flag: "🇬🇧" },
  { code: "hi", name: "Hindi", nativeName: "हिन्दी", flag: "🇮🇳" },
  { code: "te", name: "Telugu", nativeName: "తెలుగు", flag: "🇮🇳" },
  { code: "ta", name: "Tamil", nativeName: "தமிழ்", flag: "🇮🇳" },
  { code: "kn", name: "Kannada", nativeName: "ಕನ್ನಡ", flag: "🇮🇳" },
  { code: "ml", name: "Malayalam", nativeName: "മലയാളം", flag: "🇮🇳" },
  { code: "mr", name: "Marathi", nativeName: "मराठी", flag: "🇮🇳" },
  { code: "bn", name: "Bengali", nativeName: "বাংলা", flag: "🇮🇳" },
  { code: "gu", name: "Gujarati", nativeName: "ગુજરાતી", flag: "🇮🇳" },
  { code: "pa", name: "Punjabi", nativeName: "ਪੰਜਾਬੀ", flag: "🇮🇳" },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", flag: "🇮🇳" },
  { code: "as", name: "Assamese", nativeName: "অসমীয়া", flag: "🇮🇳" },
  { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇮🇳" },
  
  // International Languages
  { code: "es", name: "Spanish", nativeName: "Español", flag: "🇪🇸" },
  { code: "fr", name: "French", nativeName: "Français", flag: "🇫🇷" },
  { code: "de", name: "German", nativeName: "Deutsch", flag: "🇩🇪" },
  { code: "pt", name: "Portuguese", nativeName: "Português", flag: "🇵🇹" },
  { code: "ru", name: "Russian", nativeName: "Русский", flag: "🇷🇺" },
  { code: "ja", name: "Japanese", nativeName: "日本語", flag: "🇯🇵" },
  { code: "ko", name: "Korean", nativeName: "한국어", flag: "🇰🇷" },
  { code: "zh", name: "Chinese", nativeName: "中文", flag: "🇨🇳" },
  { code: "ar", name: "Arabic", nativeName: "العربية", flag: "🇸🇦" },
  { code: "it", name: "Italian", nativeName: "Italiano", flag: "🇮🇹" },
  { code: "nl", name: "Dutch", nativeName: "Nederlands", flag: "🇳🇱" },
  { code: "tr", name: "Turkish", nativeName: "Türkçe", flag: "🇹🇷" },
];

interface LanguageContextType {
  currentLanguage: Language;
  changeLanguage: (languageCode: string) => void;
  translateText: (text: string) => Promise<string>;
  isTranslating: boolean;
}

const defaultContextValue: LanguageContextType = {
  currentLanguage: languages[0],
  changeLanguage: () => {},
  translateText: async (text: string) => text,
  isTranslating: false,
};

const LanguageContext = createContext<LanguageContextType>(defaultContextValue);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(languages[0]); // Default to English
  const [mounted, setMounted] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check localStorage for saved language preference
    const savedLanguageCode = localStorage.getItem("language");
    if (savedLanguageCode) {
      const savedLanguage = languages.find(lang => lang.code === savedLanguageCode);
      if (savedLanguage) {
        setCurrentLanguage(savedLanguage);
        // Set HTML lang attribute
        document.documentElement.lang = savedLanguageCode;
      }
    }
  }, []);

  const changeLanguage = (languageCode: string) => {
    const newLanguage = languages.find(lang => lang.code === languageCode);
    if (newLanguage) {
      setCurrentLanguage(newLanguage);
      localStorage.setItem("language", languageCode);
      document.documentElement.lang = languageCode;
      
      // Trigger translation of page content
      if (languageCode !== "en") {
        translatePageContent(languageCode);
      } else {
        // Reload to show original English content
        window.location.reload();
      }
    }
  };

  const translatePageContent = async (targetLanguage: string) => {
    setIsTranslating(true);

    try {
      const walker = document.createTreeWalker(
        document.body,
        NodeFilter.SHOW_TEXT,
        {
          acceptNode: (node) => {
            if (
              node.parentElement?.tagName === "SCRIPT" ||
              node.parentElement?.tagName === "STYLE" ||
              node.parentElement?.tagName === "NOSCRIPT" ||
              !node.textContent?.trim()
            ) {
              return NodeFilter.FILTER_REJECT;
            }
            return NodeFilter.FILTER_ACCEPT;
          },
        }
      );

      const textNodes: Node[] = [];
      let node;
      while ((node = walker.nextNode())) {
        textNodes.push(node);
      }

      const batchSize = 10;
      for (let i = 0; i < textNodes.length; i += batchSize) {
        const batch = textNodes.slice(i, i + batchSize);
        await Promise.all(
          batch.map(async (textNode) => {
            const parent = textNode.parentElement;
            if (!parent) return;
            const trimmed = textNode.textContent?.trim();
            if (!trimmed || trimmed.length === 0) return;

            // Always use English as source: stored when we first translated, or current text if still English
            const sourceEnglish =
              parent.getAttribute("data-original-en") ?? trimmed;

            try {
              const translatedText = await translateText(
                sourceEnglish,
                targetLanguage
              );
              if (textNode.textContent) {
                textNode.textContent = translatedText;
              }
              // Keep English source for future language switches (e.g. Hindi → Tamil)
              parent.setAttribute("data-original-en", sourceEnglish);
            } catch (error) {
              console.error("Translation error:", error);
            }
          })
        );
      }
    } catch (error) {
      console.error("Page translation error:", error);
    } finally {
      setIsTranslating(false);
    }
  };

  const translateText = async (text: string, targetLanguage?: string): Promise<string> => {
    const target = targetLanguage || currentLanguage.code;
    
    // If target is English, return original text
    if (target === "en") {
      return text;
    }

    try {
      // Using Google Translate API (via MyMemory Translation API as a free alternative)
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${target}`
      );
      
      const data = await response.json();
      
      if (data.responseStatus === 200 && data.responseData?.translatedText) {
        return data.responseData.translatedText;
      }
      
      // Fallback: return original text if translation fails
      return text;
    } catch (error) {
      console.error("Translation API error:", error);
      return text;
    }
  };

  // Always wrap in Provider so useLanguage() works on first render (before mount)
  const value: LanguageContextType = {
    currentLanguage,
    changeLanguage,
    translateText,
    isTranslating,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
