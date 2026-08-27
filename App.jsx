import { useState } from "react";

const patients = [
  { id: 1, name: "ผู้ป่วย 001", ward: "Medชาย2 (14/4)", age: 72, startDate: "01/06/68", day: 5, dose: "1g q12h", lastLevel: 18.5, levelStatus: "target", cr: 1.12, egfr: 62, crTrend: "stable", nextDraw: "วันนี้ 05:30", drawStatus: "pending", akiAlert: false, flag: "normal" },
  { id: 2, name: "ผู้ป่วย 002", ward: "MICU2 (14/2)", age: 68, startDate: "29/05/68", day: 8, dose: "750mg q12h", lastLevel: 26.3, levelStatus: "supra", cr: 1.89, egfr: 34, crTrend: "rising", nextDraw: "วันนี้ 06:00", drawStatus: "overdue", akiAlert: true, flag: "critical" },
  { id: 3, name: "ผู้ป่วย 003", ward: "Medหญิง1 (14/5)", age: 55, startDate: "03/06/68", day: 3, dose: "1g q8h", lastLevel: 7.2, levelStatus: "sub", cr: 0.68, egfr: 95, crTrend: "stable", nextDraw: "พรุ่งนี้ 06:00", drawStatus: "scheduled", akiAlert: false, flag: "warning" },
  { id: 4, name: "ผู้ป่วย 004", ward: "SICU (SICU2/3)", age: 81, startDate: "28/05/68", day: 9, dose: "500mg q24h", lastLevel: 14.1, levelStatus: "target", cr: 2.45, egfr: 22, crTrend: "rising", nextDraw: "วันนี้ 18:00", drawStatus: "pending", akiAlert: true, flag: "critical" },
  { id: 5, name: "ผู้ป่วย 005", ward: "ศัลยกรรมชาย (9/3)", age: 45, startDate: "02/06/68", day: 4, dose: "1g q12h", lastLevel: 11.8, levelStatus: "target", cr: 0.92, egfr: 88, crTrend: "stable", nextDraw: "พรุ่งนี้ 06:00", drawStatus: "scheduled", akiAlert: false, flag: "normal" },
  { id: 6, name: "ผู้ป่วย 006", ward: "Medหญิง2 (14/6)", age: 63, startDate: "01/06/68", day: 5, dose: "1g q12h", lastLevel: null, levelStatus: "pending", cr: 1.34, egfr: 52, crTrend: "stable", nextDraw: "วันนี้ 06:00", drawStatus: "done", akiAlert: false, flag: "normal" },
  { id: 7, name: "ผู้ป่วย 007", ward: "CCU (14/1)", age: 77, startDate: "27/05/68", day: 11, dose: "500mg q48h", lastLevel: 19.8, levelStatus: "target", cr: 3.12, egfr: 15, crTrend: "stable", nextDraw: "03/06/68 18:00", drawStatus: "scheduled", akiAlert: false, flag: "warning" },
  { id: 8, name: "ผู้ป่วย 008", ward: "Medชาย1 (14/3)", age: 38, startDate: "04/06/68", day: 2, dose: "1.5g q12h", lastLevel: null, levelStatus: "new", cr: 0.78, egfr: 110, crTrend: "stable", nextDraw: "05/06/68 06:00", drawStatus: "scheduled", akiAlert: false, flag: "normal" },
];

const kpis = [
  { label: "ผู้ป่วยทั้งหมด", value: "8", unit: "ราย", color: "#1F5C99", icon: "👥" },
  { label: "Target Level", value: "4", unit: "ราย (50%)", color: "#2E7D32", icon: "✅" },
  { label: "เสี่ยง AKI", value: "2", unit: "ราย", color: "#C62828", icon: "⚠️" },
  { label: "รอเจาะเลือด", value: "3", unit: "ราย", color: "#E65100", icon: "🩸" },
];

const levelColors = {
  target: { bg: "#E8F5E9", text: "#2E7D32", label: "Target" },
  supra: { bg: "#FFEBEE", text: "#C62828", label: "สูงเกิน" },
  sub: { bg: "#FFF3E0", text: "#E65100", label: "ต่ำเกิน" },
  pending: { bg: "#F3F4F6", text: "#6B7280", label: "รอผล" },
  new: { bg: "#EFF6FF", text: "#1D4ED8", label: "ยังไม่เจาะ" },
};

const drawColors = {
  done: { bg: "#E8F5E9", text: "#2E7D32", label: "เจาะแล้ว" },
  pending: { bg: "#FFF3E0", text: "#E65100", label: "รอเจาะ" },
  overdue: { bg: "#FFEBEE", text: "#C62828", label: "เกินเวลา!" },
  scheduled: { bg: "#EFF6FF", text: "#1D4ED8", label: "นัดไว้" },
};

const flagColors = {
  critical: "#FFEBEE",
  warning: "#FFFDE7",
  normal: "#FFFFFF",
};

const trendIcon = (t) => t === "rising" ? "↑🔴" : t === "falling" ? "↓🟢" : "→";

export default function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selected, setSelected] = useState(null);
  const [filterFlag, setFilterFlag] = useState("all");

  const filtered = filterFlag === "all" ? patients : patients.filter(p => p.flag === filterFlag);

  const alertPts = patients.filter(p => p.akiAlert || p.drawStatus === "overdue" || p.levelStatus === "supra");

  return (
    <div style={{ fontFamily: "'Sarabun', 'Noto Sans Thai', sans-serif", background: "#F0F4F8", minHeight: "100vh", padding: 0 }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #1F5C99 0%, #0D3B6E 100%)", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <div style={{ color: "#fff", fontSize: 20, fontWeight: 700 }}>💊 Vancomycin Smart TDM Alert</div>
          <div style={{ color: "#93C5FD", fontSize: 13, marginTop: 2 }}>โรงพยาบาลสุรินทร์ • กลุ่มงานเภสัชกรรม</div>
        </div>
        <div style={{ color: "#93C5FD", fontSize: 13, textAlign: "right" }}>
          <div>อัปเดตล่าสุด</div>
          <div style={{ color: "#fff", fontWeight: 600 }}>วันพุธ 4 มิ.ย. 68 • 06:12 น.</div>
        </div>
      </div>

      {/* Alert Banner */}
      {alertPts.length > 0 && (
        <div style={{ background: "#FEF2F2", borderBottom: "2px solid #FCA5A5", padding: "8px 24px", display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 18 }}>🚨</span>
          <span style={{ color: "#991B1B", fontWeight: 600, fontSize: 14 }}>
            แจ้งเตือนด่วน: พบ {alertPts.length} ราย ที่ต้องการความสนใจเป็นพิเศษ
          </span>
          <span style={{ color: "#DC2626", fontSize: 13 }}>
            ({alertPts.map(p => p.name).join(", ")})
          </span>
        </div>
      )}

      {/* Tabs */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 24px", display: "flex", gap: 0 }}>
        {[
          { key: "dashboard", label: "📊 Dashboard" },
          { key: "patients", label: "🏥 รายชื่อผู้ป่วย" },
          { key: "kpi", label: "📈 ตัวชี้วัด" },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)} style={{
            padding: "12px 20px", border: "none", background: "none", cursor: "pointer",
            fontFamily: "inherit", fontSize: 14, fontWeight: activeTab === tab.key ? 700 : 400,
            color: activeTab === tab.key ? "#1F5C99" : "#6B7280",
            borderBottom: activeTab === tab.key ? "3px solid #1F5C99" : "3px solid transparent",
            transition: "all 0.2s",
          }}>{tab.label}</button>
        ))}
      </div>

      <div style={{ padding: "20px 24px" }}>
        {/* KPI Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 20 }}>
          {kpis.map((k, i) => (
            <div key={i} style={{ background: "#fff", borderRadius: 12, padding: "16px 20px", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", borderLeft: `4px solid ${k.color}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                  <div style={{ color: "#6B7280", fontSize: 13, marginBottom: 4 }}>{k.label}</div>
                  <div style={{ color: k.color, fontSize: 28, fontWeight: 800, lineHeight: 1 }}>{k.value}</div>
                  <div style={{ color: "#9CA3AF", fontSize: 12, marginTop: 4 }}>{k.unit}</div>
                </div>
                <span style={{ fontSize: 28 }}>{k.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div>
            {/* Level Distribution */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
              <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, color: "#1F2937" }}>📊 การกระจายระดับยา Vancomycin</div>
                {[
                  { label: "Target (10–20 mg/L)", count: 4, pct: 50, color: "#2E7D32" },
                  { label: "สูงเกินเป้าหมาย (> 20 mg/L)", count: 1, pct: 12.5, color: "#C62828" },
                  { label: "ต่ำกว่าเป้าหมาย (< 10 mg/L)", count: 1, pct: 12.5, color: "#E65100" },
                  { label: "รอผล / ยังไม่เจาะ", count: 2, pct: 25, color: "#6B7280" },
                ].map((item, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, color: "#374151" }}>{item.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: item.color }}>{item.count} ราย ({item.pct}%)</span>
                    </div>
                    <div style={{ height: 8, background: "#F3F4F6", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${item.pct}%`, background: item.color, borderRadius: 4, transition: "width 0.5s" }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ background: "#fff", borderRadius: 12, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 16, color: "#1F2937" }}>🏥 การกระจายตาม eGFR</div>
                {[
                  { label: "eGFR ≥ 60 (ไตปกติ/ลดน้อย)", count: 3, pct: 37.5, color: "#2E7D32" },
                  { label: "eGFR 30–59 (ลดปานกลาง)", count: 2, pct: 25, color: "#F59E0B" },
                  { label: "eGFR 15–29 (ลดรุนแรง)", count: 2, pct: 25, color: "#E65100" },
                  { label: "eGFR < 15 (ไตวาย)", count: 1, pct: 12.5, color: "#C62828" },
                ].map((item, i) => (
                  <div key={i} style={{ marginBottom: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                      <span style={{ fontSize: 13, color: "#374151" }}>{item.label}</span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: item.color }}>{item.count} ราย</span>
                    </div>
                    <div style={{ height: 8, background: "#F3F4F6", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${item.pct}%`, background: item.color, borderRadius: 4 }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AKI Alert Panel */}
            <div style={{ background: "#FEF2F2", border: "1px solid #FCA5A5", borderRadius: 12, padding: 20, marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#991B1B", marginBottom: 12 }}>🚨 การแจ้งเตือน VA-AKI Early Warning</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {patients.filter(p => p.akiAlert).map(p => (
                  <div key={p.id} style={{ background: "#fff", borderRadius: 8, padding: 14, border: "1px solid #FCA5A5" }}>
                    <div style={{ fontWeight: 700, color: "#991B1B", marginBottom: 4 }}>{p.name} — {p.ward}</div>
                    <div style={{ fontSize: 13, color: "#6B7280" }}>Cr: <strong style={{ color: "#DC2626" }}>{p.cr} mg/dL</strong> ({trendIcon(p.crTrend)}) | eGFR: <strong>{p.egfr}</strong></div>
                    <div style={{ fontSize: 13, color: "#6B7280", marginTop: 2 }}>Level ล่าสุด: <strong>{p.lastLevel} mg/L</strong></div>
                    <div style={{ marginTop: 8, background: "#FEE2E2", borderRadius: 6, padding: "4px 10px", fontSize: 12, color: "#991B1B", display: "inline-block" }}>
                      ⚠️ Cr เพิ่มขึ้น — ควรประเมิน VA-AKI
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sampling Alert */}
            <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 12, padding: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#92400E", marginBottom: 12 }}>🩸 การแจ้งเตือนการเจาะระดับยา</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
                {patients.filter(p => p.drawStatus !== "done" && p.drawStatus !== "scheduled").map(p => (
                  <div key={p.id} style={{ background: "#fff", borderRadius: 8, padding: 12, border: `1px solid ${p.drawStatus === "overdue" ? "#FCA5A5" : "#FED7AA"}` }}>
                    <div style={{ fontWeight: 600, color: "#1F2937", fontSize: 14 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "#6B7280" }}>{p.ward}</div>
                    <div style={{ fontSize: 13, marginTop: 4 }}>
                      <span style={{ background: drawColors[p.drawStatus].bg, color: drawColors[p.drawStatus].text, padding: "2px 8px", borderRadius: 4, fontSize: 12, fontWeight: 700 }}>
                        {drawColors[p.drawStatus].label}
                      </span>
                    </div>
                    <div style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>กำหนดเจาะ: {p.nextDraw}</div>
                  </div>
                ))}
                {patients.filter(p => p.drawStatus !== "done" && p.drawStatus !== "scheduled").length === 0 && (
                  <div style={{ color: "#6B7280", gridColumn: "1/-1", fontSize: 14, textAlign: "center", padding: 20 }}>✅ ไม่มีการเจาะเลือดที่ค้างอยู่</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Patients Tab */}
        {activeTab === "patients" && (
          <div>
            {/* Filter */}
            <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
              {[["all","ทั้งหมด"],["critical","วิกฤต"],["warning","เฝ้าระวัง"],["normal","ปกติ"]].map(([key, label]) => (
                <button key={key} onClick={() => setFilterFlag(key)} style={{
                  padding: "6px 16px", borderRadius: 20, border: "1px solid #D1D5DB",
                  background: filterFlag === key ? "#1F5C99" : "#fff",
                  color: filterFlag === key ? "#fff" : "#374151",
                  cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: filterFlag === key ? 700 : 400,
                }}>{label}</button>
              ))}
              <div style={{ marginLeft: "auto", color: "#6B7280", fontSize: 13, alignSelf: "center" }}>แสดง {filtered.length} ราย</div>
            </div>

            {/* Table */}
            <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#1F5C99", color: "#fff" }}>
                    {["ผู้ป่วย / หอผู้ป่วย", "อายุ / วันที่รับยา", "Dose", "Cr / eGFR", "Level ล่าสุด", "สถานะ Level", "การเจาะครั้งถัดไป", "แจ้งเตือน"].map((h, i) => (
                      <th key={i} style={{ padding: "12px 14px", textAlign: "left", fontWeight: 700, fontSize: 13 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p, i) => {
                    const lc = levelColors[p.levelStatus];
                    const dc = drawColors[p.drawStatus];
                    return (
                      <tr key={p.id} onClick={() => setSelected(selected === p.id ? null : p.id)}
                        style={{ background: flagColors[p.flag], cursor: "pointer", borderBottom: "1px solid #F3F4F6",
                        transition: "background 0.2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#EFF6FF"}
                        onMouseLeave={e => e.currentTarget.style.background = flagColors[p.flag]}>
                        <td style={{ padding: "12px 14px" }}>
                          <div style={{ fontWeight: 700, color: "#1F2937" }}>{p.name}</div>
                          <div style={{ color: "#6B7280", fontSize: 12 }}>{p.ward}</div>
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <div>{p.age} ปี</div>
                          <div style={{ color: "#6B7280", fontSize: 12 }}>เริ่ม {p.startDate} (D{p.day})</div>
                        </td>
                        <td style={{ padding: "12px 14px", color: "#374151" }}>{p.dose}</td>
                        <td style={{ padding: "12px 14px" }}>
                          <div style={{ fontWeight: 600, color: p.crTrend === "rising" ? "#DC2626" : "#374151" }}>
                            {p.cr} mg/dL {trendIcon(p.crTrend)}
                          </div>
                          <div style={{ fontSize: 12, color: p.egfr < 30 ? "#DC2626" : p.egfr < 60 ? "#D97706" : "#2E7D32" }}>
                            eGFR {p.egfr}
                          </div>
                        </td>
                        <td style={{ padding: "12px 14px", fontWeight: 700, color: lc.text }}>
                          {p.lastLevel ? `${p.lastLevel} mg/L` : "—"}
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <span style={{ background: lc.bg, color: lc.text, padding: "3px 10px", borderRadius: 12, fontWeight: 700, fontSize: 12 }}>
                            {lc.label}
                          </span>
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          <div style={{ fontSize: 12 }}>{p.nextDraw}</div>
                          <span style={{ background: dc.bg, color: dc.text, padding: "2px 8px", borderRadius: 10, fontWeight: 600, fontSize: 11 }}>
                            {dc.label}
                          </span>
                        </td>
                        <td style={{ padding: "12px 14px" }}>
                          {p.akiAlert && <div style={{ fontSize: 18 }} title="เสี่ยง AKI">⚠️</div>}
                          {p.drawStatus === "overdue" && <div style={{ fontSize: 18 }} title="เจาะเลือดเกินเวลา">🩸</div>}
                          {p.levelStatus === "supra" && <div style={{ fontSize: 18 }} title="ระดับยาสูงเกิน">🔴</div>}
                          {p.flag === "normal" && !p.akiAlert && <div style={{ color: "#D1D5DB" }}>—</div>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div style={{ marginTop: 10, fontSize: 12, color: "#9CA3AF", textAlign: "right" }}>
              🔴 แถวสีแดงอ่อน = ต้องการความสนใจด่วน | 🟡 แถวสีเหลืองอ่อน = ควรเฝ้าระวัง
            </div>
          </div>
        )}

        {/* KPI Tab */}
        {activeTab === "kpi" && (
          <div>
            <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", marginBottom: 20 }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#1F2937", marginBottom: 20 }}>📈 ตัวชี้วัดคุณภาพบริการ TDM Vancomycin</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
                {[
                  { label: "อัตราการบรรลุเป้าหมายระดับยาครั้งแรก", current: 51.5, target: 65, goal: "≥ 65%", unit: "%", color: "#1F5C99" },
                  { label: "อัตราการเจาะระดับยาถูกต้องตามเวลา", current: 96, target: 99, goal: "≥ 99%", unit: "%", color: "#2E7D32" },
                  { label: "อุบัติการณ์ VA-AKI", current: 4.0, target: 3.0, goal: "< 3%", unit: "%", color: "#DC2626", inverse: true },
                  { label: "Acceptance rate (แพทย์ยอมรับคำแนะนำ)", current: 90.9, target: 95, goal: "≥ 95%", unit: "%", color: "#7C3AED" },
                ].map((kpi, i) => {
                  const pct = kpi.inverse ? Math.max(0, 100 - (kpi.current / kpi.target) * 100) : Math.min(100, (kpi.current / kpi.target) * 100);
                  const reached = kpi.inverse ? kpi.current <= kpi.target : kpi.current >= kpi.target;
                  return (
                    <div key={i} style={{ padding: 20, border: `1px solid ${reached ? "#D1FAE5" : "#FEE2E2"}`, borderRadius: 10, background: reached ? "#F0FDF4" : "#FEF2F2" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                        <span style={{ fontSize: 14, color: "#374151", fontWeight: 600 }}>{kpi.label}</span>
                        <span style={{ fontSize: 18 }}>{reached ? "✅" : "🎯"}</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 10 }}>
                        <span style={{ fontSize: 36, fontWeight: 800, color: kpi.color }}>{kpi.current}</span>
                        <span style={{ fontSize: 16, color: "#6B7280" }}>{kpi.unit}</span>
                        <span style={{ fontSize: 13, color: "#9CA3AF" }}>เป้าหมาย: {kpi.goal}</span>
                      </div>
                      <div style={{ height: 10, background: "#E5E7EB", borderRadius: 5, overflow: "hidden" }}>
                        <div style={{ height: "100%", width: `${Math.min(pct, 100)}%`, background: reached ? "#2E7D32" : kpi.color, borderRadius: 5, transition: "width 0.6s" }} />
                      </div>
                      <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 4 }}>Baseline ก่อนพัฒนาระบบ</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Intervention Summary */}
            <div style={{ background: "#fff", borderRadius: 12, padding: 24, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#1F2937", marginBottom: 16 }}>💊 สรุปรูปแบบ Pharmaceutical Intervention</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {[
                  { label: "Continue dose", count: 36, pct: 36.4, color: "#2E7D32" },
                  { label: "Increase dose", count: 27, pct: 27.3, color: "#1F5C99" },
                  { label: "Decrease dose", count: 23, pct: 23.2, color: "#E65100" },
                  { label: "Hold dose", count: 5, pct: 5.1, color: "#7C3AED" },
                  { label: "Repeat TDM", count: 4, pct: 4.0, color: "#DC2626" },
                  { label: "Discontinue", count: 4, pct: 4.0, color: "#6B7280" },
                ].map((item, i) => (
                  <div key={i} style={{ padding: 14, border: "1px solid #E5E7EB", borderRadius: 8, display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 44, height: 44, borderRadius: "50%", background: item.color, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: 14, flexShrink: 0 }}>
                      {item.pct}%
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: "#1F2937", fontSize: 13 }}>{item.label}</div>
                      <div style={{ color: "#6B7280", fontSize: 12 }}>{item.count} ครั้ง</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, padding: 14, background: "#EFF6FF", borderRadius: 8, border: "1px solid #BFDBFE" }}>
                <span style={{ fontWeight: 700, color: "#1D4ED8" }}>📌 สรุปสำคัญ: </span>
                <span style={{ color: "#374151", fontSize: 14 }}>
                  มีการปรับขนาดยา (increase + decrease) รวม <strong>50 ครั้ง (50.5%)</strong> สะท้อนถึงความจำเป็นของการติดตาม TDM เชิงรุก
                  และยืนยันบทบาทสำคัญของเภสัชกรคลินิกในการปรับขนาดยาแบบ individualized dosing
                </span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ background: "#1F2937", color: "#9CA3AF", textAlign: "center", padding: "12px", fontSize: 12, marginTop: 20 }}>
        Vancomycin Smart TDM Alert | โรงพยาบาลสุรินทร์ | พัฒนาโดย กลุ่มงานเภสัชกรรม ร่วมกับ IT Department | แบบจำลองเพื่อการนำเสนอแนวคิด
      </div>
    </div>
  );
}
