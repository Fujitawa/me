document.addEventListener('DOMContentLoaded', function() {

const whoSpan = document.querySelector('.who span');
    const texts = ["пират 🏴‍☠️","отаку 🇯🇵","путешественник 🗺️", "провидец 🔭", "мечтатель 🌌", "приключенец 🌍", "искатель 🔬", "открыватель миров 🌏", "астроном 🌠", "философ 📚", "палеонтолог 🦕", "археолог 🔍", "природовед 🌿", "космонавт 👨‍🚀", "фотограф 📷", "историк 🏛️", "путешественник во времени ⏳", "мореплаватель 🚢", "зоолог 🦓", "авантюрист 🏕️", "писатель 📝", "путешественник во снах 💭", "альпинист 🧗‍♂️", "исследователь океанов 🌊", "географ 🗺️", "штормоходец ⚓", "вольный художник 🎨", "путешественник во времени ⌛", "учёный 🧪", "лётчик ✈️", "морской исследователь 🦈", "ученый-биолог 🧬", "сказочник 📖", "путешественник сквозь измерения 🔮", "геолог 🏔️", "исследователь космоса 🚀", "футурист 🚀", "путешественник между звездами 🌠", "метеоролог 🌦️", "другие миры исследователь 🪐", "робинзон 🏝️", "межгалактический путешественник 🌌", "детектив 🔍", "легендарный путешественник 🏴‍☠️", "картограф 🗺️", "путешественник среди забытых цивилизаций 🗿", "космический номад 🚀", "вселенский странник 🌌", "шаманский путешественник 🔮", "капитан космического корабля 🚀", "путешественник среди звёзд 🌟", "блуждающий дух 🌌", "авантюрист во времени ⏰", "путешественник по миру снов 🌌", "философ-путешественник 🌌", "рыцарь далёких земель 🛡️", "таинственный искатель 🕵️‍♂️"];

let currentIndex = 0;
let nextWhoSpan = null;

function changeText() {
  if (nextWhoSpan === null) {
    nextWhoSpan = document.createElement('span');
    whoSpan.parentNode.insertBefore(nextWhoSpan, whoSpan.nextSibling);
    nextWhoSpan.style.opacity = '0';
  }

  nextWhoSpan.textContent = texts[currentIndex];
  currentIndex = (currentIndex + 1) % texts.length;

  // Fade out the current text
  whoSpan.style.transition = 'opacity 0.5s';
  whoSpan.style.opacity = '0';

  // Fade in the next text
  nextWhoSpan.style.transition = 'opacity 0.5s';
  nextWhoSpan.style.opacity = '1';

  // Swap the variables for the next iteration
  [whoSpan, nextWhoSpan] = [nextWhoSpan, whoSpan];
}

// Start the text changing loop
setInterval(changeText, 1200);


// -------------------------


   function showDateTime() {
            const now = new Date();
            const year = now.getFullYear();
            const month = String(now.getMonth() + 1).padStart(2, '0');
            const day = String(now.getDate()).padStart(2, '0');
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');

            const dateString = `${day}.${month}.${year}`;
            const timeString = `${hours}:${minutes}:${seconds}`;

            document.getElementById('date').innerText = dateString;
            document.getElementById('time').innerText = timeString;
        }

        
        setInterval(showDateTime, 1000);


// -------------------------

  function getIpAddress() {
            fetch('https://api.ipify.org?format=json')
                .then(response => response.json())
                .then(data => {
                    const ipAddress = data.ip;
                    document.getElementById('ip-address').innerText = ipAddress;
                })
                .catch(error => {
                    console.error('Ошибка получения IP-адреса:', error);
                    document.getElementById('ip-address').innerText = 'Не удалось получить IP-адрес';
                });
        }

        getIpAddress();


// -------------------------

         anime({
                targets: '#fuji path',
                strokeDashoffset: [anime.setDashoffset, 0],
                easing: 'easeInOutSine',
                duration: 3000,
                delay: function(el, i) {
                 return i * 250
                },
                direction: 'alternate',
                loop: true
               });

});
