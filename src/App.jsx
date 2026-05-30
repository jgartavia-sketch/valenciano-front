import { useState } from "react";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import logo from "./assets/Branding/valenciano-logo.png";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Concentrado para Ganado",
    price: "₡18.500",
  },
  {
    id: 2,
    name: "Alimento para Perro",
    price: "₡12.900",
  },
  {
    id: 3,
    name: "Alimento para Gato",
    price: "₡10.500",
  },
  {
    id: 4,
    name: "Concentrado para Pollitas",
    price: "₡15.900",
  },
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const sendWhatsApp = () => {
    if (cart.length === 0) {
      alert("Agregue al menos un producto.");
      return;
    }

    const productList = cart.map((item) => `• ${item.name}`).join("%0A");

    const message =
      `Hola Distribuidora Valenciano.%0A%0A` +
      `Me interesa solicitar información sobre:%0A%0A` +
      `${productList}%0A%0A` +
      `Gracias.`;

    window.open(`https://wa.me/50689119504?text=${message}`, "_blank");
  };

  return (
    <main className="app">
      <Navbar cartCount={cart.length} />

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route
          path="/productos"
          element={<ProductsPage products={products} addToCart={addToCart} />}
        />

        <Route
          path="/carrito"
          element={<CartPage cart={cart} sendWhatsApp={sendWhatsApp} />}
        />

        <Route path="/contacto" element={<ContactPage />} />
      </Routes>
    </main>
  );
}

function Navbar({ cartCount }) {
  return (
    <nav className="navbar">
      <NavLink to="/" className="nav-brand" aria-label="Ir al inicio">
        <img src={logo} alt="Distribuidora Valenciano" className="nav-logo" />

        <span>
          <strong>Valenciano</strong>
          <small>Distribuidora de concentrados</small>
        </span>
      </NavLink>

      <div className="nav-links">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/productos">Productos</NavLink>
        <NavLink to="/contacto">Contacto</NavLink>
        <NavLink to="/carrito">Carrito ({cartCount})</NavLink>
      </div>
    </nav>
  );
}

function HomePage() {
  const navigate = useNavigate();

  return (
    <>
      <section className="hero">
        <div className="hero-overlay"></div>

        <div className="hero-content">
          <p className="hero-tag">
            DISTRIBUIDORA DE CONCENTRADOS VALENCIANO
          </p>

          <h1>
            Más que alimento,
            <br />
            un aliado en tu crecimiento.
          </h1>

          <p className="hero-description">
            Soluciones en nutrición animal, concentrados y alimentos para
            mascotas. Acompañamos a productores, familias y negocios con
            productos de calidad y atención personalizada.
          </p>

          <div className="hero-buttons">
            <button onClick={() => navigate("/productos")}>Ver productos</button>

            <button className="secondary" onClick={() => navigate("/contacto")}>
              Contactar
            </button>
          </div>
        </div>
      </section>

      <section className="about">
        <div className="about-card">
          <h2>Comprometidos con el crecimiento de nuestros clientes</h2>

          <p>
            En Distribuidora Valenciano trabajamos para ofrecer productos
            confiables para ganadería, aves y mascotas, brindando atención
            cercana y asesoría para ayudarle a obtener mejores resultados.
          </p>
        </div>
      </section>
    </>
  );
}

function ProductsPage({ products, addToCart }) {
  return (
    <section className="products-section page-section">
      <p className="section-tag">Catálogo</p>
      <h2>Nuestros Productos</h2>

      <p className="section-description">
        Seleccione los productos de interés y arme una solicitud rápida por
        WhatsApp. La idea: menos vueltas, más venta.
      </p>

      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image"></div>

            <h3>{product.name}</h3>

            <p>{product.price}</p>

            <button onClick={() => addToCart(product)}>
              Agregar al carrito
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

function CartPage({ cart, sendWhatsApp }) {
  return (
    <section className="cart-page page-section">
      <p className="section-tag">Pedido</p>
      <h2>Carrito de solicitud</h2>

      <div className="cart-box">
        <div>
          <h3>Productos seleccionados: {cart.length}</h3>

          {cart.length === 0 ? (
            <p>No hay productos agregados todavía.</p>
          ) : (
            <ul className="cart-list">
              {cart.map((item, index) => (
                <li key={`${item.id}-${index}`}>
                  {item.name} <span>{item.price}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <button onClick={sendWhatsApp}>Enviar pedido por WhatsApp</button>
      </div>
    </section>
  );
}

function ContactPage() {
  return (
    <section className="contact-page page-section">
      <p className="section-tag">Contacto</p>
      <h2>Hablemos de su próximo pedido</h2>

      <div className="contact-card">
        <p>
          Consulte disponibilidad, precios y opciones para finca, negocio o
          mascotas.
        </p>

        <a href="https://wa.me/50689119504" target="_blank" rel="noreferrer">
          Escribir por WhatsApp
        </a>
      </div>
    </section>
  );
}

export default App;