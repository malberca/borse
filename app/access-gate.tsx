"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useState } from "react";

const ACCESS_PASSWORD = "BORSE1234";
const ACCESS_STORAGE_KEY = "mano-client-access";

export function AccessGate({ children }: { children: ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const saved = window.localStorage.getItem(ACCESS_STORAGE_KEY);
    if (saved === "granted") {
      setIsUnlocked(true);
    }
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password.trim() === ACCESS_PASSWORD) {
      window.localStorage.setItem(ACCESS_STORAGE_KEY, "granted");
      setIsUnlocked(true);
      setError("");
      return;
    }

    setError("Password incorrecta.");
  }

  if (!isUnlocked) {
    return (
      <main className="loginScreen">
        <div className="loginScreenInner">
          <div className="loginMarquee" aria-hidden="true">
            <div className="loginMarqueeTrack">
              <span>Acceso privado de clientes · MA-NO Consultora · BORSE · Presentacion interna</span>
              <span>Acceso privado de clientes · MA-NO Consultora · BORSE · Presentacion interna</span>
            </div>
          </div>

          <section className="loginCard">
            <div className="loginBrandRow">
              <div className="loginBrandSymbol">
                <img src="/img/logo_hands.webp" alt="MA-NO" />
              </div>
              <div className="loginBrand">
                <img src="/img/mano-logo26-w.svg" alt="MA-NO Consultora" />
              </div>
            </div>
            <span className="loginEyebrow">Acceso de clientes · MA-NO Consultora</span>
            <span className="loginVersion">version 2.0</span>
            <h1>Ingreso privado</h1>
            <p>Ingresá la password para ver la presentación de Borse.</p>
            <form className="loginForm" onSubmit={handleSubmit}>
              <input
                className="loginInput"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
              <button className="loginButton" type="submit">Entrar</button>
            </form>
            {error ? <p className="loginError">{error}</p> : null}
          </section>

          <div className="loginMarquee" aria-hidden="true">
            <div className="loginMarqueeTrack">
              <span>Acceso privado de clientes · MA-NO Consultora · BORSE · Presentacion interna</span>
              <span>Acceso privado de clientes · MA-NO Consultora · BORSE · Presentacion interna</span>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return <>{children}</>;
}
