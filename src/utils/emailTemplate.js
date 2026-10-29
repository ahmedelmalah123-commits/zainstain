/**
 * Email Template Generator for Zainstein Academy
 * Generates responsive, Neo-Brutalist HTML emails and plain text fallbacks
 * Compatible with Gmail, Apple Mail, Outlook, and mobile clients.
 */

export const COURSE_FULL_NAME = 'Foundation of Software Engineering and Artificial Intelligence';

/**
 * Generate full HTML confirmation email
 */
export function generateConfirmationEmailHtml({
  name = '',
  email = '',
  phone = '',
  registrationNumber = 101,
  registrationCode = 'ZS101A',
  governorate = '',
  studyInfo = '',
}) {
  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safePhone = escapeHtml(phone);
  const safeGov = escapeHtml(governorate);
  const safeStudy = escapeHtml(studyInfo);
  const safeCode = escapeHtml(String(registrationCode));
  const safeNum = escapeHtml(String(registrationNumber));

  return `<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>تأكيد تسجيلك في كورس Zainstein</title>
  <style>
    @media only screen and (max-width: 600px) {
      .container { width: 100% !important; padding: 12px !important; }
      .ticket-box { padding: 16px !important; }
      .code-display { font-size: 24px !important; letter-spacing: 2px !important; }
      .perk-row { display: block !important; margin-bottom: 12px !important; }
    }
  </style>
</head>
<body style="margin: 0; padding: 24px 10px; background-color: #fff9ed; font-family: 'Cairo', -apple-system, BlinkMacSystemFont, 'Segoe UI', Tahoma, Arial, sans-serif; color: #171717; direction: rtl; text-align: right; -webkit-font-smoothing: antialiased;">
  <!-- MAIN WRAPPER TABLE -->
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fff9ed;">
    <tr>
      <td align="center">
        <!-- CONTAINER -->
        <table role="presentation" class="container" border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; width: 100%; background-color: #ffffff; border: 3px solid #171717; box-shadow: 6px 6px 0 #171717;">
          
          <!-- BRAND HEADER -->
          <tr>
            <td style="background-color: #171717; padding: 18px 24px; text-align: center; border-bottom: 3px solid #171717;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td align="right" style="vertical-align: middle;">
                    <span style="font-family: 'Space Mono', monospace, Arial; font-weight: 900; font-size: 22px; color: #ffe15a; letter-spacing: 1px;">ZAINSTEIN</span>
                    <span style="font-size: 11px; background-color: #435bff; color: #ffffff; padding: 3px 8px; font-weight: bold; margin-right: 8px; vertical-align: middle;">ACADEMY</span>
                  </td>
                  <td align="left" style="vertical-align: middle;">
                    <span style="color: #ffffff; font-size: 12px; font-weight: 600;">تأكيد التسجيل الرسمي ⚡</span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- HERO WELCOME -->
          <tr>
            <td style="padding: 30px 26px 20px 26px;">
              <div style="display: inline-block; background-color: #ffe15a; border: 2px solid #171717; padding: 4px 12px; font-weight: 800; font-size: 13px; margin-bottom: 14px; box-shadow: 3px 3px 0 #171717;">
                🎉 مبروك! تم تأكيد تسجيلك رسميًا
              </div>
              <h1 style="margin: 0 0 10px 0; font-size: 24px; font-weight: 900; color: #171717; line-height: 1.4;">
                أهلاً بك يا ${safeName} في رحلة الانطلاق 🚀
              </h1>
              <p style="margin: 0 0 20px 0; font-size: 15px; line-height: 1.8; color: #333333;">
                يسعدنا انضمامك إلى كورس <strong>${COURSE_FULL_NAME}</strong>. تم تسجيل بياناتك بنجاح في قاعدة البيانات وتخصيص بطاقتك وكودك المميز أدناه.
              </p>
            </td>
          </tr>

          <!-- THE VISUAL STUDENT PASS CARD -->
          <tr>
            <td style="padding: 0 26px 26px 26px;">
              <table role="presentation" class="ticket-box" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #fffdf8; border: 3px solid #171717; box-shadow: 5px 5px 0 #171717;">
                
                <!-- TICKET HEADER -->
                <tr>
                  <td style="background-color: #ffe15a; border-bottom: 2px solid #171717; padding: 12px 18px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td align="right" style="font-weight: 900; font-size: 14px; color: #171717;">
                          🎓 بطاقة طالب معتمدة — VIP Early Access
                        </td>
                        <td align="left" style="font-family: 'Space Mono', monospace; font-size: 14px; font-weight: bold; color: #171717;">
                          #${safeNum}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- COURSE TITLE IN TICKET -->
                <tr>
                  <td style="padding: 20px 20px 14px 20px; border-bottom: 2px dashed #171717;">
                    <span style="font-size: 12px; color: #666; font-weight: bold;">اسم الكورس:</span>
                    <h2 style="margin: 4px 0 0 0; font-size: 17px; font-weight: 900; color: #171717; line-height: 1.4;">
                      ${COURSE_FULL_NAME}
                    </h2>
                  </td>
                </tr>

                <!-- REGISTRATION CODE BLOCK -->
                <tr>
                  <td style="padding: 20px; text-align: center; background-color: #f7f3e8; border-bottom: 2px dashed #171717;">
                    <span style="display: block; font-size: 13px; font-weight: 700; color: #444; margin-bottom: 8px;">
                      كود التسجيل المميز الخاص بك (Registration Code)
                    </span>
                    <div class="code-display" style="display: inline-block; background-color: #171717; color: #ffe15a; font-family: 'Space Mono', monospace, Arial; font-size: 30px; font-weight: 900; letter-spacing: 4px; padding: 12px 28px; border: 2px solid #171717; box-shadow: 4px 4px 0 #435bff;">
                      ${safeCode}
                    </div>
                    <span style="display: block; font-size: 12px; font-weight: 600; color: #666; margin-top: 8px;">
                      ترتيبك بين المسجلين: <strong style="color: #171717;">المسجل رقم #${safeNum}</strong>
                    </span>
                  </td>
                </tr>

                <!-- 100% VOUCHER BANNER -->
                <tr>
                  <td style="padding: 16px 20px; background-color: #b9edcf; border-bottom: 2px solid #171717;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="36" style="vertical-align: middle; font-size: 24px;">🎁</td>
                        <td style="vertical-align: middle; padding-right: 8px;">
                          <strong style="display: block; font-size: 15px; color: #171717; font-weight: 900;">
                            حصلت على Voucher بخصم 100% على الكورس!
                          </strong>
                          <span style="font-size: 12px; color: #1f422b; font-weight: 600;">
                            تم تفعيل الخصم الكامل على حسابك مجانًا، ومقعدك محجوز ضمن هذه الدفعة.
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- PERKS & ADVANTAGES -->
                <tr>
                  <td style="padding: 18px 20px;">
                    <h3 style="margin: 0 0 12px 0; font-size: 14px; font-weight: 800; color: #171717;">
                      المميزات الحصرية المشمولة بتسجيلك:
                    </h3>
                    
                    <!-- Perk 1 -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 10px;">
                      <tr>
                        <td width="28" style="vertical-align: top; font-size: 16px;">⚡</td>
                        <td style="vertical-align: top; font-size: 13px; line-height: 1.6; color: #222;">
                          <strong>أولوية الوصول المبكر (Early Bird Access):</strong>
                          ستكون من أوائل الذين يتم منحهم إمكانية الاطلاع على محتوى الكورس والمواد التدريبية فور جاهزيتها.
                        </td>
                      </tr>
                    </table>

                    <!-- Perk 2 -->
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td width="28" style="vertical-align: top; font-size: 16px;">🛠️</td>
                        <td style="vertical-align: top; font-size: 13px; line-height: 1.6; color: #222;">
                          <strong>ورشة عمل تطبيقية خاصة مجانًا:</strong>
                          دعوة مؤكدة لحضور ورشة عمل عملية مكثفة تركز على بناء مشاريع واقعية وربط هندسة البرمجيات بالذكاء الاصطناعي.
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- REGISTERED INFO SUMMARY -->
                <tr>
                  <td style="background-color: #faf7ef; border-top: 2px solid #171717; padding: 14px 20px; font-size: 12px; color: #444; line-height: 1.8;">
                    <strong>البيانات المسجلة:</strong>
                    الاسم: ${safeName} | الهاتف: ${safePhone} | المحافظة: ${safeGov || '—'} ${safeStudy ? `| الدراسة: ${safeStudy}` : ''}
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- NEXT STEPS -->
          <tr>
            <td style="padding: 0 26px 26px 26px;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #d9c6ff; border: 2px solid #171717; padding: 16px; box-shadow: 3px 3px 0 #171717;">
                <tr>
                  <td>
                    <h4 style="margin: 0 0 6px 0; font-size: 14px; font-weight: 900; color: #171717;">
                      💡 الخطوات القادمة:
                    </h4>
                    <p style="margin: 0; font-size: 13px; line-height: 1.7; color: #23163e;">
                      1. احتفظ بكود التسجيل <strong style="font-family: monospace; background: #fff; padding: 1px 6px; border: 1px solid #171717;">${safeCode}</strong> ورقمك <strong style="font-family: monospace; background: #fff; padding: 1px 6px; border: 1px solid #171717;">#${safeNum}</strong>.<br>
                      2. سنتواصل معك عبر الواتساب والبريد قبل موعد انطلاق الكورس والورشة لمشاركتك روابط الدخول والتفاصيل.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- FOOTER -->
          <tr>
            <td style="background-color: #171717; padding: 22px 24px; text-align: center; color: #ffffff; border-top: 3px solid #171717;">
              <p style="margin: 0 0 6px 0; font-weight: 800; font-size: 14px; color: #ffe15a;">
                Zainstein — Engineering Tomorrow... Today
              </p>
              <p style="margin: 0 0 10px 0; font-size: 12px; color: rgba(255, 255, 255, 0.7); line-height: 1.6;">
                تم إرسال هذا البريد تلقائيًا لتأكيد تسجيلك في منصة Zainstein التعليمية.
              </p>
              <p style="margin: 0; font-size: 11px; color: rgba(255, 255, 255, 0.5);">
                2026 © Zainstein. جميع الحقوق محفوظة.
              </p>
            </td>
          </tr>

        </table>
        <!-- /CONTAINER -->
      </td>
    </tr>
  </table>
</body>
</html>`;
}

/**
 * Generate plain text email fallback
 */
export function generateConfirmationEmailText({
  name = '',
  email = '',
  phone = '',
  registrationNumber = 101,
  registrationCode = 'ZS101A',
  governorate = '',
  studyInfo = '',
}) {
  return `=======================================================
🎓 ZAINSTEIN ACADEMY — تأكيد التسجيل الرسمي
=======================================================

أهلاً بك يا ${name}،

تم تأكيد تسجيلك بنجاح في كورس:
"${COURSE_FULL_NAME}"

-------------------------------------------------------
تفاصيل بطاقة التسجيل الخاصة بك:
-------------------------------------------------------
- رقم التسجيل (ترتيبك بين المسجلين): #${registrationNumber}
- كود التسجيل المميز (Registration Code): ${registrationCode}
- قيمة الفاوتشر (Voucher): خصم 100% (الكورس مجاني بالكامل)
- أولوية الوصول المبكر (Early Access): نعم، مؤكد
- الورشة العملية التطبيقية: مشمولة مجانًا مع الكورس

البيانات المسجلة:
- الاسم: ${name}
- البريد: ${email}
- الهاتف: ${phone}
- المحافظة: ${governorate}
- المجال الدراسي: ${studyInfo}

-------------------------------------------------------
الخطوات القادمة:
-------------------------------------------------------
1. احتفظ بكود التسجيل الخاص بك (${registrationCode}) ورقمك (#${registrationNumber}).
2. سنتواصل معك عبر الواتساب والبريد قبل بداية الكورس والورشة لمشاركتك روابط الانضمام.

فريق Zainstein
Engineering Tomorrow... Today
`;
}

function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
