import React, { useState } from 'react';
import axios from 'axios';
import './StruttureMarche.css';
const StruttureMarche = () => {
  const [strutture, setStrutture] = useState([]);
  const [provincia, setProvincia] = useState('');
  const [loading, setLoading] = useState(false);

const getAllStrutture = async () => {
    setLoading(true);
  
    const soapRequest = `
      <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:str="http://tempuri.org/">
        <soapenv:Header/>
        <soapenv:Body>
          <str:GetAllStrutture/>
        </soapenv:Body>
      </soapenv:Envelope>
    `;
  
    try {

      const { data } = await axios.get(
        'http://localhost:5212/api/Marche/DaiStruttura',
        soapRequest,
        {
          'Access-Control-Allow-Origin':'*'
        }
      );
  
      const risultati = data.map((item) => ({
        nome: item.denominazione || item.nome,
        provincia: item.provincia,
        comune: item.comune,
        indirizzo: item.indirizzo,
        categoria: item.categoriaStruttura,

      }));
  
      setStrutture(risultati);
    } catch (error) {
      console.error("Errore:", error);
    } finally {
      setLoading(false);
    }
  };

const getStruttureByProvincia = async () => {
  if (!provincia.trim()) {
    alert("Inserisci una provincia valida");
    return;
  }

  setLoading(true);

  try {
    const response = await axios.get(
      'http://localhost:5212/api/Marche/RicercaPerProvincia',
      {
        params: { provincia },
      }
    );

    console.log("Risposta:", response.data);

    const strutturePulite = response.data.map((item) => ({
      nome: item.denominazione || item.nome,
      provincia: item.provincia,
      comune: item.comune,
      indirizzo: item.indirizzo,
      categoria: item.categoriaStruttura,
    }));

    setStrutture(strutturePulite);
  } catch (error) {
    console.error("Errore durante la richiesta:", error);
    alert("Errore durante la ricerca. Verifica la provincia inserita.");
  } finally {
    setLoading(false);
  }
};

const clearStrutture = () => {
  setStrutture([]);
  };

return (
  <div style={{ padding: '1rem', fontFamily: 'Arial' }}>
    <h2>Servizi Strutture Marche</h2>

    <div>
      <button onClick={getAllStrutture} style={{ padding: '0.5rem 1rem', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px' }}>
        📋 Mostra tutte le strutture
      </button>

      <button 
            onClick={clearStrutture} 
            disabled={strutture.length === 0}
            style={{ marginLeft: '1rem' }}
          >
            🧹Pulisci risultati
      </button>
    </div>

    <div style={{ marginTop: '1rem' }}>
      <select
        value={provincia}
        onChange={(e) => setProvincia(e.target.value)}
        style={{ padding: '0.5rem', marginRight: '0.5rem' }}
      >
        <option value="">-- Seleziona una provincia --</option>
        <option value="Ancona">Ancona</option>
        <option value="Ascoli Piceno">Ascoli Piceno</option>
        <option value="Fermo">Fermo</option>
        <option value="Macerata">Macerata</option>
        <option value="Pesaro e Urbino">Pesaro e Urbino</option>
      </select>

      <button
        onClick={getStruttureByProvincia}
        style={{
          padding: '0.5rem 1rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '5px'
      }}
  >
    🔍 Cerca per provincia
      </button>
    </div>

    {loading && <p style={{ marginTop: '1rem' }}>Caricamento...</p>}

    <div style={{ marginTop: '2rem' }}>
      <h3>Risultati:</h3>
      {strutture.length === 0 ? (
        <p>Nessuna struttura trovata.</p>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {strutture.map((struttura, index) => (
            <li key={index} style={{ marginBottom: '1rem', border: '1px solid #ccc', padding: '1rem', borderRadius: '8px' }}>
              <strong>Nome:</strong> {struttura.nome || 'N/A'} <br />
              <strong>Provincia:</strong> {struttura.provincia || 'N/A'} <br />
              <strong>Comune:</strong> {struttura.comune || 'N/A'} <br />
              <strong>Indirizzo:</strong> {struttura.indirizzo || 'N/A'} <br />
              <strong>Categoria:</strong> {struttura.categoria || 'N/A'}
            </li>
          ))}
        </ul>
      )}
    </div>
  </div>
);
};

export default StruttureMarche;