import { useState, useEffect, useCallback } from 'react'
import {debounce} from "lodash"
/*
📌 Milestone 2: Implementare il Debounce per Ottimizzare la Ricerca
Attualmente, ogni pressione di tasto esegue una richiesta API. Questo è inefficiente!
Implementa una funzione di debounce per ritardare la chiamata API fino a quando l’utente smette di digitare per un breve periodo (es. 300ms)
Dopo l’implementazione, verifica che la ricerca non venga eseguita immediatamente a ogni tasto premuto, ma solo dopo una breve pausa.

Obiettivo: Ridurre il numero di richieste API e migliorare le prestazioni.
*/
function App() {

  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  console.log(products)

  



  const fetchProducts = async (query) => {
    if (query.trim() === "") {
      setProducts([]);
      return;
    }
    try {
      const response = await fetch(`http://localhost:3333/products?search=${query}`)
      const prodotti = await response.json()
      setProducts(prodotti);
      console.log(query);
    } catch (error) {
      console.error(error)
    }
  }

  const debouncedProducts = useCallback(
    debounce( fetchProducts, 500)
    ,[])



  useEffect(() => {
    debouncedProducts(query)
  }, [query])


  return (
    <>
      <input
        className='input'
        type='text'
        placeholder='digita il nome del prodotto'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {
        products.length > 0 && (
          <div className='container-products'>
            {
              products.map((p) => (
                <p key={p.id}>{p.name}</p>
              ))
            }
          </div>
        )
      }

    </>
  )
}

export default App
