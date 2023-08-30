const inputName = document.querySelector('#input-name');
const inputNumber = document.querySelector('#input-number');
const formBtn = document.querySelector('#form-btn');
const form = document.querySelector('#form');

const NUMBER_REGEX = /^((412)|(212)|(424)|(414)|(426)|(416))[0-9]{7}$/;
const NAME_REGEX =  /^[A-Z][a-z]{2,}$/;

let nameValidation = false;
let numberValidation = false;

// Validacion

const validar = (input, verificacion ) => {
    if(nameValidation && numberValidation) {
        formBtn.disabled = false;
    } else {
        formBtn.disabled = true;
    }

    const message = input.parentElement.children[1];

    if (!input.value) {
        input.classList.remove('error');
        input.classList.remove('success');
        message.classList.remove('show');

    } else if (verificacion) {
        input.classList.remove('error');
        input.classList.add('success');
        message.classList.remove('show');

    }else{
        input.classList.add('error');
        message.classList.add('show');
        input.classList.remove('success');
    }
}

inputName.addEventListener('input', e => {
    nameValidation = NAME_REGEX.test(inputName.value)
  validar(inputName, nameValidation);
});

inputNumber.addEventListener('input', e => {
    numberValidation = NUMBER_REGEX.test(inputNumber.value);
validar(inputNumber, numberValidation);
});

// Lista
form.addEventListener('submit', e => {
    e.preventDefault();
    const li =document.createElement('li');
    li.innerHTML = `
    <div id="contacts">
    <button class="delete-icon">
    <svg id="svg-delete" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
      </svg>
</button>

<input class="new-input" type="text" value="${inputName.value}" readonly>
<input class="new-input" type="text" value="${inputNumber.value}"readonly>

<button class="edit-icon">
    <svg id="svg-edit" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
      </svg>
</button>
</div>
    `;
    list.append(li);
    localStorage.setItem('listContacts', list.innerHTML);
});



// readonly
const edit = (editInput) => {

    if (editInput.hasAttribute('readonly')) {
        editInput.removeAttribute('readonly');
        editInput.classList.add('editando');


    } else {
        editInput.setAttribute('readonly', true);
        editInput.setAttribute('value', editInput.value);
        editInput.classList.remove('success')
        editInput.classList.remove('editando')
        localStorage.setItem('listContacts', list.innerHTML);


}};

let editNameValidation= true;
let editNumberValidation = true;

// Validacion editar
 const editValidation = (editInput, validation, btn) => {
    if(editNameValidation && editNumberValidation) {
        btn.disabled = false;
    } else {
        btn.disabled = true;
    }

    if (!editInput.value) {
        editInput.classList.remove('error');
        editInput.classList.remove('success');
       

    } else if (validation) {
        editInput.classList.remove('error');
        editInput.classList.add('success');
        

    }else{
        editInput.classList.add('error');
        editInput.classList.remove('success');
    }
    

 }


list.addEventListener('click', e => {
    if (e.target.closest('.delete-icon')) {
        e.target.closest('.delete-icon').parentElement.remove();
        localStorage.setItem('listContacts', list.innerHTML);
    }


    if (e.target.closest('.edit-icon')) {
        const editBtn = e.target.closest('.edit-icon')
        const inputEditName = e.target.closest('.edit-icon').parentElement.children[1];
        const inputEditNumber = e.target.closest('.edit-icon').parentElement.children[2];

        edit(inputEditName);
        inputEditName.addEventListener('input', e => {
            editNameValidation = NAME_REGEX.test(inputEditName.value)
          editValidation(inputEditName, editNameValidation, editBtn);
          console.log(editValidation);
        });

        edit(inputEditNumber);
        inputEditNumber.addEventListener('input', e => {
            editNumberValidation = NUMBER_REGEX.test(inputEditNumber.value);
        editValidation(inputEditNumber, editNumberValidation, editBtn);
        console.log(editValidation);
        });


    }
});

window.onload = () => {
    list.innerHTML = localStorage.getItem('listContacts');
}




