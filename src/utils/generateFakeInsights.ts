export function generateFakeInsights(token: string) {
    const whaleActivity = ["Low", "Moderate", "High", "Suspicious"];
    const devActivity = [
      "No activity",
      "Low (1–3 commits/week)",
      "Moderate (5–10 commits/week)",
      "High (15+ commits/week)",
    ];
    const socialMentions = Math.floor(Math.random() * 300) + 10;
    const trending = Math.random() > 0.5;
    const riskLevels = ["Low", "Medium", "High", "Critical"];
  
    return {
      token,
      whale: whaleActivity[Math.floor(Math.random() * whaleActivity.length)],
      dev: devActivity[Math.floor(Math.random() * devActivity.length)],
      social: socialMentions,
      trending,
      risk: riskLevels[Math.floor(Math.random() * riskLevels.length)],
    };
  }