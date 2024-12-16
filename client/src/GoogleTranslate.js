import React, { useEffect, useState } from "react";

const GoogleTranslate = () => {
  const [state, setState] = useState(false);
  const loadGoogleTranslateScript = () => {
    const script = document.createElement("script");
    script.src =
      "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;

    script.onerror = (error) => {
      console.error("Error loading Google Translate script:", error);
    };

    document.body.appendChild(script);
  };

  // Initialize Google Translate when the script is loaded
  window.googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en", // Default language
        includedLanguages: "en,hi,kn", // Languages to include
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element"
    );
  };
  useEffect(() => {
    // Function to load the Google Translate script dynamically
    loadGoogleTranslateScript();
    setState(false);
  }, []);

  return (
    <div>
      {/* Google Translate dropdown will be placed here */}
      <div id="google_translate_element"></div>
    </div>
  );
};

export default GoogleTranslate;
