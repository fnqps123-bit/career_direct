import React from "react";
import { COLORS } from "./value-tower-builder.jsx";

export default function CoverPage({ onStart }) {
  return (
    <div
      className="vtb-fade-in"
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: 2,
          color: COLORS.accent,
          marginBottom: 14,
        }}
      >
        VALUE PRIORITY STACK
      </div>
      <h1 style={{ fontSize: 32, fontWeight: 600, color: COLORS.textPrimary, maxWidth: 420, lineHeight: 1.3 }}>
        가치관 우선순위 확인하기
      </h1>
      <p style={{ fontSize: 14, color: COLORS.textSecondary, marginTop: 16, maxWidth: 360, lineHeight: 1.6 }}>
        업무환경 · 업무결과 · 인생관, 3개 영역의 가치관을 우선순위대로 정리해보세요.
      </p>
      <button
        onClick={onStart}
        className="vtb-num"
        style={{
          marginTop: 48,
          height: 52,
          padding: "0 56px",
          borderRadius: 999,
          border: "none",
          background: COLORS.accent,
          color: "#fff",
          fontSize: 16,
          fontWeight: 600,
          letterSpacing: 1.5,
          cursor: "pointer",
        }}
      >
        START
      </button>
    </div>
  );
}
