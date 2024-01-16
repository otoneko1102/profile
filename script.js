document.addEventListener("DOMContentLoaded", function () {
  const typedOutputs = document.querySelectorAll('.typing');

  typedOutputs.forEach((typedOutput) => {
    const textToType = typedOutput.getAttribute('data-value');
    let index = 0;

    function typeText() {
      if (index < textToType.length) {
        if (textToType.charAt(index) === ';') {
          typedOutput.innerHTML += '<br>';
        } else if (textToType.charAt(index) === '%') {
          typedOutput.innerHTML += `${calculateAge('2006-11-2')}`
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

function calculateAge(birthdate) {
  const birthDate = new Date(birthdate);
  const currentDate = new Date();
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  if (currentDate.getMonth() < birthDate.getMonth() || 
      (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}
