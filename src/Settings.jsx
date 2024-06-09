import React, { useState, useEffect } from 'react';
import './styles.css';

function App() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light-mode');
  const [fontSize, setFontSize] = useState(localStorage.getItem('fontSize') || 'font-medium');

  const categories = [
    { name: 'Motyw', options: ['Jasny', 'Ciemny'] },
    { name: 'Język', options: ['Polski', 'English'] },
    { name: 'Rozmiar czcionki', options: ['Mała', 'Średnia', 'Duża'] },
    { name: 'Powiadomienia', options: ['Email', 'SMS', 'Push'] },
    { name: 'Twoje konto', options: ['Wyloguj się', 'Zmień hasło'] },
    { name: 'Regulamin', link: './terms.html' },
    { name: 'Polityka Prywatności', link: './privacy.html' },
  ];

  useEffect(() => {
    // Ustawianie zapisanego motywu i rozmiaru czcionki z localStorage przy pierwszym renderowaniu
    document.body.className = `${theme} ${fontSize}`;
  }, [theme, fontSize]);

  const toggleCategory = (categoryName) => {
    setActiveCategory(activeCategory === categoryName ? null : categoryName);
  };

  const handleDirectLink = (link) => {
    window.location.href = link;
  };

  const handleThemeChange = (themeName) => {
    setTheme(themeName);
    document.body.className = `${themeName} ${fontSize}`;
    
    // Zapisywanie preferowanego motywu w localStorage
    localStorage.setItem('theme', themeName);
  };

  const handleFontSizeChange = (fontSizeName) => {
    setFontSize(fontSizeName);
    document.body.className = `${theme} ${fontSizeName}`;

    // Zapisywanie preferowanego rozmiaru czcionki w localStorage
    localStorage.setItem('fontSize', fontSizeName);
  };

  return (
    <div className={`App ${theme} ${fontSize}`}>
      {categories.map((category) => (
        <div key={category.name}>
          <div
            className={`category-header ${activeCategory === category.name ? 'active' : ''}`}
            onClick={() => {
              if (category.link) {
                handleDirectLink(category.link);
              } else {
                toggleCategory(category.name);
              }
            }}
          >
            {category.name}
          </div>
          {activeCategory === category.name && (
            <div className="category-content active">
              {category.options && category.options.map((option) => (
                <button key={option} onClick={() => {
                  if (category.name === 'Motyw') {
                    handleThemeChange(option.toLowerCase() === 'jasny' ? 'light-mode' : 'dark-mode');
                  } else if (category.name === 'Rozmiar czcionki') {
                    handleFontSizeChange(option.toLowerCase() === 'mała' ? 'font-small' : 
                                         option.toLowerCase() === 'średnia' ? 'font-medium' : 'font-large');
                  } else {
                    console.log(option);
                  }
                }}>
                  {option}
                </button>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
