# Vancomycin Smart TDM Alert

แดชบอร์ดต้นแบบ (concept demo) สำหรับติดตามระดับยา Vancomycin (TDM) ของโรงพยาบาลสุรินทร์
กลุ่มงานเภสัชกรรม — ข้อมูลในโค้ดเป็นข้อมูลจำลองเพื่อการนำเสนอแนวคิดเท่านั้น

## Tech stack
- React 18
- Vite

## รันบนเครื่องตัวเอง (local dev)

```bash
npm install
npm run dev
```

แล้วเปิด `http://localhost:5173`

## Build สำหรับ production

```bash
npm run build
npm run preview
```

ไฟล์ที่ build แล้วจะอยู่ในโฟลเดอร์ `dist/`

## วิธีอัปโหลดขึ้น GitHub

```bash
git init
git add .
git commit -m "Initial commit: Vancomycin Smart TDM Alert dashboard"
git branch -M main
git remote add origin <URL ของ repo บน GitHub>
git push -u origin main
```

## โครงสร้างโปรเจกต์

```
vanco-tdm-dashboard/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.jsx
│   └── App.jsx      # หน้า dashboard หลักทั้ง 3 แท็บ
└── README.md
```

## Deploy

โปรเจกต์นี้เป็น static site (Vite) จึง deploy ได้ง่ายผ่าน Vercel, Netlify หรือ GitHub Pages
โดย build ด้วย `npm run build` แล้วนำโฟลเดอร์ `dist/` ไปวางบนบริการที่เลือก
