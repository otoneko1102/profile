document.addEventListener('DOMContentLoaded', function () {
  const params = new URLSearchParams(window.location.search);
  const isYuru = params.get('yuru') === 'true';

  if (isYuru) {
    const images = document.querySelectorAll('img[src="img/otoneko.png"]');
    images.forEach(img => {
      img.src = 'img/yuru-otoneko.png';
      img.title = 'Drawn by りゅー (Twitter: @bluehat_R)';
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
