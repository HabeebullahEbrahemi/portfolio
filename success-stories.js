// Load stories JSON and render them
document.addEventListener('DOMContentLoaded', function() {
  const storiesContainer = document.getElementById('storiesContainer');
  const searchInput = document.getElementById('searchInput');
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  fetch('data/student-ss.json')
    .then(res => res.json())
    .then(data => {
      const students = data.students;
      renderStories(students);

      // Live search filter
      searchInput.addEventListener('input', () => {
        const q = searchInput.value.toLowerCase();
        const filtered = students.filter(s => s.name.toLowerCase().includes(q));
        renderStories(filtered);
      });
    })
    .catch(err => {
      console.error('Error loading JSON:', err);
      storiesContainer.innerHTML = `<p class="text-center text-danger">Failed to load stories.</p>`;
    });

  function renderStories(students) {
    storiesContainer.innerHTML = '';
    if (students.length === 0) {
      storiesContainer.innerHTML = `<p class="text-center text-muted">No stories found.</p>`;
      return;
    }

    students.forEach(student => {
      const col = document.createElement('div');
      col.className = 'col-md-6 col-lg-4';
      col.innerHTML = `
        <div class="card h-100">
          <img src="${student.image}" alt="${student.name}" class="card-img-top">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">${student.name}</h5>
            <p class="small text-muted mb-2">${student.course} • ${student.duration}</p>
            <p class="card-text story-short">${student.story}</p>
            <div class="mt-auto">
              <button class="btn btn-outline-primary btn-sm" data-bs-toggle="modal" data-bs-target="#modal-${student.id}">Read Story</button>
            </div>
          </div>
        </div>

        <!-- Modal -->
        <div class="modal fade" id="modal-${student.id}" tabindex="-1">
          <div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title">${student.name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
              </div>
              <div class="modal-body">
                <img src="${student.image}" alt="${student.name}" class="modal-img mb-3">
                <p><strong>Course:</strong> ${student.course} (${student.duration})</p>
                <p><strong>Status:</strong> ${student.status}</p>
                <p class="mt-3">${student.story}</p>
                ${student.project_link ? `<p class="mt-3"><strong>Project:</strong> <a href="${student.project_link}" target="_blank">${student.project_link}</a></p>` : ''}
              </div>
              <div class="modal-footer">
                <button class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
            </div>
          </div>
        </div>`;
      storiesContainer.appendChild(col);
    });
  }
});
