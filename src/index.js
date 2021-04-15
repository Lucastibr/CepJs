let input = null;

window.addEventListener('load', () => {
    setTimeout(() =>{
        toastr.info('Você pode pesquisar apertando Enter ou clicando no Botão')
    }, 1000)
  
    search();
});

const search = () => {
    const anotherInput = document.getElementById('cepInput');
    const search = document.getElementById('search');

    anotherInput.focus();

    // Busca ao apertar enter
    anotherInput.addEventListener('keypress', (event, click) => {
        if (event.key === 'Enter') {
                if(event.target.value === null || event.target.value === "")
                {
                    Swal.fire(
                        'Digite o Cep',
                       'Certifique-se de digitar o Cep!',
                       'warning'
                      )
                      return;
                }
            input = event.target.value;
            searchPostalCode();
        }
    });

    // Busca ao clicar no botão
    search.addEventListener('click', () => {
        input = anotherInput.value;
        searchPostalCode();
    })
}

const searchPostalCode = async () => {

    try {
        const response = await fetch(`https://api.postmon.com.br/v1/cep/${input}`)
        const json = await response.json();
        var tbody = document.querySelector('#tbody');
        for (var [_, value] of Object.entries(json)) {
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
            ( _, arg1, arg2) => {
            return `${arg1}-${arg2}` ;
            });

        cep.value = newText;
 }