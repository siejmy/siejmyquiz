/**
 * Based on https://gist.github.com/mmoollllee/34dbb60840f60db9e93e38d0de778371
 * Uses https://github.com/osano/cookieconsent/tree/master
 */
function siejmyConsent() {
  const consentHtml =
    "Siejmy, tak jak (prawie) wszystkie inne strony wykorzystuje ciasteczka oraz analityki Google/Facebook. " +
    "Używamy tych zbiorczych i anonimowych danych tylko aby dowiedzieć się, które treści najbardziej " +
    'Wam się podobają. <a href="https://siejmy.pl/polityka-prywatnosci/">Polityka prywatności</a> Niech będzie Pan pochwalony we wszystkich naszych dziełach!';
  const allowBtnText = "Zgadzam się";

  const trackingScripts = [
    "https://www.googletagmanager.com/gtag/js?id=UA-173172948-1",
  ];
  const trackingCode = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'UA-173172948-1');

    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '3061901444080879');
    fbq('track', 'PageView');
  `;

  window.siejmyconsent_allowTracking = function () {
    document.getElementById("siejmyconsent").style.display = "none";
    document.cookie = "cookieconsent_status=allow";
    siejmyconsent_enableTracking();
  };

  window.siejmyconsent_enableTracking = function () {
    trackingScripts.forEach((url) => {
      const script = document.createElement("script");
      script.async = true;
      script.src = url;
      document.body.appendChild(script);
    });

    const script = document.createElement("script");
    script.innerText = trackingCode;
    document.body.appendChild(script);
  };

  window.addEventListener("DOMContentLoaded", function () {
    const isAllowed =
      document.cookie.indexOf("cookieconsent_status=allow") > -1;
    const isDenied = document.cookie.indexOf("cookieconsent_status=deny") > -1;

    if (isAllowed) {
      siejmyconsent_enableTracking();
    } else if (!isDenied) {
      const consentElem = document.createElement("div");
      consentElem.id = "siejmyconsent";
      consentElem.innerHTML =
        "<p>" +
        consentHtml +
        "</p>" +
        '<a onClick="siejmyconsent_allowTracking()">' +
        allowBtnText +
        "</a>";
      document.body.appendChild(consentElem);
    }
  });
}
siejmyConsent();
