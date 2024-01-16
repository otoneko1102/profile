document.addEventListener("DOMContentLoaded", function () {
  const typedOutputs = document.querySelectorAll('.typing');

  typedOutputs.forEach((typedOutput) => {
    const textToType = typedOutput.getAttribute('data-value');
    let index = 0;

    function typeText() {
      if (index < textToType.length) {
        if (textToType.charAt(index) === ';') {
          typedOutput.innerHTML += '<br>';
        } else {
          typedOutput.innerHTML += textToType.charAt(index);
        }

        index++;
        setTimeout(typeText, 60);
      }
    }
    typeText();
  });
});
