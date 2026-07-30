export function tutorHubEmailTemplate({ heading, body, ctaText, ctaUrl }) {
  return `
  <div style="background-color:#F8FBFC; padding:40px 20px; font-family:'Segoe UI', Arial, sans-serif;">
    <div style="max-width:600px; margin:0 auto; background-color:#ffffff; border-radius:8px; overflow:hidden; border:1px solid #e5e7eb;">
      
      <!-- Header -->
      <div style="padding:32px 40px; border-bottom:1px solid #f0f0f0; text-align:center;">
        <img src="https://tutorhub.lk/logo-email.png" alt="TutorHub.LK" style="height:40px;" />
      </div>

      <!-- Body -->
      <div style="padding:40px;">
        <p style="font-size:16px; color:#0F2537; margin:0 0 20px;">${heading}</p>
        <div style="font-size:15px; color:#0F2537; line-height:1.6; opacity:0.85;">
          ${body}
        </div>

        ${ctaUrl ? `
        <div style="text-align:center; margin:32px 0;">
          <a href="${ctaUrl}" style="background-color:#218396; color:#ffffff; text-decoration:none; padding:14px 32px; border-radius:6px; font-weight:600; font-size:15px; display:inline-block;">
            ${ctaText}
          </a>
        </div>` : ""}

        <p style="font-size:14px; color:#0F2537; opacity:0.6; margin-top:32px;">
          If you have any questions, feel free to reply to this email or contact our support team.
        </p>

        <p style="font-size:14px; color:#0F2537; margin-top:24px;">
          Warm regards,<br/>
          <strong>The TutorHub.LK Team</strong>
        </p>
      </div>

      <!-- Footer -->
      <div style="background-color:#F8FBFC; padding:20px 40px; text-align:center; font-size:12px; color:#0F2537; opacity:0.6; border-top:1px solid #e5e7eb;">
        © ${new Date().getFullYear()} TutorHub.LK — Connecting students with the perfect tutors across Sri Lanka.
      </div>

    </div>
  </div>`;
}