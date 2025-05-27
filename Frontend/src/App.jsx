import { useState, useEffect, useCallback } from 'react'
import {debounce} from "lodash"
/*
🎯 Bonus: Caricare i Dettagli del Prodotto Selezionato
Quando l’utente clicca su un prodotto nella tendina, nascondi la tendina e carica i dettagli completi del prodotto sotto il campo di ricerca.

Effettua una richiesta API per ottenere i dettagli completi:
/products/{id}

Mostra i dettagli del prodotto selezionato (es. image, name, description, price).


Obiettivo: Aggiungere interattività permettendo di visualizzare le informazioni complete di un prodotto.
*/
function App() {

  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState(null)
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


  const fetchProduct = async (id) => {
    try{
      const response = await fetch (`http://localhost:3333/products/${id}`)
      if(!response.ok){
       throw new Error("Errore nel fetch del prodotto...")
      }
      const selectedProduct = await response.json()
      setProduct(selectedProduct)
      setProducts([])
      setQuery("")
    }catch(error){
      console.error(error);
    }
  }

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
                <p key={p.id} onClick={() => fetchProduct(p.id)}>{p.name}</p>
              ))
            }
          </div>
        )
      }

      {
        product &&(
          <div className='product-card'>
              <h2>{product.name}<span>{product.price}</span></h2>
              <img src={product.image} alt={product.name}/>
              <p>{product.description}</p>
          </div>
        )
      }

    </>
  )
}

export default App
