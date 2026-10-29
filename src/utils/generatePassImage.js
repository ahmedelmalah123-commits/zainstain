/**
 * High-resolution canvas renderer for Zainstein VIP Student Pass.
 * Generates and downloads a crisp PNG image matching the Neo-Brutalist design.
 */

export function downloadPassImage({
  name = '',
  registrationNumber = 101,
  registrationCode = 'ZS101A',
  courseName = 'Foundation of Software Engineering and Artificial Intelligence',
}) {
  const canvas = document.createElement('canvas');
  const width = 900;
  const height = 540;
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Background - Warm Paper
  ctx.fillStyle = '#fff9ed';
  ctx.fillRect(0, 0, width, height);

  // Subtle dot pattern
  ctx.fillStyle = 'rgba(23, 23, 23, 0.08)';
  for (let x = 15; x < width; x += 22) {
    for (let y = 15; y < height; y += 22) {
      ctx.beginPath();
      ctx.arc(x, y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Card Shadow
  const pad = 24;
  const cardW = width - pad * 2 - 10;
  const cardH = height - pad * 2 - 10;
  ctx.fillStyle = '#171717';
  ctx.fillRect(pad + 10, pad + 10, cardW, cardH);

  // Card Body
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(pad, pad, cardW, cardH);

  // Card Outline
  ctx.lineWidth = 4;
  ctx.strokeStyle = '#171717';
  ctx.strokeRect(pad, pad, cardW, cardH);

  // Top Header Bar
  ctx.fillStyle = '#171717';
  ctx.fillRect(pad, pad, cardW, 64);

  // Header Text
  ctx.fillStyle = '#ffe15a';
  ctx.font = 'bold 24px "Space Mono", monospace, Arial';
  ctx.fillText('ZAINSTEIN', pad + 24, pad + 41);

  ctx.fillStyle = '#435bff';
  ctx.fillRect(pad + 175, pad + 22, 90, 26);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 12px sans-serif';
  ctx.fillText('ACADEMY', pad + 192, pad + 39);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 16px "Cairo", sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('بطاقة طالب رسمية — VIP PASS ⚡', pad + cardW - 24, pad + 41);
  ctx.textAlign = 'left';

  // Yellow Sub-banner
  ctx.fillStyle = '#ffe15a';
  ctx.fillRect(pad, pad + 64, cardW, 40);
  ctx.lineWidth = 3;
  ctx.strokeRect(pad, pad + 64, cardW, 40);

  ctx.fillStyle = '#171717';
  ctx.font = 'bold 16px "Cairo", sans-serif';
  ctx.fillText('🎓 كورس: ' + courseName, pad + 24, pad + 90);

  ctx.textAlign = 'right';
  ctx.font = 'bold 16px "Space Mono", monospace';
  ctx.fillText('#' + registrationNumber, pad + cardW - 24, pad + 90);
  ctx.textAlign = 'left';

  // Middle Section - Left: Code Box, Right: Details
  const midTop = pad + 124;

  // Code Box (Left)
  ctx.fillStyle = '#171717';
  ctx.fillRect(pad + 34, midTop, 360, 150);
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#435bff';
  ctx.strokeRect(pad + 34, midTop, 360, 150);

  ctx.fillStyle = '#ffe15a';
  ctx.font = 'bold 13px "Cairo", sans-serif';
  ctx.fillText('كود التسجيل المميز (REGISTRATION CODE)', pad + 52, midTop + 34);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 44px "Space Mono", monospace';
  ctx.letterSpacing = '6px';
  ctx.fillText(registrationCode, pad + 52, midTop + 90);

  ctx.fillStyle = '#b9edcf';
  ctx.font = 'bold 13px "Cairo", sans-serif';
  ctx.fillText('ترتيبك بين المسجلين: المسجل رقم #' + registrationNumber, pad + 52, midTop + 128);

  // Details (Right)
  const rightX = pad + 420;

  // 100% Voucher Box
  ctx.fillStyle = '#b9edcf';
  ctx.fillRect(rightX, midTop, cardW - 444, 65);
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#171717';
  ctx.strokeRect(rightX, midTop, cardW - 444, 65);

  ctx.fillStyle = '#171717';
  ctx.font = 'bold 18px "Cairo", sans-serif';
  ctx.fillText('🎁 قسيمة خصم 100% (VOUCHER FREE)', rightX + 16, midTop + 28);
  ctx.font = '13px "Cairo", sans-serif';
  ctx.fillText('تم تأكيد حصولك على خصم 100% الكامل على الكورس', rightX + 16, midTop + 50);

  // Student Info Box
  ctx.fillStyle = '#faf7ef';
  ctx.fillRect(rightX, midTop + 78, cardW - 444, 72);
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#171717';
  ctx.strokeRect(rightX, midTop + 78, cardW - 444, 72);

  ctx.fillStyle = '#171717';
  ctx.font = 'bold 14px "Cairo", sans-serif';
  ctx.fillText('اسم الطالب: ' + (name || 'طالب متميز'), rightX + 16, midTop + 104);
  ctx.font = '13px "Cairo", sans-serif';
  ctx.fillText('تاريخ التسجيل: ' + new Date().toLocaleDateString('ar-EG'), rightX + 16, midTop + 130);

  // Perks Bar at bottom
  const botTop = midTop + 170;
  ctx.fillStyle = '#d9c6ff';
  ctx.fillRect(pad + 20, botTop, cardW - 40, 80);
  ctx.lineWidth = 3;
  ctx.strokeStyle = '#171717';
  ctx.strokeRect(pad + 20, botTop, cardW - 40, 80);

  ctx.fillStyle = '#171717';
  ctx.font = 'bold 15px "Cairo", sans-serif';
  ctx.fillText('⭐ المميزات الحصرية المشمولة بتسجيلك:', pad + 38, botTop + 28);

  ctx.font = '13px "Cairo", sans-serif';
  ctx.fillText('⚡ أولوية الوصول المبكر للكورس (Early Bird Access)', pad + 38, botTop + 56);
  ctx.fillText('🛠️ ورشة عمل تطبيقية تفاعلية مجانًا مع الكورس', pad + 430, botTop + 56);

  // Footer bar
  const footTop = pad + cardH - 32;
  ctx.fillStyle = '#171717';
  ctx.fillRect(pad, footTop, cardW, 32);

  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 11px "Space Mono", monospace';
  ctx.fillText('2026 © ZAINSTEIN ACADEMY — ENGINEERING TOMORROW... TODAY', pad + 24, footTop + 20);

  // Trigger download
  const image = canvas.toDataURL('image/png');
  const a = document.createElement('a');
  a.download = `zainstein-pass-${registrationCode}.png`;
  a.href = image;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
