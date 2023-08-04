const form = document.querySelector('.needs-validation')

const btn_create = document.querySelector('.btn-create')

form.addEventListener('submit', function checkedSubmitted(event) {
  if (!form.checkValidity()) {
    event.preventDefault()
    event.stopPropagation()
  }
})

btn_create.addEventListener('click', function createdSubmitted(event) {
  form.classList.add('was-validated')
})