const verifyEmailTemplate = (email, link) => {
  return `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #e8f0fe; padding: 30px;">
      <div style="
        max-width: 600px; 
        margin: auto; 
        background-color: #ffffff; 
        border-radius: 12px; 
        padding: 40px 30px; 
        box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
        text-align: center;
      ">
        <h2 style="color: #1a73e8; margin-bottom: 20px;">مرحبًا بك في تطبيق انتظار الباصات!</h2>
        
        <p style="font-size: 16px; color: #333333; margin-bottom: 15px;">عزيزي/عزيزتي <strong>${email}</strong>،</p>
        
        <p style="font-size: 16px; color: #555555; line-height: 1.5;">
          شكراً لتسجيلك معنا! لتفعيل حسابك ومتابعة مواعيد الباصات في الوقت الحقيقي، يرجى الضغط على زر التفعيل أدناه:
        </p>
        
        <div style="margin: 35px 0;">
          <a href="${link}" style="
            background-color: #1a73e8;
            color: white;
            padding: 14px 35px;
            border-radius: 8px;
            text-decoration: none;
            font-size: 16px;
            font-weight: bold;
            display: inline-block;
            box-shadow: 0 4px 10px rgba(26, 115, 232, 0.4);
            transition: background-color 0.3s ease;
          " onmouseover="this.style.backgroundColor='#155ab6';" onmouseout="this.style.backgroundColor='#1a73e8';">
            تفعيل الحساب
          </a>
        </div>
        
        <p style="font-size: 14px; color: #888888;">
          إذا لم تقم بإنشاء هذا الحساب، يمكنك تجاهل هذه الرسالة بأمان.
        </p>
        
        <p style="font-size: 14px; color: #888888;">
          مع أطيب التحيات،<br>فريق دعم منصه بالطريق
        </p>
      </div>
    </div>
  `;
};

module.exports = verifyEmailTemplate;
