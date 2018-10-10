console.log('app.js is running');

// jsx - JavaScript XML
const app = {
    title : 'Indecision App',
    subtitle : 'put your life in hands of a computer',
    options : []
}


const multiplier = {
    numbers : [3 , 4 , 8],
    multiplyBy : 3,
    multiply() {
        return this.numbers.map((number) => this.multiplyBy * number);
    }   
}
let count = 0 ;
const addOne = () => {
    count ++ ;
    renderCounterApp()
};
const minusOne = () => {
    count -- ;
    renderCounterApp();
};
const reset = () =>{
    count = 0 ;
    renderCounterApp();    
}
const onFormSubmit = (e) => {
    e.preventDefault();
    const option = e.target.elements.option.value ;

    if(option){
        app.options.push(option)
        e.target.elements.option.value ='';
    }
    renderApp();
};

const removeAll = () =>{
    app.options = [];
    renderApp();
}
const onMakeDecision = () => {
  const randomNumber = Math.floor(Math.random()*app.options.length);
  const option = app.options[randomNumber];
  alert(option)  
};

var appRoot = document.getElementById('app');


const renderApp = () => {
    const templateTwo =( 
        <div>
            <h1>{app.title}</h1>
            {app.subtitle && <p>{app.subtitle}</p> }
            <button disabled={app.options.length===0} onClick={onMakeDecision}>what should I do?</button> 
            <button onClick={removeAll}>Remove All</button>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option" />
                <button>Add option</button>
            </form>
            <ol>
                {
                    app.options.map((option) => {
                        return <li key={option}>{option}</li>
                    })
                }
            </ol>
        </div> 
    );
ReactDOM.render(templateTwo , appRoot );

}

renderApp();
