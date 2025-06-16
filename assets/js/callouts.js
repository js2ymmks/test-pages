document.addEventListener("DOMContentLoaded", () => {
  const blocks = document.querySelectorAll("blockquote");

  blocks.forEach((blockquote) => {
    const lines = blockquote.innerHTML.trim().split(/\n/);
    const firstLine = lines[0].replace(/<[^>]*>/g, "").trim(); // HTMLタグを除く
    const match = firstLine.match(/^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/);

    if (match) {
      const type = match[1].toLowerCase();

      // 全体の内容を取得（1行目の [!...] を削除）
      const newHtml = lines
        .map((line, i) => {
          if (i === 0) {
            return line.replace(/\[![A-Z]+\]\s*/, ""); // 括弧削除
          }
          return line;
        })
        .join("\n");

      const callout = document.createElement("div");
      callout.className = `callout ${type}`;

      callout.innerHTML = `
        <div class="callout-icon">${getIcon(type)}</div>
        <div class="callout-content">
          <strong>${type.toUpperCase()}</strong>
          ${newHtml}
        </div>
      `;

      blockquote.replaceWith(callout);
    }
  });

  function getIcon(type) {
    switch (type) {
      case "note": return "📝";
      case "tip": return "💡";
      case "important": return "⚠️";
      case "warning": return "🚨";
      case "caution": return "⚠️";
      default: return "💬";
    }
  }
});