const addbutton = document.querySelector('#seki');
const display = document.querySelector('#answer');

addbutton.addEventListener('click', () => {
    fetch( "/seki?number1=2&number2=3" )
    .then( (response) => {
        if( !response.ok ) {
            throw new Error('Error');
        }
        return response.json();
    })
    .then( (response) => {
        display.value = response.answer;
        console.log( response );
    })
})