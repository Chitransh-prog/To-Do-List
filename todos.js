const tl = document.getElementById('tasks');
const ti = document.getElementById('input');
const ts = JSON.parse(localStorage.getItem('tasks')) || [];

function render() {
  tl.innerHTML = ''; 

  ts.forEach((t, i) => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" ${t.completed ? 'checked' : ''}>
      <span class="${t.completed ? 'completed' : ''}">${t.text}</span>
      <button>Delete</button>
    `;
    tl.appendChild(li);

    /*Toggle task completion*/
    li.querySelector('input[type="checkbox"]').addEventListener('change', () => {
      t.completed = !t.completed;
      localStorage.setItem('tasks', JSON.stringify(ts));
      render();
    });

    /*Delete task*/
    li.querySelector('button').addEventListener('click', () => {
      ts.splice(i, 1);
      localStorage.setItem('tasks', JSON.stringify(ts));
      render();
    });
  });
}

/*Initial render*/
render();

/*Add new task*/
ti.addEventListener('keypress', (e) => {
  if (e.key === 'Enter' && ti.value.trim() !== '') {
    const nt = { text: ti.value, completed: false };
    ts.push(nt);
    localStorage.setItem('tasks', JSON.stringify(ts));
    ti.value = ''; // Clear input field after adding
    render();
  }
});

/*Clear local storage and reset the tasks array*/
function clearLocalStorage() {
  localStorage.clear();
  ts.length = 0; /*Reset the tasks array*/
  console.log('Local storage cleared!');
  render();
}
