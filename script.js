const menuData = [
  {
    name: 'Home',
    path: 'index.html',
    blank: false
  },
  {
    name: 'Histories',
    path: 'histories.html',
    blank: false
  },
  {
    name: 'Links',
    path: 'links.html',
    blank: false
  },
  {
    name: 'Status',
    path: 'status.html',
    blank: false
  },
  {
    name: 'Share to Twitter',
    path: 'https://twitter.com/intent/tweet?text=%23%E3%81%8A%E3%81%A8%E3%81%AD%E3%81%93%E3%83%BC%E3%81%A9%0A%E9%9F%B3%E7%8C%AB%EF%BD%A1%20(%20%40rin_pineapple%20)%20%E3%81%AEProfile%0A%0Ahttps%3A%2F%2Fotoneko.jp%2F',
    blank: true
  }
];

const author = document.createElement('div');
author.className = 'author';
author.innerHTML = `<p>このページは<a href="https://www.otoneko.cat/">OTONEKO.CAT</a>に移転しました</p>`
document.body.appendChild(author);

document.addEventListener('DOMContentLoaded', function () {
  pingServer('https://www.otoneko.jp');
  const params = new URLSearchParams(window.location.search);
  const isYuru = params.get('yuru') === 'true';

  if (isYuru) {
    const images = document.querySelectorAll('img[src="img/otoneko.png"]');
    images.forEach(img => {
      img.src = 'img/yuru-otoneko.png';
      img.title = 'Drawn by すばる (Twitter: @khmsbr)';
    });

    const links = document.querySelectorAll('a[href]');
    links.forEach(link => {
      const url = new URL(link.href);
      if (url.hostname === window.location.hostname) {
        url.searchParams.set('yuru', 'true');
        link.href = url.toString();
      }
    });
  }

  const questionMark = document.createElement('div');
  questionMark.textContent = '❓';
  questionMark.style.position = 'fixed';
  questionMark.style.left = '10px';
  questionMark.style.bottom = '10px';
  questionMark.style.fontSize = '24px';
  questionMark.style.cursor = 'pointer';
  questionMark.style.zIndex = '1000';

  document.body.appendChild(questionMark);

  questionMark.addEventListener('click', function () {
    const url = new URL(window.location.href);
    if (isYuru) {
      url.searchParams.delete('yuru');
    } else {
      url.searchParams.set('yuru', 'true');
    }
    window.location.href = url.toString();
  });
});

document.addEventListener("DOMContentLoaded", async function () {
  const typedOutputs = document.querySelectorAll('.typing');

  for (const typedOutput of typedOutputs) {
    const textToType = typedOutput.getAttribute('data-value');
    let index = 0;
    let cursorInterval;

    async function typeText() {
      if (index < textToType.length) {
        if (textToType.charAt(index) === ';') {
          typedOutput.innerHTML += '<br>';
        } else {
          typedOutput.innerHTML += textToType.charAt(index);
        }

        index++;
        setTimeout(typeText, 100);
      } else {
        clearInterval(cursorInterval);
        typedOutput.classList.add('no-cursor');
      }
    }
    await typeText();
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const menuButton = document.querySelector('.menu-button');
  const pageList = document.querySelector('.page-list');

  const pageListUl = document.querySelector('.page-list ul');

  pageListUl.appendChild(document.createElement('br'));
  pageListUl.appendChild(document.createElement('br'));

  const params = new URLSearchParams(window.location.search);
  const isYuru = params.get('yuru') === 'true';

  menuData.forEach(item => {
    const listItem = document.createElement('li');
    const link = document.createElement('a');
    link.href = `${item.path}${isYuru && !item.path.includes('twitter.com') ? '?yuru=true' : ''}`;
    link.textContent = item.name;
    if (item.blank) {
      link.target = '_blank';
    }
    listItem.appendChild(link);
    pageListUl.appendChild(listItem);
  });

  menuButton.addEventListener('click', function () {
    if (pageList.style.left === '-250px' || pageList.style.left === '') {
      pageList.style.left = '0';
    } else {
      pageList.style.left = '-250px';
    }
  });

  document.addEventListener('click', function (event) {
    if (event.target !== menuButton && event.target !== pageList && !menuButton.contains(event.target) && !pageList.contains(event.target)) {
      pageList.style.left = '-250px';
    }
  });
});

const checkInterval = 10000;

async function pingServer(url) {
  try {
    const start = Date.now();
    const response = await fetch(url);
    const end = Date.now();
    const responseTime = end - start;

    console.log(`=^..^= < Meow! Ping: ${responseTime} ms`);

    let statusText, statusClass, barColor;
    const uptimeData = getUptimeData();

    if (response.ok) {
      if (responseTime > 200) {
        statusText = 'Warning';
        statusClass = 'status-warning';
        barColor = 'yellow';
      } else {
        statusText = 'Working';
        statusClass = 'status-ok';
        barColor = 'green';
      }
      uptimeData.uptime += checkInterval;
    } else {
      statusText = 'Suspended';
      statusClass = 'status-error';
      barColor = 'red';
      uptimeData.downtime += checkInterval;
    }

    const uptimePercentage = calculateUptimePercentage(uptimeData);
    saveUptimeData(uptimeData);

    document.getElementById('website-status-text').textContent = statusText;
    document.getElementById('website-status-text').className = statusClass;
    document.getElementById('website-response-time').textContent = `${responseTime} ms`;
    document.getElementById('website-uptime').textContent = `${uptimePercentage.toFixed(2)}%`;

    const pingBar = document.getElementById('ping-bar');
    const maxPing = 200;
    const barWidth = Math.min((responseTime / maxPing) * 100, 100);
    pingBar.style.width = `${barWidth}%`;
    pingBar.style.backgroundColor = barColor;
  } catch (error) {
    document.getElementById('website-status-text').textContent = 'Error';
    document.getElementById('website-status-text').className = 'status-error';
    document.getElementById('website-response-time').textContent = '-';
    document.getElementById('website-uptime').textContent = '0%';
    document.getElementById('ping-bar').style.width = '0%';
    document.getElementById('ping-bar').style.backgroundColor = 'red';

    const uptimeData = getUptimeData();
    uptimeData.downtime += checkInterval;
    saveUptimeData(uptimeData);
  }
}

function getUptimeData() {
  const data = localStorage.getItem('uptimeData');
  return data ? JSON.parse(data) : { uptime: 0, downtime: 0 };
}

function saveUptimeData(data) {
  localStorage.setItem('uptimeData', JSON.stringify(data));
}

function calculateUptimePercentage(data) {
  const total = data.uptime + data.downtime;
  return total === 0 ? 0 : (data.uptime / total) * 100;
}

function sendSecretMessage() {
  console.log('=^..^= < Meow! How Did You Get Here?');
}

setInterval(() => {
  pingServer('https://www.otoneko.jp');
  sendSecretMessage();
}, checkInterval);