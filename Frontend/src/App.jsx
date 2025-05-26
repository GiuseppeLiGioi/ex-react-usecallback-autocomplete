import { useState, useEffect } from 'react'
/*
📌 Milestone 1: Creare un campo di ricerca e mostrare la lista dei suggerimenti
Crea un campo di input (<input type="text">) in cui l’utente può digitare.

Effettua una chiamata API a: 
/products?search=[query]

La query deve essere sostituita con il testo digitato.
Mostra i risultati API sotto l'input in una tendina di suggerimenti.

Se l'utente cancella il testo, la tendina scompare.


Obiettivo: Mostrare suggerimenti dinamici in base alla ricerca dell'utente.
*/
function App() {

  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  console.log(products)

  useEffect(() => {
   if(query.trim() === ""){
    setProducts([]);
    return;
   }
    //non posso utilizzare l'async all'interno dello useEffect così utilizzo una IIFE
    (async () => {
      try{
        const response = await fetch (`http://localhost:3333/products?search=${query}`)
        const prodotti = await response.json()
        setProducts(prodotti);
      }catch(error){
        console.error(error)
      }

    })()
   
  }, [query])

  return (
    <>
    <input 
    type='text'
    placeholder='digita il nome del prodotto'
    value={query}
    onChange={(e) => setQuery(e.target.value)}
    />

    {
      products.length > 0 &&(
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
