class Api {

    static getRequests(){
        const url = 'http://127.0.0.1:8000/request/';
        return fetch(url)
                    .then((response) => {
                        if (!response.ok){return false}
                        return response.json();
                    }).catch(
                        (error)=>{
                            console.log(error)
                            return false
                        }
                    );
    }

    static getTickets(){
        const url = 'http://127.0.0.1:8000/ticket/';
        return fetch(url)
                    .then((response) => {
                        if(!response.ok){return false}
                        return response.json();
                    }).catch(
                        (error)=>{
                            console.log(error)
                            return false
                        }
                    );
    }

    static addRequest(credentials){
        const url = 'http://127.0.0.1:8000/request/';
        const request = new Request(url,{
            method:'POST',
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                userId:'1',
                desc: credentials.description,
                priority:credentials.priority ? 'True' : 'False'
            })
        });

        return fetch(request)
                    .then((response) => {
                        if(!response.ok){return false}
                        return response.json();
                    }).catch(
                        (error)=>{
                            console.log(error)
                            return false
                        }
                    );

    }

    static getAdminNotifications(){
        const url = 'http://127.0.0.1:8000/adminNotifs/'
        return fetch(url)
                    .then((response) => {
                        if(!response.ok){return false}
                        return response.json();
                    }).catch(
                        (error)=>{
                            console.log(error)
                            return false
                        }
                    )
    }

    static setAdminNotificationStatus(notifID){
        const url = `http://127.0.0.1:8000/adminNotif/${notifID}`
        return fetch(url)
                    .then((response) => {
                        if(!response.ok){return false}
                        return response.json;
                    }).catch(
                        (error) => {
                            console.log(error)
                            return false
                        }
                    )
    }
}


export default Api;