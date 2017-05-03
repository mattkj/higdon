function higdon() {
  const trainingTable = document.querySelector(".table-training");
  if (!trainingTable) return;

  console.log('Training table found');
  const newPara = document.createElement("p");
  const convertLink = document.createElement("a");
  const insertButtonBefore = trainingTable.nextElementSibling;

  trainingTable.style.marginBottom = '15px';
  newPara.style.textAlign = 'right';
  newPara.appendChild(convertLink);
  convertLink.textContent = "Convert to km";
  convertLink.setAttribute('href', '');
  trainingTable.parentNode.insertBefore(newPara, insertButtonBefore);

  const originalContent = trainingTable.innerHTML;

  let toggled = false;

  function toggleUnits() {
    const tds = Array.from(trainingTable.querySelectorAll("td"));
    if (toggled) {
      tds.forEach(td => {
        td.innerHTML = td.innerHTML.replace(/[0-9]*\.?[0-9]+\s(m|mile|miles)\s/, match => {
          let num = parseFloat(match.slice(0, -3));
          num = Math.round(num * 1.60934 * 2) / 2;
          return `${num} km `;
        });
      });
      convertLink.textContent = 'Convert to miles';
    } else {
      trainingTable.innerHTML = originalContent;
      convertLink.textContent = 'Convert to km';
    }
  }

  convertLink.addEventListener("click", (e) => {
    e.preventDefault();
    toggled = !toggled;
    toggleUnits();
  });
}

higdon();