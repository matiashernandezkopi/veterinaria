import { useState } from "react";
import { loginRequest } from "../services/auth.ts";
import { useAuth } from "../context/AuthContext";
import type { LoginRequest } from "../types/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DLMode from "../components/DLMode.tsx";

function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [form, setForm] = useState<LoginRequest>({
    mail: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const data = await loginRequest(form);
      login(data);
      navigate("/", { replace: true });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Error de login");
      } else {
        setError("Error inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-neutral-950">
      <div className=" absolute top-10">
        <DLMode/>
      </div>
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-sm p-6 rounded-2xl
          bg-white dark:bg-neutral-900
          border border-gray-200 dark:border-neutral-700
          shadow-lg
        "
      >
        {/* LOGO (opcional, pero queda lindo) */}
        <div className="flex justify-center mb-4">
          <img
            src="/diagnovet-removebg.png"
            alt="Diagnovet"
            className="h-16 w-16"
          />
        </div>

        <h1 className="text-2xl font-bold mb-4 text-center text-gray-900 dark:text-neutral-100">
          Iniciar sesión
        </h1>

        {error && (
          <p className="mb-3 text-sm text-red-600 dark:text-red-400 text-center">
            {error}
          </p>
        )}

        <input
          type="email"
          name="mail"
          placeholder="Email"
          value={form.mail}
          onChange={handleChange}
          className="
            w-full mb-3 p-2 rounded-lg
            bg-white dark:bg-neutral-800
            text-gray-900 dark:text-neutral-100
            border border-gray-300 dark:border-neutral-700
            placeholder-gray-400 dark:placeholder-neutral-500
            focus:outline-none focus:ring-2 focus:ring-cyan-500
            transition
          "
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={form.password}
          onChange={handleChange}
          className="
            w-full mb-4 p-2 rounded-lg
            bg-white dark:bg-neutral-800
            text-gray-900 dark:text-neutral-100
            border border-gray-300 dark:border-neutral-700
            placeholder-gray-400 dark:placeholder-neutral-500
            focus:outline-none focus:ring-2 focus:ring-cyan-500
            transition
          "
          required
        />

        <button
          disabled={loading}
          className="
            w-full py-2 rounded-lg font-medium
            bg-cyan-500 hover:bg-cyan-600
            text-white
            disabled:opacity-50 disabled:cursor-not-allowed
            transition
          "
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

export default Login;
