import React, { useState } from "react";
import { X, UserPlus } from "lucide-react";
import { useTemplates, useOnboardAthlete } from "../hooks/useCoachData";
import { useNavigate } from "react-router-dom";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AthleteOnboardingModal: React.FC<Props> = ({
  isOpen,
  onClose,
}) => {
  const navigate = useNavigate();
  const { data: templates } = useTemplates();
  const { mutateAsync: onboard, isPending: loading } = useOnboardAthlete();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "password123", // Default for demo/onboarding
    level: "INTERMEDIATE",
    templateId: "",
    startDate: new Date().toISOString().split("T")[0],
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const athlete = (await onboard(form)) as any;
      alert("Atleta creado y programa asignado con éxito 🚀");
      onClose();
      // Redirigir al detalle del atleta (perfil del usuario)
      navigate(`/coach/athletes/${athlete.id}`);
    } catch (err: any) {
      alert("Error: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(15, 23, 42, 0.8)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 100,
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "32px",
          width: "100%",
          maxWidth: "540px",
          padding: "40px",
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "32px",
          }}
        >
          <div>
            <h2
              style={{
                fontSize: "24px",
                fontWeight: "900",
                color: "#0f172a",
                margin: 0,
              }}
            >
              Onboarding de Atleta
            </h2>
            <p
              style={{
                color: "#64748b",
                fontSize: "14px",
                marginTop: "4px",
                fontWeight: "bold",
              }}
            >
              Crea el perfil y arranca su planificación en un paso.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "#f1f5f9",
              border: "none",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
          >
            <X size={20} color="#64748b" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "24px" }}
        >
          {/* Personal Info */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "16px",
              }}
            >
              <div className="input-group">
                <label
                  style={{
                    fontSize: "11px",
                    fontWeight: "900",
                    color: "#64748b",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Nombre Completo
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ej. Juan Pérez"
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    background: "#f8fafc",
                    outline: "none",
                  }}
                />
              </div>
              <div className="input-group">
                <label
                  style={{
                    fontSize: "11px",
                    fontWeight: "900",
                    color: "#64748b",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Nivel Experience
                </label>
                <select
                  value={form.level}
                  onChange={(e) =>
                    setForm({ ...form, level: e.target.value as any })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    background: "#f8fafc",
                    outline: "none",
                  }}
                >
                  <option value="BEGINNER">Principiante</option>
                  <option value="INTERMEDIATE">Intermedio</option>
                  <option value="ADVANCED">Avanzado</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label
                style={{
                  fontSize: "11px",
                  fontWeight: "900",
                  color: "#64748b",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
                Email de acceso
              </label>
              <input
                required
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="juan@atleta.com"
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  background: "#f8fafc",
                  outline: "none",
                }}
              />
            </div>
          </div>

          <div style={{ height: "1px", background: "#f1f5f9" }} />

          {/* Program Assignment */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "16px" }}
          >
            <div className="input-group">
              <label
                style={{
                  fontSize: "11px",
                  fontWeight: "900",
                  color: "#64748b",
                  textTransform: "uppercase",
                  marginBottom: "8px",
                  display: "block",
                }}
              >
                Seleccionar Plantilla (Opcional)
              </label>
              <select
                value={form.templateId}
                onChange={(e) =>
                  setForm({ ...form, templateId: e.target.value })
                }
                style={{
                  width: "100%",
                  padding: "12px 16px",
                  borderRadius: "12px",
                  border: "1px solid #e2e8f0",
                  background: "#f8fafc",
                  outline: "none",
                }}
              >
                <option value="">Sin programa inicial</option>
                {templates?.map((t: any) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.durationWeeks} sem)
                  </option>
                ))}
              </select>
            </div>

            {form.templateId && (
              <div className="input-group">
                <label
                  style={{
                    fontSize: "11px",
                    fontWeight: "900",
                    color: "#64748b",
                    textTransform: "uppercase",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  Fecha de Inicio
                </label>
                <input
                  type="date"
                  value={form.startDate}
                  onChange={(e) =>
                    setForm({ ...form, startDate: e.target.value })
                  }
                  style={{
                    width: "100%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    background: "#f8fafc",
                    outline: "none",
                  }}
                />
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "16px",
              padding: "16px",
              borderRadius: "16px",
              background: "#0f172a",
              color: "white",
              border: "none",
              fontWeight: "900",
              fontSize: "14px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? (
              "CONFIGURANDO ATLETA..."
            ) : (
              <>
                <UserPlus size={18} />
                CREAR Y DESPLEGAR PROGRAMA
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
