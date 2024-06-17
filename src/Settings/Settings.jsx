import React, { useState } from 'react';

function Settings({setTitle}) {
  setTitle("Ustawienia");

  const [activeCategory, setActiveCategory] = useState(null);
  const [theme, setTheme] = useState('light-mode');
  const [fontSize, setFontSize] = useState('font-medium');

  const categories = [
    { name: 'Motyw', options: ['Jasny', 'Ciemny'] },
    { name: 'Język', options: ['Polski', 'English'] },
    { name: 'Rozmiar czcionki', options: ['Mała', 'Średnia', 'Duża'] },
    { name: 'Powiadomienia', options: ['Email', 'SMS', 'Push'] },
    { name: 'Twoje konto', options: ['Wyloguj się', 'Zmień hasło'] },
    { name: 'Regulamin', link: './terms.html' },
    { name: 'Polityka Prywatności', link: './privacy.html' },
  ];

  const toggleCategory = (categoryName) => {
    setActiveCategory(activeCategory === categoryName ? null : categoryName);
  };

  const handleDirectLink = (link) => {
    window.location.href = link;
  };

  const handleThemeChange = (themeName) => {
    setTheme(themeName);
    document.body.className = `${themeName} ${fontSize}`;
  };

  const handleFontSizeChange = (fontSizeName) => {
    setFontSize(fontSizeName);
    document.body.className = `${theme} ${fontSizeName}`;
  };

  const handleLogout = () => {
    fetch('/api/logout', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => {
        if (response.ok) {
          console.log('Wylogowanie powiodło się, przekierowanie na /api/login');
          window.location.href = '/api/logout';
        } else {
          console.log('Błąd podczas wylogowania:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Błąd podczas wylogowania:', error);
      });
  };

  const handleReset = () => {
    fetch('/api/new-password', {
      method: 'GET',
      credentials: 'include'
    })
      .then(response => {
        if (response.ok) {
          window.location.href = '/api/new-password';
        } else {
          console.log(response.statusText);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div >
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
                  } else if(category.name === 'Twoje konto'){
                      if(option === 'Wyloguj się')
                        handleLogout();
                      if(option === 'Zmień hasło')
                        handleReset();
                  }else{
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

export default Settings;
