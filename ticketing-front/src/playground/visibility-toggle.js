class Visibility extends React.Component {
    constructor(props){
        super(props)

        this.show = this.show.bind(this);
        this.hide = this.hide.bind(this);
        this.state ={
            visibility : false
        }
    }
    show(){
        this.setState(()=>{
            return {
            visibility : true
            };            
        })
        console.log(this.state)
    }
    hide(){
        this.setState(()=>{
            return {
            visibility : false
            };            
        })
        console.log(this.state)
    }
    render(){
        return (
            <div>
                <h1>Visibility Toggle</h1>
                {this.state.visibility ? <div><button onClick={this.hide}>hide</button><p>now you can see me !</p></div> : <button onClick={this.show}>show</button>}
            
            </div>
        
        );
    }
}

ReactDOM.render(<Visibility />,document.getElementById('app'));






// const app = {
//     title : 'Visibility Toggle',
//     detail :'now you see me' ,
//     visible : true
// }

// const show = () => {
//     app.visible = true ;
//     render() ;
// }
// const hide = () => {
//     app.visible = false;
//     render() ;
// }

// const render = () => { 
//     const template = (
//         <div>
//             <h1>{app.title}</h1>
//             {app.visible ? <div><button onClick={hide}>hide</button><p>{app.detail}</p></div> : <button onClick={show}>show</button>}
//         </div>
//     );

//     const appRoot = document.getElementById('app')

//     ReactDOM.render(template , appRoot);
// }

// render()