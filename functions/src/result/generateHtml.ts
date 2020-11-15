import { Result } from "./types";

export function generateHtml(result: Result) {
  return (
    html` <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Wyniki quizu</title>
          <link href="/style.css" rel="stylesheet" />
        </head>
        <body>
          <div class="header">
            <a href="https://siejmy.pl">
              <div class="logo">
                <img
                  src="/assets/siejmy-logo-bez-tekstu.png"
                  alt="Logo siejmy"
                />
              </div>
              <div class="title">
                <p>SIEJMY <span>quiz</span></p>
              </div>
            </a>
          </div>
        </body>
      </html>` +
    generateResultHtml(result) +
    `</body>
    </html>
  `
  );
}

function generateResultHtml({ name }: Result) {
  if (name) return `<h1>Gratulacje ${name}!</h1>`;
  else return `<h1>Gratulacje!</h1>`;
}

function html(text: TemplateStringsArray) {
  return text.join("");
}
