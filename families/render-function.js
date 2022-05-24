export function renderFamily(fam) {
    const div = document.createElement('div');
    const h2 = document.createAttribute('h2');
    div.classList.add('family');
    h2.textContent = fam.name;
    div.append(h2);
    return div;
}