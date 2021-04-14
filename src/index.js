let arr = [];
let input = null;

window.addEventListener('load', () => {
    search();
});

const search = () => {
    
    const anotherInput = document.getElementById('cepInput');
    const search = document.getElementById('search');

    anotherInput.focus();

    anotherInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            input = event.target.value;
            searchPostalCode();
        }
    });

    search.addEventListener('click', (event) => {
        input = event.value;
        searchPostalCode();
    })
}

const searchPostalCode = async () => {

    try {
        const response = await fetch(`https://api.postmon.com.br/v1/cep/${input}`)
        const json = await response.json();
        var tbody = document.querySelector('#tbody');
        for (var [key, value] of Object.entries(json)) {
           var td = document.createElement('td')
           tbody.appendChild(td);
           td.innerHTML = value;
           console.log(value);
       }

    } catch (error) {
     Swal.fire(
        'Cep inexistente',
       'Certifique-se de digitar o Cep corretamente!',
       'error'
      )
    }
 }

 const cepMask = (cep) => {
        const actualText = cep.value;
        let newText;
        newText= actualText.replace(/(\d{5})(\d{3})/,
            ( regex, arg1, arg2) => {
            return `${arg1}-${arg2}` ;
            });

        cep.value = newText;
 }
