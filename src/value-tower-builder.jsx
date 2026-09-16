import React, { useMemo, useRef, useState } from "react";
import html2canvas from "html2canvas";
import {
  Scale,
  Clock,
  Shuffle,
  Plane,
  Compass,
  Target,
  Mountain,
  TreePine,
  Leaf,
  Equal,
  ListChecks,
  Anchor,
  DollarSign,
  Award,
  Brain,
  HeartHandshake,
  TrendingUp,
  GraduationCap,
  ShieldCheck,
  Crown,
  Wallet,
  Trophy,
  Home,
  Users,
  Palmtree,
  Palette,
  Star,
  GripVertical,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  X,
  Copy,
  Check,
  RotateCcw,
  Share2,
  FileText,
} from "lucide-react";

export const COLORS = {
  bg: "#FFFFFF",
  panel: "#FFFFFF",
  panelBorder: "rgba(15,23,42,0.10)",
  row: "#F6F8FB",
  rowHover: "#E9F2FF",
  border: "rgba(15,23,42,0.09)",
  borderStrong: "rgba(15,23,42,0.20)",
  textPrimary: "#15181F",
  textSecondary: "#5B6270",
  textMuted: "#98A0AC",
  accent: "#2D8CFF",
};

const PALETTE = [
  "#F5A623",
  "#4FA3F7",
  "#F76E9C",
  "#FF8A4C",
  "#34D399",
  "#2DD4BF",
  "#818CF8",
  "#C084FC",
  "#FACC15",
  "#F472B6",
  "#A3E635",
  "#94A3B8",
];

function withAccents(prefix, items) {
  return items.map(([name, icon, desc], i) => ({
    id: `${prefix}-${i + 1}`,
    name,
    icon,
    desc,
    accent: PALETTE[i % PALETTE.length],
  }));
}

const WORK_ENV_VALUES = withAccents("work-env", [
  ["조화", Scale, "동료들과 갈등 없이 협력하며, 조화로운 관계 속에서 일하는 것을 중요하게 여겨요."],
  ["시간의 자유", Clock, "업무 시간과 일정을 스스로 조절할 수 있는 자율성을 중요하게 여겨요."],
  ["다양성", Shuffle, "매일 다른 업무나 다양한 사람·환경을 접하며, 반복되지 않는 일을 선호해요."],
  ["여행", Plane, "업무를 통해 여러 지역이나 국가를 다니며 이동하는 기회를 중요하게 여겨요."],
  ["독립", Compass, "타인의 지시나 감독 없이 스스로 판단하고 자율적으로 일하는 것을 선호해요."],
  ["도전", Target, "어렵고 힘든 목표에 도전하며 성취감을 느끼는 것을 중요하게 여겨요."],
  ["모험 / 위험", Mountain, "예측이 어렵고 위험이 따르는 상황 속에서 짜릿함과 흥미를 느껴요."],
  ["야외", TreePine, "사무실이 아닌 야외나 현장에서 활동적으로 일하는 것을 선호해요."],
  ["청정환경", Leaf, "깨끗하고 쾌적한 환경, 또는 환경 보호와 관련된 가치를 중요하게 여겨요."],
  ["평등", Equal, "성별, 배경 등에 관계없이 모두가 공정하고 동등하게 대우받는 것을 중요하게 여겨요."],
  ["체계적", ListChecks, "명확한 규칙과 절차, 예측 가능한 방식으로 일이 진행되는 것을 선호해요."],
  ["안정", Anchor, "변화가 적고 예측 가능하며 꾸준히 지속되는 안정적인 상태를 중요하게 여겨요."],
]);

const HELP_OTHERS_DESC = "다른 사람에게 실질적인 도움을 주고 기여하는 것에서 보람을 느껴요.";

const WORK_OUTCOME_VALUES = withAccents("work-outcome", [
  ["고소득", DollarSign, "높은 수준의 보수와 경제적 보상을 얻는 것을 중요하게 여겨요."],
  ["인정", Award, "자신의 노력과 성과를 타인에게 인정받고 존중받는 것을 중요하게 여겨요."],
  ["지적자극", Brain, "새로운 지식을 배우고 깊이 사고하며 지적으로 자극받는 것을 선호해요."],
  ["타인을 돕기", HeartHandshake, HELP_OTHERS_DESC],
  ["경력개발", TrendingUp, "승진이나 역량 향상 등 커리어가 지속적으로 발전하는 것을 중요하게 여겨요."],
  ["평생교육", GraduationCap, "평생에 걸쳐 새로운 것을 배우고 스스로를 계발하는 것을 중요하게 여겨요."],
  ["보장", ShieldCheck, "고용 안정성과 지속적으로 일할 수 있다는 확신을 중요하게 여겨요."],
  ["리더십", Crown, "다른 사람을 이끌고 방향을 제시하며 영향력을 행사하는 것을 선호해요."],
]);

const LIFE_VIEW_VALUES = withAccents("life-view", [
  ["재정", Wallet, "경제적으로 안정되고 풍요로운 삶을 사는 것을 중요하게 여겨요."],
  ["성취", Trophy, "목표를 세우고 이를 이뤄내며 느끼는 성취감을 중요하게 여겨요."],
  ["가족", Home, "가족과의 관계와 시간을 삶에서 가장 중요한 가치로 여겨요."],
  ["친구", Users, "친구와의 우정과 관계를 삶에서 중요한 가치로 여겨요."],
  ["타인을 돕기", HeartHandshake, HELP_OTHERS_DESC],
  ["레저", Palmtree, "여가와 취미 활동을 통해 삶의 여유와 즐거움을 누리는 것을 중요하게 여겨요."],
  ["정직", ShieldCheck, "진실하고 솔직하게 행동하며 신뢰를 지키는 것을 중요하게 여겨요."],
  ["심미", Palette, "아름다움을 추구하고 예술적·미적 경험을 즐기는 것을 중요하게 여겨요."],
  ["신앙", Star, "종교적 믿음이나 영적인 가치를 삶의 중심에 두는 것을 중요하게 여겨요."],
]);

const CATEGORIES = [
  { id: "work-env", title: "업무환경", values: WORK_ENV_VALUES },
  { id: "work-outcome", title: "업무결과", values: WORK_OUTCOME_VALUES },
  { id: "life-view", title: "인생관", values: LIFE_VIEW_VALUES },
];

const TOP_N = 4;

function pad(n) {
  return String(n).padStart(2, "0");
}

export default function ValueTowerBuilder() {
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [allSlots, setAllSlots] = useState(() => CATEGORIES.map((c) => Array(c.values.length).fill(null)));
  const [draggedItem, setDraggedItem] = useState(null);
  const [insertIndex, setInsertIndex] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [infoValue, setInfoValue] = useState(null);
  const resultRef = useRef(null);

  const category = CATEGORIES[categoryIndex];
  const VALUES = category.values;
  const TOTAL = VALUES.length;
  const VALUE_BY_ID = useMemo(() => Object.fromEntries(VALUES.map((v) => [v.id, v])), [VALUES]);
  const slots = allSlots[categoryIndex];
  const isLastCategory = categoryIndex === CATEGORIES.length - 1;

  const placedIds = useMemo(() => new Set(slots.filter(Boolean)), [slots]);
  const filledCount = placedIds.size;
  const isComplete = filledCount === TOTAL;
  const allCategoriesComplete = allSlots.every(
    (s, i) => new Set(s.filter(Boolean)).size === CATEGORIES[i].values.length
  );

  function updateSlots(updater) {
    setAllSlots((prev) =>
      prev.map((s, i) => (i === categoryIndex ? (typeof updater === "function" ? updater(s) : updater) : s))
    );
  }

  function placeBlock(id) {
    if (placedIds.has(id)) return;
    updateSlots((prev) => {
      const idx = prev.findIndex((s) => s === null);
      if (idx === -1) return prev;
      const next = [...prev];
      next[idx] = id;
      return next;
    });
  }

  function removeBlock(index) {
    updateSlots((prev) => {
      const next = [...prev];
      next[index] = null;
      return next;
    });
  }

  function swap(i, j) {
    if (i < 0 || j < 0 || i >= TOTAL || j >= TOTAL) return;
    updateSlots((prev) => {
      const next = [...prev];
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  }

  function reorderTower(sourceIndex, insertAt) {
    if (sourceIndex === insertAt || sourceIndex === insertAt - 1) return;
    updateSlots((prev) => {
      const next = [...prev];
      const [item] = next.splice(sourceIndex, 1);
      const target = sourceIndex < insertAt ? insertAt - 1 : insertAt;
      next.splice(target, 0, item);
      return next;
    });
  }

  function insertFromInventory(id, insertAt) {
    if (placedIds.has(id)) return;
    updateSlots((prev) => {
      const next = [...prev];
      next.splice(insertAt, 0, id);
      for (let i = next.length - 1; i >= 0; i--) {
        if (next[i] === null) {
          next.splice(i, 1);
          break;
        }
      }
      return next;
    });
  }

  function getInsertIndex(e, index) {
    const rect = e.currentTarget.getBoundingClientRect();
    const midpoint = rect.top + rect.height / 2;
    return e.clientY < midpoint ? index : index + 1;
  }

  function handleRowDragOver(e, index) {
    e.preventDefault();
    setInsertIndex(getInsertIndex(e, index));
  }

  function handleRowDrop(e, index) {
    e.preventDefault();
    const raw = e.dataTransfer.getData("text/plain");
    const at = getInsertIndex(e, index);
    setInsertIndex(null);
    setDraggedItem(null);
    if (!raw) return;
    let data;
    try {
      data = JSON.parse(raw);
    } catch {
      return;
    }
    if (data.type === "inventory") {
      insertFromInventory(data.id, at);
    } else if (data.type === "tower") {
      reorderTower(data.index, at);
    }
  }

  function handleInventoryDragStart(e, id) {
    if (placedIds.has(id)) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData("text/plain", JSON.stringify({ type: "inventory", id }));
    e.dataTransfer.effectAllowed = "move";
    setDraggedItem({ type: "inventory", id });
  }

  function handleTowerDragStart(e, index) {
    e.dataTransfer.setData("text/plain", JSON.stringify({ type: "tower", index }));
    e.dataTransfer.effectAllowed = "move";
    setDraggedItem({ type: "tower", index });
  }

  function handleDragEnd() {
    setDraggedItem(null);
    setInsertIndex(null);
  }

  function goPrevCategory() {
    if (categoryIndex > 0) setCategoryIndex(categoryIndex - 1);
  }

  function handleCtaClick() {
    if (!isComplete) return;
    if (!isLastCategory) {
      setCategoryIndex(categoryIndex + 1);
      return;
    }
    if (allCategoriesComplete) setShowModal(true);
  }

  let ctaLabel;
  let ctaDisabled;
  if (!isComplete) {
    ctaLabel = `${TOTAL - filledCount}개 항목 남음`;
    ctaDisabled = true;
  } else if (!isLastCategory) {
    ctaLabel = "다음 카테고리로 이동";
    ctaDisabled = false;
  } else if (!allCategoriesComplete) {
    ctaLabel = "다른 카테고리를 먼저 완료해주세요";
    ctaDisabled = true;
  } else {
    ctaLabel = "우선순위 확정하기";
    ctaDisabled = false;
  }

  async function handleCopy() {
    const lines = [];
    CATEGORIES.forEach((c, ci) => {
      lines.push(`[${c.title}]`);
      allSlots[ci].forEach((id, i) => {
        const v = c.values.find((x) => x.id === id);
        lines.push(`${i + 1}. ${v?.name ?? ""}`);
      });
      if (ci < CATEGORIES.length - 1) lines.push("");
    });
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  }

  async function handleShareImage() {
    if (!resultRef.current) return;
    setSharing(true);
    try {
      const canvas = await html2canvas(resultRef.current, { backgroundColor: "#ffffff", scale: 2 });
      const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"));
      if (!blob) return;
      const file = new File([blob], "value-priority-result.png", { type: "image/png" });
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ files: [file], title: "가치관 우선순위 결과" });
      } else {
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "value-priority-result.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }
    } catch (err) {
      if (err?.name !== "AbortError") console.error(err);
    } finally {
      setSharing(false);
    }
  }

  function handleReset() {
    setAllSlots(CATEGORIES.map((c) => Array(c.values.length).fill(null)));
    setCategoryIndex(0);
    setShowModal(false);
    setCopied(false);
  }

  return (
    <div style={{ background: COLORS.bg, minHeight: "100vh" }}>
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex items-end justify-between mb-3">
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 500, color: COLORS.textPrimary }}>
              가치관 우선순위 스택
            </h1>
            <p style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 6 }}>
              {category.title} — 항목을 클릭하거나 끌어서 배치하세요. 01번이 가장 높은 우선순위입니다.
            </p>
          </div>
          <div className="vtb-num" style={{ fontSize: 14, color: COLORS.textSecondary }}>
            <span style={{ color: COLORS.textPrimary, fontWeight: 600 }}>{pad(filledCount)}</span> / {pad(TOTAL)}
          </div>
        </div>
        <div className="h-1 rounded-full overflow-hidden" style={{ background: COLORS.border }}>
          <div
            className="h-full rounded-full"
            style={{
              width: `${(filledCount / TOTAL) * 100}%`,
              background: COLORS.accent,
              transition: "width 200ms ease",
            }}
          />
        </div>

        <div className="flex items-center gap-2 mt-6">
          {CATEGORIES.map((c, i) => {
            const done = new Set(allSlots[i].filter(Boolean)).size === c.values.length;
            const active = i === categoryIndex;
            return (
              <button
                key={c.id}
                onClick={() => setCategoryIndex(i)}
                className="flex-1 rounded-lg flex items-center justify-center gap-1.5"
                style={{
                  height: 40,
                  border: `1px solid ${active ? COLORS.accent : COLORS.border}`,
                  background: active ? COLORS.rowHover : "#fff",
                }}
              >
                <span
                  className="vtb-num"
                  style={{ fontSize: 11, fontWeight: 600, color: active ? COLORS.accent : COLORS.textMuted }}
                >
                  {i + 1}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: active ? COLORS.textPrimary : COLORS.textSecondary,
                  }}
                >
                  {c.title}
                </span>
                {done && <Check size={12} style={{ color: COLORS.accent }} />}
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-8">
          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.textMuted, marginBottom: 10 }}>
              가치 목록
            </div>
            <div className="grid grid-cols-4 gap-3">
              {VALUES.map((v) => {
                const placed = placedIds.has(v.id);
                const isDragging = draggedItem?.type === "inventory" && draggedItem.id === v.id;
                const Icon = v.icon;
                return (
                  <div
                    key={v.id}
                    draggable={!placed}
                    onDragStart={(e) => handleInventoryDragStart(e, v.id)}
                    onDragEnd={handleDragEnd}
                    onClick={() => !placed && placeBlock(v.id)}
                    className="relative aspect-square rounded-xl p-2 flex flex-col items-center justify-center gap-2 select-none"
                    style={{
                      border: `1px solid ${COLORS.border}`,
                      cursor: placed ? "default" : "pointer",
                      opacity: placed ? 0.32 : isDragging ? 0.35 : 1,
                      pointerEvents: placed ? "none" : "auto",
                    }}
                  >
                    {v.desc && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setInfoValue(v);
                        }}
                        className="absolute flex items-center justify-center rounded-md"
                        style={{
                          top: 4,
                          right: 4,
                          width: 20,
                          height: 20,
                          background: COLORS.row,
                          border: `1px solid ${COLORS.border}`,
                          color: COLORS.textSecondary,
                          pointerEvents: "auto",
                        }}
                        aria-label={`${v.name} 자세히 알아보기`}
                      >
                        <FileText size={11} />
                      </button>
                    )}
                    <div
                      className="w-[30px] h-[30px] rounded-lg flex items-center justify-center"
                      style={{ background: v.accent + "22", color: v.accent }}
                    >
                      <Icon size={16} />
                    </div>
                    <div
                      className="vtb-clamp-2"
                      style={{ fontSize: 11, color: COLORS.textPrimary, lineHeight: 1.3, textAlign: "center" }}
                    >
                      {v.name}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.textMuted, marginBottom: 10 }}>
              우선순위 스택
            </div>
            <div className="flex flex-col gap-1">
              {slots.map((id, i) => {
                const value = id ? VALUE_BY_ID[id] : null;
                const Icon = value?.icon;
                const isTop3 = i < TOP_N;
                const isDraggingThis = draggedItem?.type === "tower" && draggedItem.index === i;
                return (
                  <React.Fragment key={i}>
                    <div
                      className="vtb-insert-line rounded-full"
                      style={{
                        height: 2,
                        margin: "1px 0",
                        background: insertIndex === i ? COLORS.accent : "transparent",
                      }}
                    />
                    <div
                      draggable={!!value}
                      onDragStart={(e) => value && handleTowerDragStart(e, i)}
                      onDragEnd={handleDragEnd}
                      onDragOver={(e) => handleRowDragOver(e, i)}
                      onDrop={(e) => handleRowDrop(e, i)}
                      className={`flex items-center gap-2 rounded-lg px-3 ${value ? "vtb-fade-in" : ""}`}
                      style={{
                        height: 46,
                        border: value ? `1px solid ${COLORS.border}` : `1px dashed ${COLORS.borderStrong}`,
                        background: value ? COLORS.row : "transparent",
                        opacity: isDraggingThis ? 0.35 : 1,
                      }}
                    >
                      <div
                        className="vtb-num"
                        style={{
                          width: 20,
                          textAlign: "right",
                          fontSize: 13,
                          fontWeight: 600,
                          color: isTop3 ? COLORS.accent : COLORS.textMuted,
                        }}
                      >
                        {pad(i + 1)}
                      </div>
                      {value ? (
                        <>
                          <GripVertical size={14} style={{ color: COLORS.textMuted, cursor: "grab" }} />
                          <div
                            className="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0"
                            style={{ background: value.accent + "22", color: value.accent }}
                          >
                            <Icon size={13} />
                          </div>
                          <div className="flex-1 text-sm truncate" style={{ color: COLORS.textPrimary }}>
                            {value.name}
                          </div>
                          {value.desc && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setInfoValue(value);
                              }}
                              className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0"
                              style={{ color: COLORS.textSecondary }}
                              aria-label={`${value.name} 자세히 알아보기`}
                            >
                              <FileText size={13} />
                            </button>
                          )}
                          <div className="flex items-center gap-0.5">
                            <button
                              onClick={() => swap(i, i - 1)}
                              disabled={i === 0}
                              className="w-6 h-6 rounded flex items-center justify-center"
                              style={{ color: i === 0 ? COLORS.textMuted : COLORS.textSecondary, opacity: i === 0 ? 0.4 : 1 }}
                            >
                              <ChevronUp size={14} />
                            </button>
                            <button
                              onClick={() => swap(i, i + 1)}
                              disabled={i === TOTAL - 1}
                              className="w-6 h-6 rounded flex items-center justify-center"
                              style={{
                                color: i === TOTAL - 1 ? COLORS.textMuted : COLORS.textSecondary,
                                opacity: i === TOTAL - 1 ? 0.4 : 1,
                              }}
                            >
                              <ChevronDown size={14} />
                            </button>
                            <button
                              onClick={() => removeBlock(i)}
                              className="w-6 h-6 rounded flex items-center justify-center"
                              style={{ color: COLORS.textSecondary }}
                            >
                              <X size={14} />
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="flex-1 text-sm" style={{ color: COLORS.textMuted }}>
                          미배치
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
              <div
                className="vtb-insert-line rounded-full"
                style={{
                  height: 2,
                  margin: "1px 0",
                  background: insertIndex === TOTAL ? COLORS.accent : "transparent",
                }}
              />
            </div>

            <div className="flex gap-2 mt-5">
              <button
                onClick={goPrevCategory}
                disabled={categoryIndex === 0}
                className="rounded-lg flex items-center justify-center gap-1 px-4"
                style={{
                  height: 44,
                  border: `1px solid ${COLORS.border}`,
                  color: categoryIndex === 0 ? COLORS.textMuted : COLORS.textPrimary,
                  opacity: categoryIndex === 0 ? 0.5 : 1,
                  fontSize: 14,
                  background: "#fff",
                }}
              >
                <ChevronLeft size={14} /> 이전
              </button>
              <button
                onClick={handleCtaClick}
                disabled={ctaDisabled}
                className="flex-1 rounded-lg"
                style={{
                  height: 44,
                  background: ctaDisabled ? COLORS.row : COLORS.accent,
                  color: ctaDisabled ? COLORS.textMuted : "#fff",
                  fontSize: 14,
                  fontWeight: 500,
                  cursor: ctaDisabled ? "not-allowed" : "pointer",
                  border: ctaDisabled ? `1px solid ${COLORS.border}` : "none",
                }}
              >
                {ctaLabel}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div
          className="fixed inset-0 flex items-center justify-center z-50 px-4 py-8"
          style={{ background: "rgba(15,23,42,0.45)" }}
          onClick={() => setShowModal(false)}
        >
          <div
            className="vtb-modal-in rounded-2xl p-8 w-full max-w-lg max-h-full overflow-y-auto"
            style={{
              background: "#FFFFFF",
              border: `1px solid ${COLORS.borderStrong}`,
              boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: 20, fontWeight: 600, color: COLORS.textPrimary }}>우선순위 확정 완료</h2>
            <p style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 4, marginBottom: 22 }}>
              {CATEGORIES.length}개 카테고리의 가치관 순위가 정리되었습니다
            </p>

            <div ref={resultRef} className="rounded-2xl p-5" style={{ background: "#fff", border: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.textPrimary, marginBottom: 2 }}>
                가치관 우선순위 결과
              </div>
              <div style={{ fontSize: 11, color: COLORS.textSecondary, marginBottom: 16 }}>
                {CATEGORIES.map((c) => c.title).join(" · ")}
              </div>
              {CATEGORIES.map((c, ci) => (
                <div key={c.id} style={{ marginBottom: ci < CATEGORIES.length - 1 ? 18 : 0 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: COLORS.accent, marginBottom: 8 }}>
                    {c.title}
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {allSlots[ci].slice(0, TOP_N).map((id, i) => {
                      const v = c.values.find((x) => x.id === id);
                      const Icon = v.icon;
                      return (
                        <div
                          key={id}
                          className="rounded-lg p-2 flex flex-col items-center gap-1 text-center"
                          style={{ border: `1px solid ${COLORS.border}`, background: COLORS.row }}
                        >
                          <div className="vtb-num" style={{ fontSize: 14, fontWeight: 600, color: COLORS.accent }}>
                            {pad(i + 1)}
                          </div>
                          <div
                            className="w-6 h-6 rounded-md flex items-center justify-center"
                            style={{ background: v.accent + "22", color: v.accent }}
                          >
                            <Icon size={12} />
                          </div>
                          <div style={{ fontSize: 10, color: COLORS.textPrimary }}>{v.name}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="max-h-64 overflow-y-auto flex flex-col gap-3 my-6">
              {CATEGORIES.map((c, ci) => (
                <div key={c.id}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: COLORS.textMuted, margin: "4px 8px" }}>
                    {c.title}
                  </div>
                  {allSlots[ci].map((id, i) => {
                    const v = c.values.find((x) => x.id === id);
                    const Icon = v.icon;
                    const top4 = i < TOP_N;
                    return (
                      <div
                        key={id}
                        className="flex items-center gap-2 px-2 rounded-lg"
                        style={{ height: 34, background: top4 ? COLORS.rowHover : "transparent" }}
                      >
                        <div
                          className="vtb-num"
                          style={{
                            width: 20,
                            textAlign: "right",
                            fontSize: 12,
                            fontWeight: 600,
                            color: top4 ? COLORS.accent : COLORS.textMuted,
                          }}
                        >
                          {pad(i + 1)}
                        </div>
                        <div
                          className="w-6 h-6 rounded-md flex items-center justify-center"
                          style={{ background: v.accent + "22", color: v.accent }}
                        >
                          <Icon size={12} />
                        </div>
                        <div style={{ fontSize: 13, color: COLORS.textPrimary }}>{v.name}</div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              <button
                onClick={handleShareImage}
                disabled={sharing}
                className="w-full rounded-lg flex items-center justify-center gap-2"
                style={{ height: 42, background: COLORS.accent, color: "#fff", fontSize: 14, fontWeight: 500, opacity: sharing ? 0.7 : 1 }}
              >
                <Share2 size={14} /> {sharing ? "이미지 생성 중..." : "이미지로 저장 · 공유하기"}
              </button>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  className="flex-1 rounded-lg flex items-center justify-center gap-2"
                  style={{ height: 42, border: `1px solid ${COLORS.border}`, color: COLORS.textPrimary, fontSize: 14, fontWeight: 500, background: "#fff" }}
                >
                  {copied ? (
                    <>
                      <Check size={14} /> 복사됨
                    </>
                  ) : (
                    <>
                      <Copy size={14} /> 결과 복사하기
                    </>
                  )}
                </button>
                <button
                  onClick={handleReset}
                  className="flex-1 rounded-lg flex items-center justify-center gap-2"
                  style={{
                    height: 42,
                    border: `1px solid ${COLORS.border}`,
                    color: COLORS.textPrimary,
                    fontSize: 14,
                    fontWeight: 500,
                    background: "#fff",
                  }}
                >
                  <RotateCcw size={14} /> 다시 만들기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {infoValue && (
        <div
          className="fixed inset-0 flex items-center justify-center z-[60] px-4"
          style={{ background: "rgba(15,23,42,0.45)" }}
          onClick={() => setInfoValue(null)}
        >
          <div
            className="vtb-modal-in rounded-2xl p-6 w-full max-w-sm"
            style={{
              background: "#FFFFFF",
              border: `1px solid ${COLORS.borderStrong}`,
              boxShadow: "0 24px 60px rgba(0,0,0,0.5)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: infoValue.accent + "22", color: infoValue.accent }}
                >
                  <infoValue.icon size={16} />
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: COLORS.textPrimary }}>{infoValue.name}</div>
              </div>
              <button
                onClick={() => setInfoValue(null)}
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ color: COLORS.textMuted }}
                aria-label="닫기"
              >
                <X size={15} />
              </button>
            </div>
            <p style={{ fontSize: 13, color: COLORS.textSecondary, marginTop: 12, lineHeight: 1.6 }}>
              {infoValue.desc}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
