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
