import React, { useState } from 'react';
import './App.css';
import "primereact/resources/themes/lara-light-indigo/theme.css";  
import "primereact/resources/primereact.min.css"; 
import 'primeicons/primeicons.css'; 
//import { InputText } from 'primereact/inputtext';
import { PanelMenu } from 'primereact/panelmenu';
import MenuRouter from './router/MenuRouter';

import 'bootstrap/dist/css/bootstrap.min.css';

//import { useCookies } from 'react-cookie';

function App() {
  //const [activeItem, setActiveItem] = useState(null);
  const [showSidebar, setShowSidebar] = useState(false);

  
  //const [cookies, setCookie] = useCookies();

  //setCookie('cookieName', 'cookieValue', { sameSite: 'Strict' });

  //const cookieValue = cookies.cookieName;

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  

  const items = [
    {
      label: 'Inicio',
      icon: 'pi pi-home',
      command: () => {
        // Lógica para ir a la página de inicio        
        //setActiveItem('Inicio');
        setShowSidebar(false);
        
      },
      url: '/'
    },
    /*
    {
      label: 'Busqueda',
      icon: 'pi pi-search',
      command: () => {
        // Lógica para ir a la página de inicio        
        setActiveItem('Inicio');
        setShowSidebar(false);
        
      },
      url: '/search'
    },
    {
      label: 'Filtros',
      icon: 'pi pi-search',
      items: [
        {
          label: 'Filtros',
          icon: 'pi pi-list',
          command: () => {
            // Lógica para ir a la página de lista de usuarios
            //setActiveItem('Lista de usuarios');
            setShowSidebar(false);
          },
          url: '/filter'
        },        
      ]
    },*/
    
    {
      label: 'Configuración',
      icon: 'pi pi-cog',
      items: [
        {
          label: 'Gestionar peliculas',
          icon: 'pi pi-list',
          command: () => {
            // Lógica para ir a la página de perfil de usuario
            //setActiveItem('Perfil');
            setShowSidebar(false);
          },
          url: '/movie'
        },
        {
          label: 'Preferencias',
          icon: 'pi pi-cog',
          command: () => {
            // Lógica para ir a la página de preferencias
            //setActiveItem('Preferencias');
            setShowSidebar(false);
          },
          url: '/config'
        }
      ]
    }
  ];

  return (
    <div className="app">
      <div className="header">
        <div className={`hamburger ${showSidebar ? 'active' : ''}`} onClick={toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <div>
          <i className="pi pi-youtube" style={{ fontSize: '4rem' }}></i>
        </div>
       
        {/*<div className="search-bar-container">
          <InputText className="search-bar" placeholder="Buscar" />
  </div>*/}
      </div>
      <div className="content">
        <div className={`sidebar ${showSidebar ? 'active' : ''}`}>
          <PanelMenu model={items} />
        </div>
        <div className="main-content">
          <MenuRouter></MenuRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
