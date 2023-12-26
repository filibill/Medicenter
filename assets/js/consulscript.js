let exame = {
    handleSubmit:(event) =>{
        event.preventDefault();
        let send = true;

        let inputs = form.querySelectorAll('input');
        let selects = form.querySelectorAll('select');

        let controls = [...inputs, ...selects];

        exame.clearErrors();

        for (control of controls){
            let check = exame.checkInput(control);
            if(check !== true){
                send = false;
                exame.showError(control, check);
            }
        }
        
        if(send){
            form.submit();
        }
    },
    checkInput:(input) => {
        let rules = input.getAttribute('data-rules');
        if(rules !== null){
            rules = rules.split('|');
            for(let k in rules){
                rDetails = rules[k].split('=');
                switch(rDetails[0]){
                    case 'required':
                        if(input.value == ''){
                            return 'Campo não pode ser vazio.';
                        }
                        break;
                    case 'min':
                        if(input.value.length < rDetails[1]){
                            return 'Campo tem que ter pelo menos '+rDetails[1]+' caracteres';
                        }
                        break;
                    case 'max':
                        if(input.value.length > rDetails[1]){
                            return 'Campo não pode ter mais do que '+rDetails[1]+' caracteres';
                        }
                        break;
                    case 'option':
                        if(input.selectedIndex == 0){
                            return 'Campo não selecionado';
                        }
                        break;
                }
            }
        }
        return true;
    },
    showError:(input, error) => {
        input.style.borderColor = '#ff0000';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling);
    },
    clearErrors:() => {
        let inputs = form.querySelectorAll('input');
        for(let i = 0; i < inputs.length; i++){
            inputs[i].style = '';
        }

        let errorElements = document.querySelectorAll('.error');
        for(i = 0; i < errorElements.length; i++){
            errorElements[i].remove();
        }
    }
};
let form = document.querySelector('.exame');
form.addEventListener('submit', exame.handleSubmit);