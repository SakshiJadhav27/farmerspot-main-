import React from 'react';
import './App.css';
import { Router } from './Component/Router';
import { LanguageProvider } from './Component/LanguageTranslate/LanguageContext';



function app(){

  return(
    <div>
      <LanguageProvider>
      <div className='app'>
        <Router/>
      </div>
      </LanguageProvider>
    </div>

)

}
export default app;

