"use client";

import { Languages, Check, Loader2 } from "lucide-react";
import { useLanguage, languages } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function LanguageSelector() {
  const { currentLanguage, changeLanguage, isTranslating } = useLanguage();

  // Group languages
  const indianLanguages = languages.filter((lang) =>
    ["en", "hi", "te", "ta", "kn", "ml", "mr", "bn", "gu", "pa", "or", "as", "ur"].includes(lang.code)
  );
  const internationalLanguages = languages.filter((lang) =>
    ["es", "fr", "de", "pt", "ru", "ja", "ko", "zh", "ar", "it", "nl", "tr"].includes(lang.code)
  );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-3 py-2 text-white transition-all duration-300 hover:bg-white/20 dark:bg-white/10 dark:hover:bg-white/20"
          aria-label="Select language"
          title="Select language"
          disabled={isTranslating}
        >
          {isTranslating ? (
            <Loader2 className="h-5 w-5 animate-spin" />
          ) : (
            <>
              <Languages className="h-5 w-5" />
              <span className="hidden sm:inline text-sm font-medium">
                {currentLanguage.flag}
              </span>
            </>
          )}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-64 max-h-[400px] overflow-y-auto bg-white dark:bg-[#1a1a1a] border-[#e5e5e5] dark:border-[#333]"
      >
        <DropdownMenuLabel className="text-[#1a1a1a] dark:text-white">
          Select Language
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* Indian Languages */}
        <DropdownMenuLabel className="text-xs text-[#666] dark:text-[#a0a0a0] font-semibold uppercase">
          Indian Languages
        </DropdownMenuLabel>
        {indianLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className="flex items-center justify-between cursor-pointer hover:bg-[#f7f7f7] dark:hover:bg-[#2a2a2a]"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{language.flag}</span>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[#1a1a1a] dark:text-white">
                  {language.name}
                </span>
                <span className="text-xs text-[#666] dark:text-[#a0a0a0]">
                  {language.nativeName}
                </span>
              </div>
            </div>
            {currentLanguage.code === language.code && (
              <Check className="h-4 w-4 text-[#FD7E14]" />
            )}
          </DropdownMenuItem>
        ))}
        
        <DropdownMenuSeparator />
        
        {/* International Languages */}
        <DropdownMenuLabel className="text-xs text-[#666] dark:text-[#a0a0a0] font-semibold uppercase">
          International Languages
        </DropdownMenuLabel>
        {internationalLanguages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className="flex items-center justify-between cursor-pointer hover:bg-[#f7f7f7] dark:hover:bg-[#2a2a2a]"
          >
            <div className="flex items-center gap-2">
              <span className="text-lg">{language.flag}</span>
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[#1a1a1a] dark:text-white">
                  {language.name}
                </span>
                <span className="text-xs text-[#666] dark:text-[#a0a0a0]">
                  {language.nativeName}
                </span>
              </div>
            </div>
            {currentLanguage.code === language.code && (
              <Check className="h-4 w-4 text-[#FD7E14]" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
