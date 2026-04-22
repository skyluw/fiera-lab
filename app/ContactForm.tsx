"use client";

import { useState } from "react";

interface Servicio {
  _id: string;
  titulo: string;
}

export default function ContactForm({ servicios }: { servicios: Servicio[] }) {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  };

  return (
    <form className="cta-form reveal" onSubmit={handleSubmit}>
      <div className="form-row">
        <div className="form-group">
          <label>Nombre</label>
          <input type="text" placeholder="Tu nombre" />
        </div>
        <div className="form-group">
          <label>Empresa</label>
          <input type="text" placeholder="Tu empresa" />
        </div>
      </div>
      <div className="form-group">
        <label>Correo electrónico</label>
        <input type="email" placeholder="hola@empresa.com" />
      </div>
      <div className="form-group">
        <label>Tipo de proyecto</label>
        <select>
          <option value="">Selecciona un servicio</option>
          {servicios?.map((s) => (
            <option key={s._id} value={s._id}>{s.titulo}</option>
          ))}
          <option>Otro</option>
        </select>
      </div>
      <div className="form-group">
        <label>Cuéntanos tu idea</label>
        <textarea placeholder="¿Qué tienes en mente? Sin filtros." />
      </div>
      <button
        type="submit"
        className="btn-enviar"
        style={enviado ? { background: "#5b21b6" } : {}}
      >
        {enviado ? "✓ MENSAJE ENVIADO" : "ENVIAR MENSAJE →"}
      </button>
    </form>
  );
}