const axios = require ("axios");

const functions = {
    add: (num1, num2) => num1+num2,
    shoppingList: [
        'diapers',
        'kleenex',
        'trash bags',
        'paper towels',
        'beer',
      ],
    createUser: ()=> {
        const user = {
            firstName: "German",
            secondName: "Nemirovski"
        }
        return user;
    },

    fetchUser: ()=>{ 
       return  axios.get("https://jsonplaceholder.typicode.com/users/1");
    }
}

module.exports=functions;